import CourseAccessModel from "../models/CourseAccessModel";
import Token from "../models/Token";
//import { COURSE_STUDENT } from "../../database/tables";
import Pagination from "../models/Pagination";
import loaderCourseAccess from "../../loaders/loaderCourseAccess";
import CourseAccessesGraphql from "../../graphql/resolvers/types/CourseAccessesGraphql";
import validations from "../../utils/validations";
import { COURSE_ACCESS } from "../../database/tables";

export const CourseAccessController = () => {
    const classCourseAccessModel = CourseAccessModel();
    
    const classToken = Token();
    const classPagination = Pagination();

    return {
        add: async ({ courseId = null } = {}, { tokenUser: { adminId: instructorId = null } = {} } = {}) => {
            if (courseId && instructorId) {
                try {
                    courseId = validations.cleanValue(courseId);
                    instructorId = validations.cleanValue(instructorId);

                    const token = await classToken.create({ courseId, instructorId }, "15d");
                    const courseAccessId = await classCourseAccessModel.add({
                        courseId,
                        token
                    });
                    if (courseAccessId) {
                        let courseAccess = await loaderCourseAccess.load(courseAccessId);
                        if (courseAccess) {
                            return courseAccess;
                        }
                    }
                } catch (error) { }
            }
            return null;
        },
        courseAccess: async ({ id = null } = {}, context) => {
            if (id) {
                try {
                    id = validations.cleanValue(id);

                    let courseAccess = await loaderCourseAccess.load(id);
                    if (courseAccess) {
                        return courseAccess;
                    }
                } catch (error) { }
            }
            return null;
        },
        courseAccesses: async (params, { tokenUser: { adminId: instructorId = null } = {} } = {}) => {
            let items = [];
            let totalItems = 0;
            let { pagination = null, courseId = null } = params || {};

            const infoPagination = classPagination.get(pagination);
            let where = {};
            try {
                if(courseId){
                    where = {
                        [COURSE_ACCESS.COURSE] : courseId
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
                pageTotalItems : items.length || 0,
                ...infoPagination,
            });
        },
    };
};

export default CourseAccessController;