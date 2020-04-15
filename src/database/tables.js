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
    IS_ACTIVE : 'is_active',
    CREATED_AT : 'created_at',
}

export const COURSE_STUDENT = {
    TABLE_NAME : 'course_student',
    ID : 'id',
    COURSE : 'course_id',
    STUDENT : 'student_id',
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
    IS_ACTIVE : 'is_active',
    CREATED_AT : 'created_at',
}

export const COURSE_ACCESS = {
    TABLE_NAME : 'course_access',
    ID : 'id',
    TOKEN : 'token_id',
    COURSE : 'course_id',
    STUDENT : 'student_id',
    CURRENTY_STATE : 'currenty_state',
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

export const MEDIA = {
    TABLE_NAME : 'media',
    ID : 'id',
    LINK : 'link',
    POSITION : 'position',
    IMAGE : 'image_id',
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
    TOKEN : 'token',
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