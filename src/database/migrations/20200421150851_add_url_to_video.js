const TABLE = {
  TABLE_NAME: "video",
  AFTER_COLUMN: "id",
  URL: "url",
};

exports.up = function (knex) {
  return knex.schema.alterTable(TABLE.TABLE_NAME, function (table) {
    table.string(TABLE.URL).defaultTo("").after(TABLE.AFTER_COLUMN);
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable(TABLE.TABLE_NAME, function (table) {
    table.dropColumn(TABLE.URL);
  });
};
