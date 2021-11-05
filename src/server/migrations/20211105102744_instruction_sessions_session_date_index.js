exports.up = function (knex) {
  return knex.schema.table('instruction_sessions', (table) => {
    table.index(['session_date'], 'idx_session_date');
  });
};

exports.down = function (knex) {
  return knex.schema.table('instruction_sessions', (table) => {
    table.dropIndex(['session_date'], 'idx_session_date');
  });
};
