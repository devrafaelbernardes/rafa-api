import AdminController from "./AdminController";
import StudentController from "./StudentController";
import CourseController from "./CourseController";
import CourseStudentController from "./CourseStudentController";

import TokenAccessModel from "../models/TokenAccessModel";

export const AuthController = () => {
    const classAdminController = AdminController();
    const classCourseController = CourseController();
    const classCourseStudentController = CourseStudentController();
    const classStudentController = StudentController();

    const classTokenAccessModel = TokenAccessModel();

    const validatedTokenConnected = async(tokenUser) => {
        if(!tokenUser || !tokenUser.tokenId){
            throw new Error('Not authenticated!');
        }
        const tokenId = tokenUser.tokenId;
        const tokenConnected = await classTokenAccessModel.findById(tokenId);
        if(!tokenConnected){
            throw new Error('Token desconnected!');
        }
    }

    const validatedAdmin = async (adminId) => {
        if (!adminId) {
            throw new Error('Admin is not authenticated!');
        }
        const isAdmin = await classAdminController.isAdmin(adminId);
        if (!isAdmin) {
            throw new Error('You are not valid admin!');
        }
    }

    const validatedStudent = async (studentId) => {
        if (!studentId) {
            throw new Error('Student is not authenticated!');
        }
        const isStudent = await classStudentController.isStudent(studentId);
        if (!isStudent) {
            throw new Error('You are not valid student!');
        }
    }

    const validatedCourseStudent = async (args, studentId) => {
        if(args && args.input){
            args = args.input;
        }
        const courseId = args.courseId || args.id;
        if (!courseId) {
            throw new Error('Course not found!');
        }

        await validatedStudent(studentId);

        const validated = await classCourseStudentController.isStudent(courseId, studentId);
        if (!validated) {
            throw new Error('You are not student of the course!');
        }
    }

    const validatedCourseInstructor = async (args, instructorId) => {
        if(args && args.input){
            args = args.input;
        }
        const courseId = args.courseId || args.id;
        if (!courseId) {
            throw new Error('Course not found!');
        }

        await validatedAdmin(instructorId);
        const validated = await classCourseController.isInstructor(courseId, instructorId);
        if (!validated) {
            throw new Error('You are not instructor of the course!');
        }
    }

    return {
        isNotAuthenticated: async (root, args, { tokenUser = null } = {}, info) => {
            if (tokenUser && (tokenUser.adminId || tokenUser.studentId)) {
                throw new Error('User is authenticated!');
            }
        },
        isAuthenticated: async (root, args, { tokenUser = null } = {}, info) => {
            if (!tokenUser && !tokenUser.adminId && !tokenUser.studentId) {
                throw new Error('Not authenticated!');
            }
            await validatedTokenConnected(tokenUser);
            if(tokenUser.adminId){
                await validatedAdmin(tokenUser.adminId);
            }else{
                await validatedStudent(tokenUser.studentId);
            }
        },
        isAdmin: async (root, args, { tokenUser = null } = {}, info) => {
            await validatedTokenConnected(tokenUser);
            await validatedAdmin(tokenUser.adminId);
        },
        isStudent: async (root, args, { tokenUser = null } = {}, info) => {
            await validatedTokenConnected(tokenUser);
            await validatedStudent(tokenUser.studentId);
        },
        isCourseInstructor: async (root, args, { tokenUser = null } = {}, info) => {
            await validatedTokenConnected(tokenUser);
            await validatedCourseInstructor(args, tokenUser.adminId);
        },
        isCourseStudent: async (root, args, { tokenUser = null } = {}, info) => {
            await validatedTokenConnected(tokenUser);
            await validatedCourseStudent(args, tokenUser.studentId);
        },
        isAllowToAccessCourse: async (root, args, { tokenUser = null } = {}, info) => {
            if (!tokenUser && !tokenUser.adminId && !tokenUser.studentId) {
                throw new Error('Not authenticated!');
            }
            await validatedTokenConnected(tokenUser);
            if (tokenUser.adminId) {
                await validatedCourseInstructor(args, tokenUser.adminId);
            }
            if (tokenUser.studentId) {
                await validatedCourseStudent(args, tokenUser.studentId);
            }
        },
    };
};

export default AuthController;