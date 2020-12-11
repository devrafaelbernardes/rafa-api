import Email from "../models/Email";
import EmailModel from "../models/EmailModel";
import StudentModel from "../models/StudentModel";
import ModelingModel from "../models/ModelingModel";
import CourseStudentModel from "../models/CourseStudentModel";

import { STUDENT, COURSE_STUDENT, EMAIL, MODELING } from "../../database/tables";
import validations from "../../utils/validations";
import Pagination from "../models/Pagination";
import EmailsGraphql from "../../graphql/resolvers/types/EmailsGraphql";

export const EmailController = () => {
    const classEmail = Email();
    const classEmailModel = EmailModel();
    const classStudentModel = StudentModel();
    const classModelingModel = ModelingModel();
    const classPagination = Pagination();
    const classCourseStudentModel = CourseStudentModel();

    return {
        all: async (params, { tokenUser: { adminId = null } = {} } = {}) => {
            let totalItems = 0;
            let items = [];
            let { pagination = null } = params || {};
            const infoPagination = classPagination.get(pagination);

            if (adminId) {
                try {
                    adminId = validations.cleanValue(adminId);
                    const where = {
                        [EMAIL.ADMIN]: adminId,
                    };
                    totalItems = await classEmailModel.count({ where });
                    items = await classEmailModel.findAll({
                        columns: [`${EMAIL.TABLE_NAME}.*`],
                        where,
                        leftJoin: {
                            table: STUDENT.TABLE_NAME,
                            param1: `${STUDENT.TABLE_NAME}.${STUDENT.ID}`,
                            param2: `${EMAIL.TABLE_NAME}.${EMAIL.STUDENT}`,
                        },
                        ...classPagination.paramsToModel(params),
                    }) || [];
                } catch (error) { }
            }
            return EmailsGraphql({
                items,
                totalItems,
                pageTotalItems: items.length || 0,
                ...infoPagination,
            });
        },
        sendTo: async ({ to = null, subject = null, message = null } = {}, { tokenUser: { adminId = null } = {} } = {}) => {
            if (to && subject && message && adminId) {
                try {
                    to = validations.cleanValue(to);
                    adminId = validations.cleanValue(adminId);
                    const subjectClean = validations.cleanValue(subject);
                    const messageClean = validations.cleanValue(message);
                    if (subjectClean && messageClean) {
                        let studentId = null;
                        const student = await classStudentModel.findByEmail(to);
                        if (student) {
                            studentId = student[STUDENT.ID];
                        }
                        try {
                            const sended = await classEmail.sendCustom({ to, subject, message });
                            if (sended) {
                                const addedId = await classEmailModel.add({
                                    to,
                                    adminId,
                                    studentId,
                                    subject: subjectClean,
                                    message: messageClean
                                });
                                if (addedId) {
                                    return addedId;
                                }
                            }
                        } catch (error) { }
                    }
                } catch (error) { }
            }
            return null;
        },
        sendModelingEmail: async ({ to = null, modelingId = null } = {}, { tokenUser: { adminId = null } = {} } = {}) => {
            if (to && modelingId && adminId) {
                try {
                    to = validations.cleanValue(to);
                    modelingId = validations.cleanValue(modelingId);
                    adminId = validations.cleanValue(adminId);

                    const modeling = await classModelingModel.findById(modelingId);
                    if (!modeling) {
                        throw new Error("Modeling not found!");
                    }

                    const response = await classEmail.sendModelingEmail({
                        to,
                        modelingName: modeling[MODELING.NAME],
                        modelingFileName: modeling[MODELING.FILE_NAME]
                    });
                    if (!response) {
                        throw new Error("Error");
                    }
                    let student = null;
                    try {
                        student = await classStudentModel.findByEmail(to);
                    } catch (error) { }

                    await classEmailModel.add({
                        to,
                        adminId,
                        studentId: student && student[STUDENT.ID],
                        subject: `Envio de modelagem | ${modeling[MODELING.NAME]}`,
                        message: `Você enviou a modelagem ${modeling[MODELING.NAME]}`
                    });
                    
                    return response;
                } catch (error) { }
            }
            return null;
        },
        sendToAll: async ({ subject = null, message = null } = {}, { tokenUser: { adminId = null } = {} } = {}) => {
            if (subject && message && adminId) {
                try {
                    adminId = validations.cleanValue(adminId);
                    const subjectClean = validations.cleanValue(subject);
                    const messageClean = validations.cleanValue(message);
                    if (subjectClean && messageClean) {
                        const students = await classStudentModel.findAll();

                        let data = [];
                        if (students && students.length > 0) {
                            data = students.map((item) => {
                                try {
                                    const studentId = item[STUDENT.ID];
                                    const studentEmail = item[STUDENT.EMAIL];
                                    const studentDataEmail = ({
                                        [EMAIL.TO]: studentEmail,
                                        [EMAIL.STUDENT]: studentId,
                                        [EMAIL.ADMIN]: adminId,
                                        [EMAIL.SUBJECT]: subjectClean,
                                        [EMAIL.MESSAGE]: messageClean,
                                    });

                                    classEmail.sendCustom({ to: studentEmail, subject, message });
                                    return studentDataEmail;
                                } catch (error) { }
                            });
                        }
                        const response = await classEmailModel.addMultiple({ data });
                        if (response && response.length > 0) {
                            return true;
                        }
                    }
                } catch (error) { }
            }
            return null;
        },
        sendToCourse: async ({ courseId = null, subject = null, message = null } = {}, { tokenUser: { adminId = null } = {} } = {}) => {
            if (courseId && subject && message && adminId) {
                try {
                    courseId = validations.cleanValue(courseId);
                    adminId = validations.cleanValue(adminId);
                    const subjectClean = validations.cleanValue(subject);
                    const messageClean = validations.cleanValue(message);
                    if (subjectClean && messageClean) {
                        const courseStudents = await classCourseStudentModel.findAll({
                            columns: [
                                `${STUDENT.TABLE_NAME}.${STUDENT.ID} as studentId`,
                                `${STUDENT.TABLE_NAME}.${STUDENT.EMAIL} as studentEmail`,
                            ],
                            innerJoin: {
                                table: STUDENT.TABLE_NAME,
                                param1: `${STUDENT.TABLE_NAME}.${STUDENT.ID}`,
                                param2: `${COURSE_STUDENT.TABLE_NAME}.${COURSE_STUDENT.STUDENT}`,
                            },
                            where: {
                                [`${COURSE_STUDENT.TABLE_NAME}.${COURSE_STUDENT.COURSE}`]: courseId
                            }
                        });

                        let data = [];
                        if (courseStudents && courseStudents.length > 0) {
                            data = await courseStudents.map(({ studentId, studentEmail }) => {
                                try {
                                    const studentDataEmail = ({
                                        [EMAIL.TO]: studentEmail,
                                        [EMAIL.STUDENT]: studentId,
                                        [EMAIL.ADMIN]: adminId,
                                        [EMAIL.SUBJECT]: subjectClean,
                                        [EMAIL.MESSAGE]: messageClean,
                                    });

                                    classEmail.sendCustom({ to: studentEmail, subject, message });
                                    return studentDataEmail;
                                } catch (error) { }
                            });
                        }
                        const response = await classEmailModel.addMultiple({ data });
                        if (response && response.length > 0) {
                            return true;
                        }
                    }
                } catch (error) { }
            }
            return false;
        },
        sendToNoCourse: async ({ courseId = null, subject = null, message = null } = {}, { tokenUser: { adminId = null } = {} } = {}) => {
            let noSendIds = [];
            let sendIds = [];
            let students = [];
            if (subject && message && adminId) {
                try {
                    const subjectClean = validations.cleanValue(subject);
                    const messageClean = validations.cleanValue(message);
                    if (subjectClean && messageClean) {
                        adminId = validations.cleanValue(adminId);

                        const courseStudents = await classCourseStudentModel.findAll({
                            columns: [COURSE_STUDENT.STUDENT],
                            where: {
                                [COURSE_STUDENT.COURSE]: courseId,
                            }
                        });

                        if (courseStudents && courseStudents.length > 0) {
                            noSendIds = await courseStudents.map((item) => item[COURSE_STUDENT.STUDENT]);
                        }
                        students = await classStudentModel.findNotIn({
                            ids: noSendIds
                        });

                        if (students && students.length > 0) {
                            sendIds = await students.map((item) => {
                                try {
                                    const studentId = item[STUDENT.ID];
                                    const studentEmail = item[STUDENT.EMAIL];
                                    const studentDataEmail = ({
                                        [EMAIL.TO]: studentEmail,
                                        [EMAIL.STUDENT]: studentId,
                                        [EMAIL.ADMIN]: adminId,
                                        [EMAIL.SUBJECT]: subjectClean,
                                        [EMAIL.MESSAGE]: messageClean,
                                    });
                                    classEmail.sendCustom({ to: studentEmail, subject, message });
                                    return studentDataEmail;
                                } catch (error) { }
                            });
                        }
                        const response = await classEmailModel.addMultiple({ data: sendIds });
                        if (response && response.length > 0) {
                            return true;
                        }
                    }
                } catch (error) { }
            }
            return false;
            /* return {
                count_total: students.length || 0,
                count_sended: sendIds.length || 0,
            }; */
        },
    };
};

export default EmailController;