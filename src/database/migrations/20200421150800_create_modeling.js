const TABLE = {
    TABLE_NAME : 'modeling',
    ID : 'id',
    NAME : 'name',
    DESCRIPTION : 'description',
    FILE_NAME: 'file_name',
    IMAGE : 'image_id',
    IS_ACTIVE : 'is_active',
    CREATED_AT : 'created_at',
}

exports.up = function (knex) {
    return knex.schema.createTable(TABLE.TABLE_NAME, function (table) {
        table.increments(TABLE.ID).notNullable().primary();
        table.string(TABLE.NAME).notNullable();
        table.string(TABLE.FILE_NAME).notNullable();
        table.text(TABLE.DESCRIPTION);

        // WITH DEFAULTS
        table.boolean(TABLE.IS_ACTIVE).notNullable().defaultTo(true);
        table.timestamp(TABLE.CREATED_AT).notNullable().defaultTo(knex.fn.now());

        // FOREIGN COLUMNS
        table.integer(TABLE.IMAGE).unsigned();

        // FOREIGN KEYS
        table.foreign(TABLE.IMAGE).references('id').inTable('image');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable(TABLE.TABLE_NAME);
};
