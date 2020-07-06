import CourseModel from "../models/CourseModel";
import CourseAccessModel from "../models/CourseAccessModel";
import CourseStudentModel from "../models/CourseStudentModel";
import TokenAccessModel from "../models/TokenAccessModel";
import ImageModel from "../models/ImageModel";
import Upload from "../models/Upload";
import { COURSE, COURSE_STUDENT, COURSE_ACCESS, TOKEN_ACCESS } from "../../database/tables";
import loaderCourse from "../../loaders/loaderCourse";
import Pagination from "../models/Pagination";
import CoursesGraphql from "../../graphql/resolvers/types/CoursesGraphql";
import validations from "../../utils/validations";
import CourseSubscription from "../subscriptions/CourseSubscription";

export const CourseController = () => {
    const classCourseModel = CourseModel();
    const classCourseAccessModel = CourseAccessModel();
    const classCourseStudentModel = CourseStudentModel();
    const classTokenAccessModel = TokenAccessModel();
    const classPagination = Pagination();
    const classImageModel = ImageModel();
    const classUpload = Upload();

    const classCourseSubscription = CourseSubscription();

    return {
        isInstructor: (courseId, instructorId) => classCourseModel.validatedCourseInstructor(courseId, instructorId),
        createCourse: async ({ name = null, description = null, purchaseLink = null, monthsToExpires = null, image = null } = {}, { tokenUser: { adminId: instructorId = null } = {} } = {}) => {
            if (name && instructorId) {
                try {
                    name = validations.cleanValue(name);
                    instructorId = validations.cleanValue(instructorId);
                    description = validations.cleanValue(description) || null;
                    purchaseLink = validations.cleanValue(purchaseLink) || null;
                    monthsToExpires = validations.cleanValueInt(monthsToExpires) || null;

                    let imageId = null;
                    if (image) {
                        let imageUploaded = null;
                        try {
                            imageUploaded = await classUpload.uploadImage(image);
                        } catch (error) { }
                        if (imageUploaded && imageUploaded.url) {
                            imageId = await classImageModel.add({ url: imageUploaded.url, name: imageUploaded.filename });
                        }
                    }
                    
                    if(monthsToExpires && monthsToExpires < 0){
                        throw new Error("Expires invalid!");
                    }

                    const courseId = await classCourseModel.add({
                        name,
                        description,
                        instructorId,
                        purchaseLink,
                        imageId,
                        monthsToExpires
                    });

                    if (courseId) {
                        let course = await loaderCourse.load(courseId);
                        if (course) {
                            await classCourseSubscription.added.publish(course);
                            return course;
                        }
                    }
                } catch (error) { }
            }
            return null;
        },
        update: async ({ courseId = null, name = null, description = null, monthsToExpires = null, purchaseLink = null, image = null } = {}, { tokenUser: { adminId: instructorId = null } = {} } = {}) => {
            if (courseId && name && instructorId) {
                try {
                    name = validations.cleanValue(name);
                    description = validations.cleanValue(description);
                    purchaseLink = validations.cleanValue(purchaseLink);
                    monthsToExpires = validations.cleanValueInt(monthsToExpires) || null;

                    let imageId = null;
                    if (image) {
                        let imageUploaded = null;
                        try {
                            imageUploaded = await classUpload.uploadImage(image);
                        } catch (error) { }
                        if (imageUploaded && imageUploaded.url) {
                            imageId = await classImageModel.add({ url: imageUploaded.url, name: imageUploaded.filename });
                        }
                    }

                    if(monthsToExpires && monthsToExpires < 0){
                        throw new Error("Expires invalid!");
                    }

                    const updated = await classCourseModel.update({
                        id: courseId,
                        data: {
                            name,
                            description,
                            purchaseLink,
                            profileImageId: imageId,
                            monthsToExpires
                        }
                    });
                    
                    if (updated) {
                        await loaderCourse.clear(courseId);
                        let course = await loaderCourse.load(courseId);
                        if (course) {
                            await classCourseSubscription.updated.publish(course);
                            return course;
                        }
                    }
                } catch (error) { }
            }
            return null;
        },
        removeCourse: async ({ id: courseId = null } = {}, { tokenUser: { adminId: instructorId = null } = {} } = {}) => {
            if (courseId && instructorId) {
                try {
                    courseId = validations.cleanValue(courseId);
                    instructorId = validations.cleanValue(instructorId);
                    const course = await loaderCourse.load(courseId);
                    if (course) {
                        const response = await classCourseModel.remove({ id: courseId })
                        if (response) {
                            await loaderCourse.clear(courseId);
                            return course;
                        }
                    }
                } catch (error) { }
            }
            return null;
        },
        course: async ({ id: courseId = null } = {}, { tokenUser: { adminId: instructorId = null, studentId = null } = {} } = {}) => {
            if (courseId && (instructorId || studentId)) {
                try {
                    courseId = validations.cleanValue(courseId);
                    instructorId = validations.cleanValue(instructorId);
                    studentId = validations.cleanValue(studentId);

                    let course = await loaderCourse.load(courseId);
                    if (course) {
                        return course;
                    }
                } catch (error) { }
            }
            return null;
        },
        courses: async (params, { tokenUser: { adminId: instructorId = null, studentId = null } = {} } = {}) => {
            let items = [];
            let totalItems = 0;
            let { pagination = null } = params || {};

            const infoPagination = classPagination.get(pagination);

            try {
                instructorId = validations.cleanValue(instructorId);
                studentId = validations.cleanValue(studentId);

                if (instructorId) {
                    const where = {
                        [COURSE.INSTRUCTOR]: instructorId,
                    };
                    items = await classCourseModel.findAll({
                        where,
                        ...classPagination.paramsToModel(params),
                    });
                    totalItems = await classCourseModel.count({ where });
                } else if (studentId) {
                    const where = {
                        [COURSE_STUDENT.STUDENT]: studentId,
                    };
                    totalItems = await classCourseStudentModel.count({ where });
                    const courseStudents = await classCourseStudentModel.findAll({ where });

                    if (courseStudents && courseStudents.length > 0) {
                        const courseIds = await courseStudents.map(item => item[COURSE_STUDENT.COURSE]);
                        items = await classCourseModel.findIn({
                            ids: courseIds,
                            ...classPagination.paramsToModel(params),
                        });
                    }
                }
            } catch (error) { }

            return CoursesGraphql({
                items,
                totalItems,
                pageTotalItems: items.length || 0,
                ...infoPagination,
            });
        },
        coursePreview: async ({ id: courseId = null, token = null } = {}, context) => {
            try {
                let course = null;
                if (courseId) {
                    courseId = validations.cleanValue(courseId);
                    course = await loaderCourse.load(courseId);
                }
                if (token) {
                    token = validations.cleanValue(token);
                    const courseAccess = await classCourseAccessModel.findOne({
                        where: {
                            [COURSE_ACCESS.CURRENTY_STATE]: classCourseAccessModel.STATE.PENDING,
                            [COURSE_ACCESS.TOKEN]: token,
                        }
                    });

                    if (courseAccess) {
                        course = await loaderCourse.load(courseAccess[COURSE_ACCESS.COURSE]);
                    }
                }
                return course;
            } catch (error) { }
            return null;
        },
        coursesPreview: async (params, context) => {
            let items = [];
            let totalItems = 0;

            let { pagination = null } = params || {};
            const infoPagination = classPagination.get(pagination);

            try {
                items = await classCourseModel.findAll(classPagination.paramsToModel(params));
                totalItems = await classCourseModel.count();
            } catch (error) { }

            return CoursesGraphql({
                items,
                totalItems,
                pageTotalItems: items.length || 0,
                ...infoPagination,
            });
        },
    };
};

export default CourseController;