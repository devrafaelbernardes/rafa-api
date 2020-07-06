import image from './image';
import admin from './admin';
import courseStudents from './courseStudents';
import courseMaterials from './courseMaterials';
import courseVideos from './courseVideos';
import pagination from '../inputs/pagination';

const NAME = "Course";

const COLUMNS = {
    ID : 'id',
    NAME : 'name',
    DESCRIPTION : 'description',
    PURCHASE_LINK : 'purchase_link',
    INSTRUCTOR : 'instructor',
    PROFILE_IMAGE : 'profile_image',
    IS_ACTIVE : 'is_active',
    MONTHS_TO_EXPIRES : 'months_to_expires',
    CREATED_AT : 'created_at',
    MATERIALS : 'materials',
    STUDENTS : 'students',
    VIDEOS : 'videos',
    COUNT_MATERIALS : 'count_materials',
    COUNT_STUDENTS : 'count_students',
    COUNT_VIDEOS : 'count_videos',
};

export const TYPE = {
    NAME,
    COLUMNS,
    CONTENT: `
        type ${NAME}{
            ${COLUMNS.ID} : ID
            ${COLUMNS.NAME} : String
            ${COLUMNS.DESCRIPTION} : String
            ${COLUMNS.PURCHASE_LINK} : String
            ${COLUMNS.MONTHS_TO_EXPIRES} : Int
            ${COLUMNS.IS_ACTIVE} : Boolean
            ${COLUMNS.CREATED_AT} : String
            ${COLUMNS.COUNT_MATERIALS} : Int
            ${COLUMNS.COUNT_STUDENTS} : Int
            ${COLUMNS.COUNT_VIDEOS} : Int
            ${COLUMNS.PROFILE_IMAGE} : ${image.NAME}
            ${COLUMNS.INSTRUCTOR} : ${admin.NAME}
            ${COLUMNS.MATERIALS}(${pagination.CONTENT_FOR_PARAMS}) : ${courseMaterials.NAME}
            ${COLUMNS.STUDENTS}(${pagination.CONTENT_FOR_PARAMS}) : ${courseStudents.NAME}
            ${COLUMNS.VIDEOS}(${pagination.CONTENT_FOR_PARAMS}) : ${courseVideos.NAME}
        }
    `,
};

export default TYPE;