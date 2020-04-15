import video from './video';

const NAME = "CourseVideo";

const COLUMNS = {
    ID : 'id',
    NAME : 'name',
    DESCRIPTION : 'description',
    VIDEO : 'video',
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
        }
    `,
};

export default TYPE;