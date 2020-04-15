import admin from './admin';
import bag from './bag';
import bags from './bags';
import course from './course';
import courses from './courses';
import courseAccess from './courseAccess';
import courseAccesses from './courseAccesses';
import courseStudents from './courseStudents';
import coursePreview from './coursePreview';
import courseVideo from './courseVideo';
import coursesPreview from './coursesPreview';
import media from './media';
import medias from './medias';
import socialNetwork from './socialNetwork';
import socialNetworks from './socialNetworks';
import student from './student';
import students from './students';

import pagination from '../inputs/pagination';

const NAME = "Query";

export const TYPE = {
    NAME,
    CONTENT: `
        type ${NAME} {
            # EVERYONE
            bag(id : ID) : ${bag.NAME}
            course_preview(id : ID, token : String) : ${coursePreview.NAME}
            media(id : ID) : ${media.NAME}
            social_network(id : ID) : ${socialNetwork.NAME}
            bags(${pagination.CONTENT_FOR_PARAMS}) : ${bags.NAME}
            courses_preview(${pagination.CONTENT_FOR_PARAMS}) : ${coursesPreview.NAME}
            medias(${pagination.CONTENT_FOR_PARAMS}) : ${medias.NAME}
            social_networks(${pagination.CONTENT_FOR_PARAMS}) : ${socialNetworks.NAME}

            # ADMINS OR STUDENTS
            course(id : ID) : ${course.NAME}
            course_access(id : ID) : ${courseAccess.NAME}
            courses(${pagination.CONTENT_FOR_PARAMS}) : ${courses.NAME}
            course_accesses(courseId : ID, ${pagination.CONTENT_FOR_PARAMS}) : ${courseAccesses.NAME}
            course_video(courseId : ID, videoId : ID) : ${courseVideo.NAME}

            # JUST ADMINS
            me_admin : ${admin.NAME}
            students(${pagination.CONTENT_FOR_PARAMS}) : ${students.NAME}
            course_students(courseId: ID, ${pagination.CONTENT_FOR_PARAMS}) : ${courseStudents.NAME}

            # JUST STUDENTS
            me_student : ${student.NAME}
        }
    `,
};

export default TYPE;