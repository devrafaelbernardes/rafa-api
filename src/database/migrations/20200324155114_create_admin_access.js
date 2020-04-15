const TABLE = {
    TABLE_NAME : 'admin_access',
    ID : 'id',
    TOKEN : 'token_id',
    ADMIN : 'admin_id',
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
        table.integer(TABLE.ADMIN).notNullable().unsigned();
        table.integer(TABLE.TOKEN).notNullable().unsigned().unique();

        // FOREIGN KEYS
        table.foreign(TABLE.ADMIN).references('id').inTable('admin');
        table.foreign(TABLE.TOKEN).references('id').inTable('token_access');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable(TABLE.TABLE_NAME);
};