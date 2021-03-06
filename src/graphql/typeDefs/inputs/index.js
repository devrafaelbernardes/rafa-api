import addCourseStudent from './addCourseStudent';
import addCourseMaterial from './addCourseMaterial';
import addCourseStudentByInstructor from './addCourseStudentByInstructor';
import addCourseVideo from './addCourseVideo';
import createBag from './createBag';
import createMedia from './createMedia';
import createModeling from './createModeling';
import createSocialNetwork from './createSocialNetwork';
import createCourse from './createCourse';
import generateCourseAccess from './generateCourseAccess';
import loginAdmin from './loginAdmin';
import loginStudent from './loginStudent';
import remove from './remove';
import resetPassword from './resetPassword';
import removeCourseMaterial from './removeCourseMaterial';
import removeCourseStudent from './removeCourseStudent';
import removeCourseVideo from './removeCourseVideo';
import signUpStudent from './signUpStudent';
import sendForgotPassword from './sendForgotPassword';
import sendEmailToCourse from './sendEmailToCourse';
import sendEmailToNoCourse from './sendEmailToNoCourse';
import sendEmailTo from './sendEmailTo';
import sendEmailToAll from './sendEmailToAll';
import updateAdmin from './updateAdmin';
import updateBag from './updateBag';
import updateCourse from './updateCourse';
import updateStudent from './updateStudent';
import updatePassword from './updatePassword';
import updateCourseVideo from './updateCourseVideo';
import updateMultiplePosition from './updateMultiplePosition';
import updatePosition from './updatePosition';
import validateEmail from './validateEmail';

import pagination from './pagination';
import sendModelingEmail from './sendModelingEmail';

export const inputs = `
    # EVERYONE
    ${loginAdmin.CONTENT}
    ${loginStudent.CONTENT}
    ${pagination.CONTENT}
    ${signUpStudent.CONTENT}

    # ADMINS OR STUDENTS

    # JUST ADMINS
    ${addCourseStudentByInstructor.CONTENT}
    ${addCourseVideo.CONTENT}
    ${addCourseMaterial.CONTENT}
    ${createBag.CONTENT}
    ${createCourse.CONTENT}
    ${createMedia.CONTENT}
    ${createModeling.CONTENT}
    ${createSocialNetwork.CONTENT}
    ${generateCourseAccess.CONTENT}
    ${remove.CONTENT}
    ${removeCourseMaterial.CONTENT}
    ${removeCourseStudent.CONTENT}
    ${removeCourseVideo.CONTENT}
    ${sendEmailToCourse.CONTENT}
    ${sendEmailToNoCourse.CONTENT}
    ${sendEmailTo.CONTENT}
    ${sendEmailToAll.CONTENT}
    ${sendModelingEmail.CONTENT}
    ${updateAdmin.CONTENT}
    ${updateBag.CONTENT}
    ${updateCourse.CONTENT}
    ${updateCourseVideo.CONTENT}
    ${updateMultiplePosition.CONTENT}
    ${updatePosition.CONTENT}
    ${updatePassword.CONTENT}
    ${updateStudent.CONTENT}

    # JUST STUDENTS  
    ${addCourseStudent.CONTENT}
    ${resetPassword.CONTENT}
    ${sendForgotPassword.CONTENT}
    ${validateEmail.CONTENT}
`;

export default inputs;