const TABLE = {
    TABLE_NAME : 'media',
    AFTER_COLUMN : 'id',
    TITLE : 'title',
    IS_LANDING_PAGE : 'is_landing_page',
}

exports.up = function (knex) {
    return knex.schema.alterTable(TABLE.TABLE_NAME, function(table){
        table.string(TABLE.TITLE).defaultTo(null).after(TABLE.AFTER_COLUMN);
        table.boolean(TABLE.IS_LANDING_PAGE).defaultTo(false).after(TABLE.TITLE);
    })
};

exports.down = function (knex) {
    return knex.schema.alterTable(TABLE.TABLE_NAME, function(table){
        table.dropColumn(TABLE.IS_LANDING_PAGE);
        table.dropColumn(TABLE.TITLE);
    })
};
