import { combineResolvers } from 'graphql-resolvers';

import AuthController from '../../../classes/controllers/AuthController';
import AdminController from '../../../classes/controllers/AdminController';
import BagController from '../../../classes/controllers/BagController';
import CourseController from '../../../classes/controllers/CourseController';
import CourseAccessController from '../../../classes/controllers/CourseAccessController';
import CourseStudentController from '../../../classes/controllers/CourseStudentController';
import CourseVideoController from '../../../classes/controllers/CourseVideoController';
import EmailController from '../../../classes/controllers/EmailController';
import MediaController from '../../../classes/controllers/MediaController';
import SocialNetworkController from '../../../classes/controllers/SocialNetworkController';
import StudentController from '../../../classes/controllers/StudentController';
import StudentAuthController from '../../../classes/controllers/StudentAuthController';

const classAuthController = AuthController();
const classAdminController = AdminController();
const classBagController = BagController();
const classCourseController = CourseController();
const classCourseAccessController = CourseAccessController();
const classCourseStudentController = CourseStudentController();
const classCourseVideoController = CourseVideoController();
const classEmailController = EmailController();
const classMediaController = MediaController();
const classSocialNetworkController = SocialNetworkController();
const classStudentController = StudentController();
const classStudentAuthController = StudentAuthController();

const isAuthResolver = (callback) => combineResolvers(classAuthController.isAuthenticated, callback);
const isNotAuthResolver = (callback) => combineResolvers(classAuthController.isNotAuthenticated, callback);
const isAdminResolver = (callback) => combineResolvers(classAuthController.isAdmin, callback);
const isStudentResolver = (callback) => combineResolvers(classAuthController.isStudent, callback);
const isCourseStudentResolver = (callback) => combineResolvers(classAuthController.isCourseStudent, callback);
const isCourseInstructorResolver = (callback) => combineResolvers(classAuthController.isCourseInstructor, callback);
const isAllowToAccessCourseResolver = (callback) => combineResolvers(classAuthController.isAllowToAccessCourse, callback);

export const query = {
    // EVERYONE
    bag: (_, params, context) => classBagController.bag(params, context),
    bags: (_, params, context) => classBagController.bags(params, context),
    course_preview: (_, params, context) => classCourseController.coursePreview(params, context),
    courses_preview: (_, params, context) => classCourseController.coursesPreview(params, context),
    media: (_, params, context) => classMediaController.media(params, context),
    medias: (_, params, context) => classMediaController.medias(params, context),
    social_network: (_, params, context) => classSocialNetworkController.socialNetwork(params, context),
    social_networks: (_, params, context) => classSocialNetworkController.socialNetworks(params, context),

    // SOME COURSE
    course: isAllowToAccessCourseResolver((_, params, context) => classCourseController.course(params, context)),
    
    // ADMINS OR STUDENTS
    courses: isAuthResolver((_, params, context) => classCourseController.courses(params, context)),
    course_video: isAllowToAccessCourseResolver((_, params, context) => classCourseVideoController.get(params, context)),
    
    // JUST ADMINS
    me_admin: isAdminResolver((_, params, context) => classAdminController.meAdmin(params, context)),
    course_access: isAdminResolver((_, params, context) => classCourseAccessController.courseAccess(params, context)),
    course_accesses: isAdminResolver((_, params, context) => classCourseAccessController.courseAccesses(params, context)),
    course_students: isAdminResolver((_, params, context) => classCourseStudentController.students(params, context)),
    students_no_course: isAdminResolver((_, params, context) => classCourseStudentController.studentsHaveNoCourse(params, context)),
    students_have_course: isAdminResolver((_, params, context) => classCourseStudentController.studentsHaveCourse(params, context)),
    emails: isAdminResolver((_, params, context) => classEmailController.all(params, context)),
    students: isAdminResolver((_, params, context) => classStudentController.students(params, context)),
    
    // JUST STUDENTS
    me_student: isStudentResolver((_, params, context) => classStudentController.meStudent(params, context)),
    is_valid_token_reset_password: isNotAuthResolver((_, params, context) => classStudentAuthController.isValidTokenResetPassword(params, context)),
};

export default query;