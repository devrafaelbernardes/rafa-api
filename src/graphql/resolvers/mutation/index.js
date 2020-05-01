import { combineResolvers } from 'graphql-resolvers';

import AuthController from '../../../classes/controllers/AuthController';
import AdminController from '../../../classes/controllers/AdminController';
import AdminAuthController from '../../../classes/controllers/AdminAuthController';
import BagController from '../../../classes/controllers/BagController';
import CourseController from '../../../classes/controllers/CourseController';
import CourseAccessController from '../../../classes/controllers/CourseAccessController';
import CourseStudentController from '../../../classes/controllers/CourseStudentController';
import CourseVideoController from '../../../classes/controllers/CourseVideoController';
import CourseMaterialController from '../../../classes/controllers/CourseMaterialController';
import MediaController from '../../../classes/controllers/MediaController';
import SocialNetworkController from '../../../classes/controllers/SocialNetworkController';
import StudentController from '../../../classes/controllers/StudentController';
import StudentAuthController from '../../../classes/controllers/StudentAuthController';

const classAuthController = AuthController();
const classAdminController = AdminController();
const classAdminAuthController = AdminAuthController();
const classBagController = BagController();
const classCourseController = CourseController();
const classCourseAccessController = CourseAccessController();
const classCourseStudentController = CourseStudentController();
const classCourseVideoController = CourseVideoController();
const classCourseMaterialController = CourseMaterialController();
const classMediaController = MediaController();
const classSocialNetworkController = SocialNetworkController();
const classStudentController = StudentController();
const classStudentAuthController = StudentAuthController();

const isNotAuthResolver = (callback) => combineResolvers(classAuthController.isNotAuthenticated, callback);
const isAuthenticated = (callback) => combineResolvers(classAuthController.isAuthenticated, callback);
const isAdminResolver = (callback) => combineResolvers(classAuthController.isAdmin, callback);
const isStudentResolver = (callback) => combineResolvers(classAuthController.isStudent, callback);
const isCourseStudentResolver = (callback) => combineResolvers(classAuthController.isCourseStudent, callback);
const isCourseInstructorResolver = (callback) => combineResolvers(classAuthController.isCourseInstructor, callback);
const isAllowToAccessCourseResolver = (callback) => combineResolvers(classAuthController.isAllowToAccessCourse, callback);

export const mutation = {
    // EVERYONE
    loginAdmin: isNotAuthResolver((_, { input, ...params } = {}, context) => classAdminAuthController.login({ ...input, ...params }, context)),
    loginStudent: isNotAuthResolver((_, { input, ...params } = {}, context) => classStudentAuthController.login({ ...input, ...params }, context)),
    signUpStudent: isNotAuthResolver((_, { input, ...params } = {}, context) => classStudentAuthController.signUp({ ...input, ...params }, context)),

    // ADMINS OR STUDENTS

    // INSTRUCTORS
    addCourseStudentByInstructor: isCourseInstructorResolver((_, { input, ...params } = {}, context) => classCourseStudentController.addByInstructor({ ...input, ...params }, context)),
    removeCourse: isCourseInstructorResolver((_, { input, ...params } = {}, context) => classCourseController.removeCourse({ ...input, ...params }, context)),
    addCourseMaterial: isCourseInstructorResolver((_, { input, ...params } = {}, context) => classCourseMaterialController.add({ ...input, ...params }, context)),
    removeCourseMaterial: isCourseInstructorResolver((_, { input, ...params } = {}, context) => classCourseMaterialController.remove({ ...input, ...params }, context)),
    removeCourseStudent: isCourseInstructorResolver((_, { input, ...params } = {}, context) => classCourseStudentController.remove({ ...input, ...params }, context)),
    removeCourseVideo: isCourseInstructorResolver((_, { input, ...params } = {}, context) => classCourseVideoController.remove({ ...input, ...params }, context)),
    addCourseVideo: isCourseInstructorResolver((_, { input, ...params } = {}, context) => classCourseVideoController.add({ ...input, ...params }, context)),
    updateCourseVideo: isCourseInstructorResolver((_, { input, ...params } = {}, context) => classCourseVideoController.update({ ...input, ...params }, context)),
    updateCourse: isCourseInstructorResolver((_, { input, ...params } = {}, context) => classCourseController.update({ ...input, ...params }, context)),

    // JUST ADMINS
    generateCourseAccess: isAdminResolver((_, { input, ...params } = {}, context) => classCourseAccessController.add({ ...input, ...params }, context)),
    createBag: isAdminResolver((_, { input, ...params } = {}, context) => classBagController.add({ ...input, ...params }, context)),
    createMedia: isAdminResolver((_, { input, ...params } = {}, context) => classMediaController.add({ ...input, ...params }, context)),
    createSocialNetwork: isAdminResolver((_, { input, ...params } = {}, context) => classSocialNetworkController.add({ ...input, ...params }, context)),
    createCourse: isAdminResolver((_, { input, ...params } = {}, context) => classCourseController.createCourse({ ...input, ...params }, context)),
    removeBag: isAdminResolver((_, { input, ...params } = {}, context) => classBagController.remove({ ...input, ...params }, context)),
    removeMedia: isAdminResolver((_, { input, ...params } = {}, context) => classMediaController.remove({ ...input, ...params }, context)),
    removeSocialNetwork: isAdminResolver((_, { input, ...params } = {}, context) => classSocialNetworkController.remove({ ...input, ...params }, context)),
    updateBag: isAdminResolver((_, { input, ...params } = {}, context) => classBagController.update({ ...input, ...params }, context)),
    updateAdmin: isAdminResolver((_, { input, ...params } = {}, context) => classAdminController.update({ ...input, ...params }, context)),
    updatePasswordAdmin: isAdminResolver((_, { input, ...params } = {}, context) => classAdminController.updatePassword({ ...input, ...params }, context)),
    updatePositionBag: isAdminResolver((_, { input, ...params } = {}, context) => classBagController.updatePositions({ ...input, ...params }, context)),
    updatePositionMedia: isAdminResolver((_, { input, ...params } = {}, context) => classMediaController.updatePositions({ ...input, ...params }, context)),
    updatePositionSocialNetwork: isAdminResolver((_, { input, ...params } = {}, context) => classSocialNetworkController.updatePositions({ ...input, ...params }, context)),

    // JUST STUDENTS
    addCourseStudent: isStudentResolver((_, { input, ...params } = {}, context) => classCourseStudentController.add({ ...input, ...params }, context)),
    updateStudent: isStudentResolver((_, { input, ...params } = {}, context) => classStudentController.update({ ...input, ...params }, context)),
    updatePasswordStudent: isStudentResolver((_, { input, ...params } = {}, context) => classStudentController.updatePassword({ ...input, ...params }, context)),
    sendForgotPasswordStudent: isNotAuthResolver((_, { input, ...params } = {}, context) => classStudentAuthController.sendForgotPassword({ ...input, ...params }, context)),
    resetPasswordStudent: isNotAuthResolver((_, { input, ...params } = {}, context) => classStudentAuthController.resetPassword({ ...input, ...params }, context)),
    validateEmailStudent: (_, { input, ...params } = {}, context) => classStudentAuthController.validateEmail({ ...input, ...params }, context),
    resendValidateEmailStudent: isStudentResolver((_, { input, ...params } = {}, context) => classStudentAuthController.resendValidateEmail({ ...input, ...params }, context)),
};

export default mutation;