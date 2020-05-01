const TABLE = {
    TABLE_NAME : 'forgot_password_student',
    ID : 'id',
    OLD_PASSWORD: 'old_password',
    STUDENT : 'student_id',
    IS_OKEY : 'is_okey',
    IS_ACTIVE : 'is_active',
    CREATED_AT : 'created_at',
}

exports.up = function (knex) {
    return knex.schema.createTable(TABLE.TABLE_NAME, function(table){
        table.increments(TABLE.ID).notNullable().primary();
        table.string(TABLE.OLD_PASSWORD);
        
        // WITH DEFAULTS
        table.boolean(TABLE.IS_OKEY).notNullable().defaultTo(false);
        table.boolean(TABLE.IS_ACTIVE).notNullable().defaultTo(true);
        table.timestamp(TABLE.CREATED_AT).notNullable().defaultTo(knex.fn.now());

        // FOREIGN COLUMNS
        table.integer(TABLE.STUDENT).unsigned();

        // FOREIGN KEYS
        table.foreign(TABLE.STUDENT).references('id').inTable('student');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable(TABLE.TABLE_NAME);
};