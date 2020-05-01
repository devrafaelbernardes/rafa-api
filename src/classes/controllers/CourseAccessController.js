import CourseAccessModel from "../models/CourseAccessModel";
import Token from "../models/Token";
import Email from "../models/Email";
import Pagination from "../models/Pagination";

import loaderCourseAccess from "../../loaders/loaderCourseAccess";
import CourseAccessesGraphql from "../../graphql/resolvers/types/CourseAccessesGraphql";
import validations from "../../utils/validations";
import { COURSE_ACCESS, STUDENT, COURSE } from "../../database/tables";
import StudentModel from "../models/StudentModel";
import loaderCourse from "../../loaders/loaderCourse";

export const CourseAccessController = () => {
    const classCourseAccessModel = CourseAccessModel();

    const classToken = Token();
    const classEmail = Email();
    const classStudentModel = StudentModel();
    const classPagination = Pagination();

    return {
        add: async ({ courseId = null, email = null, name = null } = {}, { tokenUser: { adminId: instructorId = null } = {} } = {}) => {
            if (courseId && instructorId) {
                try {
                    courseId = validations.cleanValue(courseId);
                    email = validations.cleanValue(email);
                    name = validations.cleanValue(name);
                    instructorId = validations.cleanValue(instructorId);

                    const token = await classToken.create({ courseId, instructorId }, "15d");
                    const courseAccessId = await classCourseAccessModel.add({
                        courseId,
                        token,
                        email
                    });
                    if (courseAccessId) {
                        let courseAccess = await loaderCourseAccess.load(courseAccessId);
                        if (courseAccess) {

                            // ENVIA O EMAIL
                            if (email) {
                                const userEmail = await classStudentModel.findByEmail(email);
                                if (userEmail) {
                                    name = userEmail[STUDENT.NAME];
                                }
                                const course = await loaderCourse.load(courseId);

                                if (course) {
                                    const sendedEmail = await classEmail.sendCourseAccess({
                                        to: email,
                                        name,
                                        courseName: course[COURSE.NAME],
                                        token
                                    });
                                    if (!sendedEmail) {
                                        throw new Error("Error to send email.");
                                    }
                                }
                            }

                            return courseAccess;
                        }
                    }
                } catch (error) { }
            }
            return null;
        },
        courseAccess: async ({ id = null, token = null } = {}, context) => {
            try {
                let where = {
                    [COURSE_ACCESS.CURRENTY_STATE]: classCourseAccessModel.STATE.PENDING,
                };
                if (id) {
                    id = validations.cleanValue(id);
                    where = {
                        ...where,
                        [COURSE_ACCESS.ID]: id,
                    };
                } else if (token) {
                    token = validations.cleanValue(token);
                    where = {
                        ...where,
                        [COURSE_ACCESS.TOKEN]: token,
                    };
                }

                const courseAccess = await classCourseAccessModel.findOne({ where });
                if (courseAccess) {
                    return courseAccess;
                }
            } catch (error) { }
            return null;
        },
        courseAccesses: async (params, { tokenUser: { adminId: instructorId = null } = {} } = {}) => {
            let items = [];
            let totalItems = 0;
            let { pagination = null, courseId = null } = params || {};

            const infoPagination = classPagination.get(pagination);
            let where = {};
            try {
                if (courseId) {
                    where = {
                        [COURSE_ACCESS.COURSE]: courseId
                    };
                }
                items = await classCourseAccessModel.findAll({
                    where,
                    ...classPagination.paramsToModel(params)
                });
                totalItems = await classCourseAccessModel.count({ where });
            } catch (error) { }

            return CourseAccessesGraphql({
                items,
                totalItems,
                pageTotalItems: items.length || 0,
                ...infoPagination,
            });
        },
    };
};

export default CourseAccessController;