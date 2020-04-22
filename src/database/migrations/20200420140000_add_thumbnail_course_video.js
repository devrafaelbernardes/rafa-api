const TABLE = {
    TABLE_NAME : 'course_video',
    THUMBNAIL : 'thumbnail_id',
    COURSE : 'course_id',
}

exports.up = function (knex) {
    return knex.schema.alterTable(TABLE.TABLE_NAME, function(table){
        // FOREIGN COLUMNS
        table.integer(TABLE.THUMBNAIL).unsigned().after(TABLE.COURSE);

        // FOREIGN KEYS
        table.foreign(TABLE.THUMBNAIL).references('id').inTable('image');
    })
};

exports.down = function (knex) {
    return knex.schema.alterTable(TABLE.TABLE_NAME, function(table){
        // FOREIGN KEYS
        table.dropForeign(TABLE.THUMBNAIL);
        // FOREIGN COLUMNS
        table.dropColumn(TABLE.THUMBNAIL);
    })
};
