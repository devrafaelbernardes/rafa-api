import video from './video';
import image from './image';

const NAME = "CourseVideo";

const COLUMNS = {
    ID : 'id',
    NAME : 'name',
    DESCRIPTION : 'description',
    VIDEO : 'video',
    THUMBNAIL : 'thumbnail',
    IS_ACTIVE : 'is_active',
    CREATED_AT : 'created_at',
};

export const TYPE = {
    NAME,
    COLUMNS,
    CONTENT: `
        type ${NAME}{
            ${COLUMNS.ID} : ID
            ${COLUMNS.NAME} : String
            ${COLUMNS.DESCRIPTION} : String
            ${COLUMNS.IS_ACTIVE} : Boolean
            ${COLUMNS.CREATED_AT} : String
            ${COLUMNS.VIDEO} : ${video.NAME}
            ${COLUMNS.THUMBNAIL} : ${image.NAME}
        }
    `,
};

export default TYPE;