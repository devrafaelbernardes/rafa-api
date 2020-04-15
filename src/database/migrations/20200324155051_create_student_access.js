const TABLE = {
    TABLE_NAME : 'student_access',
    ID : 'id',
    TOKEN : 'token_id',
    STUDENT : 'student_id',
    IS_ACTIVE : 'is_active',
    CREATED_AT : 'created_at',
}

exports.up = function (knex) {
    return knex.schema.createTable(TABLE.TABLE_NAME, function(table){
        table.increments(TABLE.ID).notNullable().primary();
        
        // WITH DEFAULTS
        table.boolean(TABLE.IS_ACTIVE).notNullable().defaultTo(true);
        table.timestamp(TABLE.CREATED_AT).notNullable().defaultTo(knex.fn.now());

        // FOREIGN COLUMNS
        table.integer(TABLE.STUDENT).notNullable().unsigned();
        table.integer(TABLE.TOKEN).notNullable().unsigned().unique();

        // FOREIGN KEYS
        table.foreign(TABLE.STUDENT).references('id').inTable('student');
        table.foreign(TABLE.TOKEN).references('id').inTable('token_access');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable(TABLE.TABLE_NAME);
};
