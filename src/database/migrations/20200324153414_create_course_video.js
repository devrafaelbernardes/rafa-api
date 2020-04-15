const TABLE = {
    TABLE_NAME : 'course_video',
    ID : 'id',
    NAME : 'name',
    DESCRIPTION : 'description',
    VIDEO : 'video_id',
    COURSE : 'course_id',
    IS_ACTIVE : 'is_active',
    CREATED_AT : 'created_at',
}

exports.up = function (knex) {
    return knex.schema.createTable(TABLE.TABLE_NAME, function(table){
        table.increments(TABLE.ID).notNullable().primary();
        table.string(TABLE.NAME).notNullable();
        table.text(TABLE.DESCRIPTION);
        
        // WITH DEFAULTS
        table.boolean(TABLE.IS_ACTIVE).notNullable().defaultTo(true);
        table.timestamp(TABLE.CREATED_AT).notNullable().defaultTo(knex.fn.now());

        // FOREIGN COLUMNS
        table.integer(TABLE.COURSE).notNullable().unsigned();
        table.integer(TABLE.VIDEO).notNullable().unsigned();

        // FOREIGN KEYS
        table.foreign(TABLE.COURSE).references('id').inTable('course');
        table.foreign(TABLE.VIDEO).references('id').inTable('video');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable(TABLE.TABLE_NAME);
};
