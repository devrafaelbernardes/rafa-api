export const ADMIN = {
    TABLE_NAME : 'admin',
    ID : 'id',
    NAME : 'name',
    LASTNAME : 'lastname',
    EMAIL : 'email',
    PASSWORD : 'password',
    SALT_PASSWORD : 'salt',
    PROFILE_IMAGE : 'profile_image_id',
    IS_ACTIVE : 'is_active',
    CREATED_AT : 'created_at',
}

export const ADMIN_ACCESS = {
    TABLE_NAME : 'admin_access',
    ID : 'id',
    TOKEN : 'token_id',
    ADMIN : 'admin_id',
    IS_ACTIVE : 'is_active',
    CREATED_AT : 'created_at',
}

export const BAG = {
    TABLE_NAME : 'bag',
    ID : 'id',
    NAME : 'name',
    DISCOUNT_PRICE : 'discount_price',
    TOTAL_PRICE : 'total_price',
    INSTALLMENTS_PRICE : 'installments_price',
    INSTALLMENTS : 'installments',
    POSITION : 'position',
    DEPOSIT : 'deposit',
    LINK : 'link',
    FIRST_IMAGE : 'first_image',
    SECOND_IMAGE : 'second_image',
    IS_ACTIVE : 'is_active',
    CREATED_AT : 'created_at',
}

export const BAG_IMAGE = {
    TABLE_NAME : 'bag_image',
    ID : 'id',
    BAG : 'bag_id',
    IMAGE : 'image_id',
    IS_ACTIVE : 'is_active',
    CREATED_AT : 'created_at',
}

export const COURSE = {
    TABLE_NAME : 'course',
    ID : 'id',
    NAME : 'name',
    DESCRIPTION : 'description',
    PURCHASE_LINK : 'purchase_link',
    INSTRUCTOR : 'instructor_id',
    PROFILE_IMAGE : 'profile_image_id',
    MONTHS_TO_EXPIRES : 'months_to_expires',
    IS_ACTIVE : 'is_active',
    CREATED_AT : 'created_at',
}

export const COURSE_MATERIAL = {
    TABLE_NAME : 'course_material',
    ID : 'id',
    NAME : 'name',
    MATERIAL : 'material_id',
    COURSE : 'course_id',
    IS_ACTIVE : 'is_active',
    CREATED_AT : 'created_at',
}

export const COURSE_STUDENT = {
    TABLE_NAME : 'course_student',
    ID : 'id',
    COURSE : 'course_id',
    STUDENT : 'student_id',
    EXPIRES_AT : 'expires_at',
    IS_ACTIVE : 'is_active',
    CREATED_AT : 'created_at',
}

export const COURSE_VIDEO = {
    TABLE_NAME : 'course_video',
    ID : 'id',
    NAME : 'name',
    DESCRIPTION : 'description',
    VIDEO : 'video_id',
    COURSE : 'course_id',
    THUMBNAIL : 'thumbnail_id',
    IS_ACTIVE : 'is_active',
    CREATED_AT : 'created_at',
}

export const COURSE_ACCESS = {
    TABLE_NAME : 'course_access',
    ID : 'id',
    EMAIL : 'email',
    TOKEN : 'token',
    COURSE : 'course_id',
    STUDENT : 'student_id',
    CURRENTY_STATE : 'currenty_state',
    IS_ACTIVE : 'is_active',
    CREATED_AT : 'created_at',
}

export const EMAIL = {
    TABLE_NAME : 'email',
    ID : 'id',
    TO : 'to',
    ADMIN : 'admin_id',
    STUDENT : 'student_id',
    SUBJECT : 'subject',
    MESSAGE : 'message',
    IS_ACTIVE : 'is_active',
    CREATED_AT : 'created_at',
}

export const FORGOT_PASSWORD_STUDENT = {
    TABLE_NAME : 'forgot_password_student',
    ID : 'id',
    OLD_PASSWORD: 'old_password',
    STUDENT : 'student_id',
    IS_OKEY : 'is_okey',
    IS_ACTIVE : 'is_active',
    CREATED_AT : 'created_at',
}

export const VALIDATE_STUDENT_EMAIL = {
    TABLE_NAME : 'validate_student_email',
    ID : 'id',
    STUDENT : 'student_id',
    IS_OKEY : 'is_okey',
    IS_ACTIVE : 'is_active',
    CREATED_AT : 'created_at',
}

export const IMAGE = {
    TABLE_NAME : 'image',
    ID : 'id',
    NAME : 'name',
    IS_ACTIVE : 'is_active',
    CREATED_AT : 'created_at',
}

export const MATERIAL = {
    TABLE_NAME : 'material',
    ID : 'id',
    NAME : 'name',
    IS_ACTIVE : 'is_active',
    CREATED_AT : 'created_at',
}

export const MEDIA = {
    TABLE_NAME : 'media',
    ID : 'id',
    LINK : 'link',
    TITLE : 'title',
    IS_LANDING_PAGE : 'is_landing_page',
    POSITION : 'position',
    IMAGE : 'image_id',
    IS_ACTIVE : 'is_active',
    CREATED_AT : 'created_at',
}

export const MODELING = {
    TABLE_NAME : 'modeling',
    ID : 'id',
    NAME : 'name',
    DESCRIPTION : 'description',
    FILE_NAME: 'file_name',
    IMAGE : 'image_id',
    IS_ACTIVE : 'is_active',
    CREATED_AT : 'created_at',
}

export const ORDER_ITEM = {
    TABLE_NAME : 'order_item',
    ID : 'id',
    TOTAL_PRICE : 'total_price',
    DISCOUNT_PRICE : 'discount_price',
    COURSE : 'course_id',
    ORDER : 'order_id',
    IS_ACTIVE : 'is_active',
    CREATED_AT : 'created_at',
}

export const SOCIAL_NETWORK = {
    TABLE_NAME : 'social_network',
    ID : 'id',
    LINK : 'link',
    POSITION : 'position',
    IMAGE : 'image_id',
    IS_ACTIVE : 'is_active',
    CREATED_AT : 'created_at',
}

export const STUDENT = {
    TABLE_NAME : 'student',
    ID : 'id',
    NAME : 'name',
    LASTNAME : 'lastname',
    EMAIL : 'email',
    PASSWORD : 'password',
    SALT_PASSWORD : 'salt',
    PROFILE_IMAGE : 'profile_image_id',
    IS_ACTIVE : 'is_active',
    CREATED_AT : 'created_at',
}

export const STUDENT_ACCESS = {
    TABLE_NAME : 'student_access',
    ID : 'id',
    TOKEN : 'token_id',
    STUDENT : 'student_id',
    IS_ACTIVE : 'is_active',
    CREATED_AT : 'created_at',
}

export const TOKEN_ACCESS = {
    TABLE_NAME : 'token_access',
    ID : 'id',
    IS_ACTIVE : 'is_active',
    CREATED_AT : 'created_at',
}

export const VIDEO = {
    TABLE_NAME : 'video',
    ID : 'id',
    NAME : 'name',
    IS_ACTIVE : 'is_active',
    CREATED_AT : 'created_at',
}