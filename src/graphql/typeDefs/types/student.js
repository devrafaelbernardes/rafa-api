import image from './image';

const NAME = "Student";

const COLUMNS = {
    ID : 'id',
    NAME : 'name',
    LASTNAME : 'lastname',
    FULL_NAME : 'full_name',
    EMAIL : 'email',
    PROFILE_IMAGE : 'profile_image',
    IS_VALIDATED_EMAIL : 'is_validated_email',
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
            ${COLUMNS.LASTNAME} : String
            ${COLUMNS.FULL_NAME} : String
            ${COLUMNS.EMAIL} : String
            ${COLUMNS.IS_VALIDATED_EMAIL} : Boolean
            ${COLUMNS.IS_ACTIVE} : Boolean
            ${COLUMNS.CREATED_AT} : String
            ${COLUMNS.PROFILE_IMAGE} : ${image.NAME}
        }
    `,
};

export default TYPE;