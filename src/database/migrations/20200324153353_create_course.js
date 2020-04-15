const TABLE = {
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

exports.up = function (knex) {
    return knex.schema.createTable(TABLE.TABLE_NAME, function(table){
        table.increments(TABLE.ID).notNullable().primary();
        table.string(TABLE.NAME).notNullable();
        table.text(TABLE.DESCRIPTION);
        table.string(TABLE.PURCHASE_LINK);
        
        // WITH DEFAULTS
        table.boolean(TABLE.IS_ACTIVE).notNullable().defaultTo(true);
        table.timestamp(TABLE.CREATED_AT).notNullable().defaultTo(knex.fn.now());

        // FOREIGN COLUMNS
        table.integer(TABLE.INSTRUCTOR).notNullable().unsigned();
        table.integer(TABLE.PROFILE_IMAGE).unsigned();

        // FOREIGN KEYS
        table.foreign(TABLE.INSTRUCTOR).references('id').inTable('admin');
        table.foreign(TABLE.PROFILE_IMAGE).references('id').inTable('image');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable(TABLE.TABLE_NAME);
};
