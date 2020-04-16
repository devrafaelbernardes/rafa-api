import inputAddCourseStudent from '../inputs/addCourseStudent';
import inputAddCourseStudentByInstructor from '../inputs/addCourseStudentByInstructor';
import inputAddCourseVideo from '../inputs/addCourseVideo';
import inputCreateCourse from '../inputs/createCourse';
import inputCreateBag from '../inputs/createBag';
import inputCreateMedia from '../inputs/createMedia';
import inputCreateSocialNetwork from '../inputs/createSocialNetwork';
import inputGenerateCourseAccess from '../inputs/generateCourseAccess';
import inputLoginAdmin from '../inputs/loginAdmin';
import inputLoginStudent from '../inputs/loginStudent';
import inputRemove from '../inputs/remove';
import inputRemoveCourseStudent from '../inputs/removeCourseStudent';
import inputRemoveCourseVideo from '../inputs/removeCourseVideo';
import inputSignUpStudent from '../inputs/signUpStudent';
import inputUpdateAdmin from '../inputs/updateAdmin';
import inputUpdateBag from '../inputs/updateBag';
import inputUpdatePassword from '../inputs/updatePassword';
import inputUpdateStudent from '../inputs/updateStudent';
import inputUpdateCourse from '../inputs/updateCourse';
import inputUpdateCourseVideo from '../inputs/updateCourseVideo';
import inputUpdateMultiplePosition from '../inputs/updateMultiplePosition';

import admin from './admin';
import adminAccess from './adminAccess';
import bag from './bag';
import course from './course';
import courseAccess from './courseAccess';
import courseStudent from './courseStudent';
import courseVideo from './courseVideo';
import media from './media';
import socialNetwork from './socialNetwork';
import student from './student';
import studentAccess from './studentAccess';

const NAME = "Mutation";

export const TYPE = {
    NAME,
    CONTENT: `
        type ${NAME}{
            # EVERYONE

            # ADMINS OR STUDENTS

            # JUST ADMINS
            loginAdmin(${inputLoginAdmin.CONTENT_FOR_PARAMS}) : String
            addCourseStudentByInstructor(${inputAddCourseStudentByInstructor.CONTENT_FOR_PARAMS}) : ${courseStudent.NAME}
            addCourseVideo(${inputAddCourseVideo.CONTENT_FOR_PARAMS}, video : Upload) : ${courseVideo.NAME}
            createCourse(${inputCreateCourse.CONTENT_FOR_PARAMS}, image: Upload) : ${course.NAME}
            createBag(${inputCreateBag.CONTENT_FOR_PARAMS}, firstImage : Upload, secondImage : Upload) : ${bag.NAME}
            createMedia(${inputCreateMedia.CONTENT_FOR_PARAMS}, image : Upload) : ${media.NAME}
            createSocialNetwork(${inputCreateSocialNetwork.CONTENT_FOR_PARAMS}, image : Upload) : ${socialNetwork.NAME}
            generateCourseAccess(${inputGenerateCourseAccess.CONTENT_FOR_PARAMS}) : ${courseAccess.NAME}
            removeBag(${inputRemove.CONTENT_FOR_PARAMS}) : ${bag.NAME}
            removeCourse(${inputRemove.CONTENT_FOR_PARAMS}) : ${course.NAME}
            removeCourseStudent(${inputRemoveCourseStudent.CONTENT_FOR_PARAMS}) : ${courseStudent.NAME}
            removeCourseVideo(${inputRemoveCourseVideo.CONTENT_FOR_PARAMS}) : ${courseVideo.NAME}
            removeMedia(${inputRemove.CONTENT_FOR_PARAMS}) : ${media.NAME}
            removeSocialNetwork(${inputRemove.CONTENT_FOR_PARAMS}) : ${socialNetwork.NAME}
            updateBag(${inputUpdateBag.CONTENT_FOR_PARAMS}, firstImage : Upload, secondImage : Upload) : ${bag.NAME}
            updateCourse(${inputUpdateCourse.CONTENT_FOR_PARAMS}, image: Upload) : ${course.NAME}
            updateCourseVideo(${inputUpdateCourseVideo.CONTENT_FOR_PARAMS}) : ${courseVideo.NAME}
            updatePositionBag(${inputUpdateMultiplePosition.CONTENT_FOR_PARAMS}) : Boolean
            updatePositionMedia(${inputUpdateMultiplePosition.CONTENT_FOR_PARAMS}) : Boolean
            updatePositionSocialNetwork(${inputUpdateMultiplePosition.CONTENT_FOR_PARAMS}) : Boolean
            updateAdmin(${inputUpdateAdmin.CONTENT_FOR_PARAMS}, image : Upload) : ${admin.NAME}
            updatePasswordAdmin(${inputUpdatePassword.CONTENT_FOR_PARAMS}) : Boolean


            # JUST STUDENTS
            loginStudent(${inputLoginStudent.CONTENT_FOR_PARAMS}) : String
            signUpStudent(${inputSignUpStudent.CONTENT_FOR_PARAMS}) : String
            addCourseStudent(${inputAddCourseStudent.CONTENT_FOR_PARAMS}) : ${courseStudent.NAME}
            updateStudent(${inputUpdateStudent.CONTENT_FOR_PARAMS}, image : Upload) : ${student.NAME}
            updatePasswordStudent(${inputUpdatePassword.CONTENT_FOR_PARAMS}) : Boolean
        }
    `,
};
export default TYPE;