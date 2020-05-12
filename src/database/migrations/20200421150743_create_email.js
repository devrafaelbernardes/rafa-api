const TABLE = {
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

exports.up = function (knex) {
    return knex.schema.createTable(TABLE.TABLE_NAME, function (table) {
        table.increments(TABLE.ID).notNullable().primary();
        table.string(TABLE.TO).notNullable();
        table.string(TABLE.SUBJECT).notNullable();
        table.text(TABLE.MESSAGE).notNullable();

        // WITH DEFAULTS
        table.boolean(TABLE.IS_ACTIVE).notNullable().defaultTo(true);
        table.timestamp(TABLE.CREATED_AT).notNullable().defaultTo(knex.fn.now());

        // FOREIGN COLUMNS
        table.integer(TABLE.STUDENT).unsigned();
        table.integer(TABLE.ADMIN).notNullable().unsigned();

        // FOREIGN KEYS
        table.foreign(TABLE.STUDENT).references('id').inTable('student');
        table.foreign(TABLE.ADMIN).references('id').inTable('admin');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable(TABLE.TABLE_NAME);
};
