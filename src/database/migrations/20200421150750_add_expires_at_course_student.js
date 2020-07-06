const TABLE = {
    TABLE_NAME : 'course_student',
    AFTER_COLUMN : 'id',
    NEW_COLUMN : 'expires_at',
}

exports.up = function (knex) {
    return knex.schema.alterTable(TABLE.TABLE_NAME, function(table){
        table.date(TABLE.NEW_COLUMN).defaultTo(null).after(TABLE.AFTER_COLUMN);
    })
};

exports.down = function (knex) {
    return knex.schema.alterTable(TABLE.TABLE_NAME, function(table){
        table.dropColumn(TABLE.NEW_COLUMN);
    })
};
