import Token from "../models/Token";
import CourseStudentModel from "../models/CourseStudentModel";
import CourseAccessModel from "../models/CourseAccessModel";
import StudentModel from "../models/StudentModel";
import Pagination from "../models/Pagination";
import { COURSE_STUDENT, COURSE_ACCESS, STUDENT } from "../../database/tables";
import loaderCourseStudent from "../../loaders/loaderCourseStudent";
import validations from "../../utils/validations";
import CourseStudentsGraphql from "../../graphql/resolvers/types/CourseStudentsGraphql";
import CourseStudentSubscription from "../subscriptions/CourseStudentSubscription";

export const CourseStudentController = () => {
    const classCourseStudentModel = CourseStudentModel();
    const classCourseAccessModel = CourseAccessModel();
    const classStudentModel = StudentModel();
    const classToken = Token();
    const classPagination = Pagination();
    const classCourseStudentSubscription = CourseStudentSubscription();

    const addStudent = async (courseId, studentId, token = null) => {
        try {
            courseId = validations.cleanValue(courseId);
            studentId = validations.cleanValue(studentId);
            token = validations.cleanValue(token);

            let OKEY = true;
            let courseAccess = null;
            if (token) {
                courseAccess = await classCourseAccessModel.findByToken(token);
                if (courseAccess && String(courseAccess[COURSE_ACCESS.CURRENTY_STATE]) === String(classCourseAccessModel.STATE.PENDING)) {
                    OKEY = true;
                } else {
                    OKEY = false;
                }
            }

            if (OKEY) {
                const existsCourseStudent = await classCourseStudentModel.findOne({
                    where: {
                        [COURSE_STUDENT.COURSE]: courseId,
                        [COURSE_STUDENT.STUDENT]: studentId,
                    }
                });
                let courseStudentId = null;
                if (!existsCourseStudent) {
                    courseStudentId = await classCourseStudentModel.add({
                        courseId,
                        studentId
                    });
                }
                if (courseStudentId) {
                    let courseStudent = await loaderCourseStudent.load(courseStudentId);
                    if (courseStudent) {
                        if (courseAccess) {
                            await classCourseAccessModel.confirmAccess({
                                id: courseAccess[COURSE_ACCESS.ID],
                                studentId,
                            });
                        }
                        await classCourseStudentSubscription.added.publish(courseStudent);

                        return courseStudent;
                    }
                }
            }
        } catch (error) { }
        return null;
    }

    const removeStudent = async (courseId, studentId) => {
        try {
            courseId = validations.cleanValue(courseId);
            studentId = validations.cleanValue(studentId);

            const courseStudent = await classCourseStudentModel.findOne({
                where: {
                    [COURSE_STUDENT.COURSE]: courseId,
                    [COURSE_STUDENT.STUDENT]: studentId,
                }
            });
            if (courseStudent) {
                const courseStudentId = courseStudent[COURSE_STUDENT.ID];
                const removed = await classCourseStudentModel.remove({ id: courseStudentId });
                if (removed) {
                    await loaderCourseStudent.clear(courseStudentId);
                    return courseStudent;
                }
            }
        } catch (error) { }
        return null;
    }

    return {
        isStudent: (courseId, studentId) => classCourseStudentModel.validatedCourseStudent(courseId, studentId),
        add: async ({ token: tokenCourseAccess = null } = {}, { tokenUser: { studentId = null } = {} } = {}) => {
            if (studentId && tokenCourseAccess) {
                try {
                    const token = await classToken.get(tokenCourseAccess);

                    if (token && token.courseId) {
                        return addStudent(token.courseId, studentId, tokenCourseAccess);
                    }
                } catch (error) { }
            }
            return null;
        },
        remove: async ({ courseId = null, studentId = null } = {}, { tokenUser: { adminId = null } = {} } = {}) => {
            if (courseId && studentId && adminId) {
                try {
                    return removeStudent(courseId, studentId);
                } catch (error) { }
            }
            return null;
        },
        addByInstructor: async ({ courseId = null, studentEmail = null } = {}, { tokenUser: { adminId: instructorId = null } = {} } = {}) => {
            if (courseId && studentEmail && instructorId) {
                try {
                    const student = await classStudentModel.findByEmail(studentEmail);
                    if (student) {
                        return addStudent(courseId, student[STUDENT.ID]);
                    }
                } catch (error) { }
            }
            return null;
        },
        students: async ({ courseId = null, ...params } = {}, { tokenUser: { adminId = null } = {} } = {}) => {
            let totalItems = 0;
            let items = [];
            let { pagination = null } = params || {};
            const infoPagination = classPagination.get(pagination);

            try {
                if (adminId) {
                    totalItems = await classCourseStudentModel.count({ where: { [COURSE_STUDENT.COURSE]: courseId }, groupBy: [COURSE_STUDENT.STUDENT] });
                    items = await classCourseStudentModel.findAll({ where: { [COURSE_STUDENT.COURSE]: courseId }, ...classPagination.paramsToModel(params) });
                }
            } catch (error) { }

            return CourseStudentsGraphql({
                totalItems,
                items,
                pageTotalItems: items.length || 0,
                ...infoPagination,
            });
        },
    };
};

export default CourseStudentController;