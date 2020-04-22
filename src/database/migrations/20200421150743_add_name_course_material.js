const TABLE = {
    TABLE_NAME : 'course_material',
    NAME : 'name',
    COURSE : 'course_id',
}

exports.up = function (knex) {
    return knex.schema.alterTable(TABLE.TABLE_NAME, function(table){
        table.string(TABLE.NAME).notNullable().after(TABLE.COURSE);
    })
};

exports.down = function (knex) {
    return knex.schema.alterTable(TABLE.TABLE_NAME, function(table){
        table.dropColumn(TABLE.NAME);
    })
};
