const TABLE = {
    TABLE_NAME : 'course_access',
    ID : 'id',
    TOKEN : 'token_id',
    COURSE : 'course_id',
    STUDENT : 'student_id',
    CURRENTY_STATE : 'currenty_state',
    IS_ACTIVE : 'is_active',
    CREATED_AT : 'created_at',
}

exports.up = function (knex) {
    return knex.schema.createTable(TABLE.TABLE_NAME, function(table){
        table.increments(TABLE.ID).notNullable().primary();
        
        // WITH DEFAULTS
        table.integer(TABLE.CURRENTY_STATE).notNullable().defaultTo(1);
        table.boolean(TABLE.IS_ACTIVE).notNullable().defaultTo(true);
        table.timestamp(TABLE.CREATED_AT).notNullable().defaultTo(knex.fn.now());

        // FOREIGN COLUMNS
        table.integer(TABLE.STUDENT).unsigned();
        table.integer(TABLE.COURSE).notNullable().unsigned();
        table.integer(TABLE.TOKEN).notNullable().unsigned().unique();

        // FOREIGN KEYS
        table.foreign(TABLE.COURSE).references('id').inTable('course');
        table.foreign(TABLE.STUDENT).references('id').inTable('student');
        table.foreign(TABLE.TOKEN).references('id').inTable('token_access');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable(TABLE.TABLE_NAME);
};
