import Query from './query';
import Mutation from './mutation';
import Subscription from './subscription';
import { GraphQLUpload } from 'apollo-upload-server';

import admin from '../typeDefs/types/admin';
import AdminGraphql from './types/AdminGraphql';

import adminAccess from '../typeDefs/types/adminAccess';
import AdminAccessGraphql from './types/AdminAccessGraphql';

import bag from '../typeDefs/types/bag';
import BagGraphql from './types/BagGraphql';

import bagImage from '../typeDefs/types/bagImage';
import BagImageGraphql from './types/BagImageGraphql';

import course from '../typeDefs/types/course';
import CourseGraphql from './types/CourseGraphql';

import courseAccess from '../typeDefs/types/courseAccess';
import CourseAccessGraphql from './types/CourseAccessGraphql';

import coursePreview from '../typeDefs/types/coursePreview';
import CoursePreviewGraphql from './types/CoursePreviewGraphql';

import courseStudent from '../typeDefs/types/courseStudent';
import CourseStudentGraphql from './types/CourseStudentGraphql';

import courseVideo from '../typeDefs/types/courseVideo';
import CourseVideoGraphql from './types/CourseVideoGraphql';

import image from '../typeDefs/types/image';
import ImageGraphql from './types/ImageGraphql';

import media from '../typeDefs/types/media';
import MediaGraphql from './types/MediaGraphql';

import socialNetwork from '../typeDefs/types/socialNetwork';
import SocialNetworkGraphql from './types/SocialNetworkGraphql';

import student from '../typeDefs/types/student';
import StudentGraphql from './types/StudentGraphql';

import studentAccess from '../typeDefs/types/studentAccess';
import StudentAccessGraphql from './types/StudentAccessGraphql';

import tokenAccess from '../typeDefs/types/tokenAccess';
import TokenAccessGraphql from './types/TokenAccessGraphql';

import video from '../typeDefs/types/video';
import VideoGraphql from './types/VideoGraphql';


export const resolvers = {
    Query,
    Mutation,
    Subscription,
    Upload: GraphQLUpload,

    [admin.NAME] : AdminGraphql,
    [adminAccess.NAME] : AdminAccessGraphql,
    [bag.NAME] : BagGraphql,
    [bagImage.NAME] : BagImageGraphql,
    [course.NAME] : CourseGraphql,
    [courseAccess.NAME] : CourseAccessGraphql,
    [coursePreview.NAME] : CoursePreviewGraphql,
    [courseStudent.NAME] : CourseStudentGraphql,
    [courseVideo.NAME] : CourseVideoGraphql,
    [image.NAME] : ImageGraphql,
    [media.NAME] : MediaGraphql,
    [socialNetwork.NAME] : SocialNetworkGraphql,
    [student.NAME] : StudentGraphql,
    [studentAccess.NAME] : StudentAccessGraphql,
    [tokenAccess.NAME] : TokenAccessGraphql,
    [video.NAME] : VideoGraphql,
};
export default resolvers;