import { combineResolvers } from 'graphql-resolvers';

import AuthController from '../../../classes/controllers/AuthController';

import AdminSubscription from '../../../classes/subscriptions/AdminSubscription';
import CourseSubscription from '../../../classes/subscriptions/CourseSubscription';
import CourseStudentSubscription from '../../../classes/subscriptions/CourseStudentSubscription';
import StudentSubscription from '../../../classes/subscriptions/StudentSubscription';

const classAuthController = AuthController();
const classAdminSubscription = AdminSubscription();
const classCourseSubscription = CourseSubscription();
const classCourseStudentSubscription = CourseStudentSubscription();
const classStudentSubscription = StudentSubscription();

const isAdminResolver = (callback) => combineResolvers(classAuthController.isAdmin, callback);

/* 
    const isAuthResolver = (callback) => combineResolvers(classAuthController.isAuthenticated, callback);
    const isNotAuthResolver = (callback) => combineResolvers(classAuthController.isNotAuthenticated, callback);
    const isStudentResolver = (callback) => combineResolvers(classAuthController.isStudent, callback);
    const isCourseStudentResolver = (callback) => combineResolvers(classAuthController.isCourseStudent, callback);
    const isCourseInstructorResolver = (callback) => combineResolvers(classAuthController.isCourseInstructor, callback);
    const isAllowToAccessCourseResolver = (callback) => combineResolvers(classAuthController.isAllowToAccessCourse, callback);
*/

export const subscription = {
    adminAdded: {
        subscribe: isAdminResolver(() => classAdminSubscription.added.subscribe())
    },
    adminUpdated: {
        subscribe: isAdminResolver(classAdminSubscription.updated.subscribe())
    },

    courseAdded: {
        subscribe: isAdminResolver(() => classCourseSubscription.added.subscribe())
    },
    courseUpdated: {
        subscribe: isAdminResolver(classCourseSubscription.updated.subscribe())
    },

    courseStudentAdded: {
        subscribe: isAdminResolver(classCourseStudentSubscription.added.subscribe())
    },

    studentAdded: {
        subscribe: isAdminResolver(() => classStudentSubscription.added.subscribe())
    },
    studentUpdated: {
        subscribe: isAdminResolver(classStudentSubscription.updated.subscribe())
    },
};

export default subscription;