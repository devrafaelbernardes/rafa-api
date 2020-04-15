const TABLE = {
    TABLE_NAME : 'bag_image',
    ID : 'id',
    BAG : 'bag_id',
    IMAGE : 'image_id',
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
        table.integer(TABLE.BAG).notNullable().unsigned();
        table.integer(TABLE.IMAGE).notNullable().unsigned();

        // FOREIGN KEYS
        table.foreign(TABLE.BAG).references('id').inTable('bag');
        table.foreign(TABLE.IMAGE).references('id').inTable('image');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable(TABLE.TABLE_NAME);
};
