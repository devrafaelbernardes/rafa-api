const TABLE = {
    TABLE_NAME : 'token_access',
    ID : 'id',
    TOKEN : 'token',
    IS_ACTIVE : 'is_active',
    CREATED_AT : 'created_at',
}

exports.up = function (knex) {
    return knex.schema.createTable(TABLE.TABLE_NAME, function (table) {
        table.increments(TABLE.ID).notNullable().primary();
        table.string(TABLE.TOKEN).notNullable().unique();

        // WITH DEFAULTS
        table.boolean(TABLE.IS_ACTIVE).notNullable().defaultTo(true);
        table.timestamp(TABLE.CREATED_AT).notNullable().defaultTo(knex.fn.now());
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable(TABLE.TABLE_NAME);
};
