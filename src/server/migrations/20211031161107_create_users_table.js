exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.bigIncrements('id').primary();
    table.text('username').notNullable().unique();
    table.text('email');
    table.text('first_name');
    table.text('last_name');
    table.boolean('instructor').notNullable().defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
