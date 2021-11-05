exports.up = function (knex) {
  return knex.schema.table('instruction_sessions', (table) => {
    table.text('description');
  });
};

exports.down = function (knex) {
  return knex.schema.table('instruction_sessions', (table) => {
    table.dropColumn('description');
  });
};
