const TABLE = {
    TABLE_NAME: 'student',
    ID: 'id',
    NAME: 'name',
    LASTNAME: 'lastname',
    EMAIL: 'email',
    PASSWORD: 'password',
    SALT_PASSWORD: 'salt',
    PROFILE_IMAGE: 'profile_image_id',
    IS_ACTIVE: 'is_active',
    CREATED_AT: 'created_at',
}

exports.up = function (knex) {
    return knex.schema.createTable(TABLE.TABLE_NAME, function (table) {
        table.increments(TABLE.ID).notNullable().primary();
        table.string(TABLE.NAME, 40).notNullable();
        table.string(TABLE.LASTNAME, 100).notNullable();
        table.string(TABLE.EMAIL).notNullable().unique();
        table.string(TABLE.PASSWORD).notNullable();
        table.string(TABLE.SALT_PASSWORD).notNullable();

        // WITH DEFAULTS
        table.boolean(TABLE.IS_ACTIVE).notNullable().defaultTo(true);
        table.timestamp(TABLE.CREATED_AT).notNullable().defaultTo(knex.fn.now());

        // FOREIGN COLUMNS
        table.integer(TABLE.PROFILE_IMAGE).unsigned();

        // FOREIGN KEYS
        table.foreign(TABLE.PROFILE_IMAGE).references('id').inTable('image');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable(TABLE.TABLE_NAME);
};
