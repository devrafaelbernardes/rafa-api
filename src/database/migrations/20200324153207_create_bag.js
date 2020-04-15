const TABLE = {
    TABLE_NAME : 'bag',
    ID : 'id',
    NAME : 'name',
    DISCOUNT_PRICE : 'discount_price',
    TOTAL_PRICE : 'total_price',
    INSTALLMENTS_PRICE : 'installments_price',
    INSTALLMENTS : 'installments',
    POSITION : 'position',
    DEPOSIT : 'deposit',
    LINK : 'link',
    FIRST_IMAGE : 'first_image',
    SECOND_IMAGE : 'second_image',
    IS_ACTIVE : 'is_active',
    CREATED_AT : 'created_at',
}

exports.up = function (knex) {
    return knex.schema.createTable(TABLE.TABLE_NAME, function (table) {
        table.increments(TABLE.ID).notNullable().primary();
        table.string(TABLE.NAME).notNullable();
        table.decimal(TABLE.DISCOUNT_PRICE);
        table.decimal(TABLE.TOTAL_PRICE).notNullable();
        table.decimal(TABLE.INSTALLMENTS_PRICE).notNullable();
        table.integer(TABLE.INSTALLMENTS).notNullable();
        table.integer(TABLE.POSITION).notNullable();
        table.decimal(TABLE.DEPOSIT);
        table.string(TABLE.LINK).notNullable();

        // WITH DEFAULTS
        table.boolean(TABLE.IS_ACTIVE).notNullable().defaultTo(true);
        table.timestamp(TABLE.CREATED_AT).notNullable().defaultTo(knex.fn.now());

        // FOREIGN COLUMNS
        table.integer(TABLE.FIRST_IMAGE).unsigned();
        table.integer(TABLE.SECOND_IMAGE).unsigned();

        // FOREIGN KEYS
        table.foreign(TABLE.FIRST_IMAGE).references('id').inTable('image');
        table.foreign(TABLE.SECOND_IMAGE).references('id').inTable('image');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable(TABLE.TABLE_NAME);
};
