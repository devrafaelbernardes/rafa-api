const TABLE = {
    TABLE_NAME : 'course',
    AFTER_COLUMN : 'id',
    NEW_COLUMN : 'months_to_expires',
}

exports.up = function (knex) {
    return knex.schema.alterTable(TABLE.TABLE_NAME, function(table){
        table.integer(TABLE.NEW_COLUMN).unsigned().after(TABLE.AFTER_COLUMN);
    })
};

exports.down = function (knex) {
    return knex.schema.alterTable(TABLE.TABLE_NAME, function(table){
        table.dropColumn(TABLE.NEW_COLUMN);
    })
};
