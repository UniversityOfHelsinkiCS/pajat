exports.up = function (knex) {
  return knex.schema.createTable('instruction_sessions', (table) => {
    table.bigIncrements('id').primary();
    table.bigInteger('user_id').notNullable();
    table.date('session_date').notNullable();
    table.time('start_time').notNullable();
    table.time('end_time').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.foreign('user_id').references('users.id');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('instruction_sessions');
};
