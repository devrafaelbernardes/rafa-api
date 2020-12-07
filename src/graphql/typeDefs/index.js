import admin from './types/admin';
import adminAccess from './types/adminAccess';
import bag from './types/bag';
import bags from './types/bags';
import bagImage from './types/bagImage';
import bagImages from './types/bagImages';
import course from './types/course';
import courses from './types/courses';
import courseAccess from './types/courseAccess';
import courseAccesses from './types/courseAccesses';
import courseMaterial from './types/courseMaterial';
import courseMaterials from './types/courseMaterials';
import coursePreview from './types/coursePreview';
import coursesPreview from './types/coursesPreview';
import courseStudent from './types/courseStudent';
import courseStudents from './types/courseStudents';
import courseVideo from './types/courseVideo';
import courseVideos from './types/courseVideos';
import email from './types/email';
import emails from './types/emails';
import image from './types/image';
import material from './types/material';
import media from './types/media';
import medias from './types/medias';
import modeling from './types/modeling';
import modelings from './types/modelings';
import socialNetwork from './types/socialNetwork';
import socialNetworks from './types/socialNetworks';
import student from './types/student';
import students from './types/students';
import studentAccess from './types/studentAccess';
import tokenAccess from './types/tokenAccess';
import pageInfo from './types/pageInfo';
import video from './types/video';

import query from './types/query';
import mutation from './types/mutation';
import subscription from './types/subscription';

import inputs from './inputs';

export const typeDefs = `
    scalar Upload

    ${ admin.CONTENT }
    ${ adminAccess.CONTENT }
    ${ bag.CONTENT }
    ${ bags.CONTENT }
    ${ bagImage.CONTENT }
    ${ bagImages.CONTENT }
    ${ course.CONTENT }
    ${ courses.CONTENT }
    ${ courseAccess.CONTENT }
    ${ courseAccesses.CONTENT }
    ${ courseMaterial.CONTENT }
    ${ courseMaterials.CONTENT }
    ${ coursePreview.CONTENT }
    ${ coursesPreview.CONTENT }
    ${ courseStudent.CONTENT }
    ${ courseStudents.CONTENT }
    ${ courseVideo.CONTENT }
    ${ courseVideos.CONTENT }
    ${ email.CONTENT }
    ${ emails.CONTENT }
    ${ image.CONTENT }
    ${ material.CONTENT }
    ${ media.CONTENT }
    ${ medias.CONTENT }
    ${ modeling.CONTENT }
    ${ modelings.CONTENT }
    ${ socialNetwork.CONTENT }
    ${ socialNetworks.CONTENT }
    ${ student.CONTENT }
    ${ students.CONTENT }
    ${ studentAccess.CONTENT }
    ${ tokenAccess.CONTENT }
    ${ video.CONTENT }

    ${ pageInfo.CONTENT }

    ${ inputs }

    ${ query.CONTENT }
    ${ mutation.CONTENT }
    ${ subscription.CONTENT }
`;

export default typeDefs;