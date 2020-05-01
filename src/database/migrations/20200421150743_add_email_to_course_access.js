const TABLE = {
    TABLE_NAME : 'course_access',
    EMAIL : 'email',
    ID : 'id',
}

exports.up = function (knex) {
    return knex.schema.alterTable(TABLE.TABLE_NAME, function(table){
        table.string(TABLE.EMAIL).after(TABLE.ID);
    })
};

exports.down = function (knex) {
    return knex.schema.alterTable(TABLE.TABLE_NAME, function(table){
        table.dropColumn(TABLE.EMAIL);
    })
};
