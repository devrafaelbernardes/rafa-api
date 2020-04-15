const TABLE = {
    TABLE_NAME : 'course_student',
    ID : 'id',
    COURSE : 'course_id',
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
        table.integer(TABLE.COURSE).notNullable().unsigned();
        table.integer(TABLE.STUDENT).notNullable().unsigned();

        // FOREIGN KEYS
        table.foreign(TABLE.COURSE).references('id').inTable('course');
        table.foreign(TABLE.STUDENT).references('id').inTable('student');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable(TABLE.TABLE_NAME);
};
