import image from './image';
import admin from './admin';

const NAME = "CoursePreview";

const COLUMNS = {
    ID : 'id',
    NAME : 'name',
    DESCRIPTION : 'description',
    MONTHS_TO_EXPIRES : 'months_to_expires',
    IS_ACTIVE : 'is_active',
    CREATED_AT : 'created_at',
    INSTRUCTOR : 'instructor',
    PURCHASE_LINK : 'purchase_link',
    PROFILE_IMAGE : 'profile_image',
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
            ${COLUMNS.IS_ACTIVE} : Boolean
            ${COLUMNS.CREATED_AT} : String
            ${COLUMNS.MONTHS_TO_EXPIRES} : Int
            ${COLUMNS.COUNT_STUDENTS} : Int
            ${COLUMNS.COUNT_VIDEOS} : Int
            ${COLUMNS.PROFILE_IMAGE} : ${image.NAME}
            ${COLUMNS.INSTRUCTOR} : ${admin.NAME}
        }
    `,
};

export default TYPE;