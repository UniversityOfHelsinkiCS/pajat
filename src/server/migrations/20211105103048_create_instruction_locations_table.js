exports.up = function (knex) {
  return knex.schema.createTable('instruction_locations', (table) => {
    table.bigIncrements('id').primary();
    table.text('name').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('instruction_locations');
};
