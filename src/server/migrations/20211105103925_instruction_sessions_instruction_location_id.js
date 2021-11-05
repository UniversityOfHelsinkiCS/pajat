exports.up = async function (knex) {
  const [location] = await knex
    .table('instruction_locations')
    .insert({
      name: 'BK107',
    })
    .returning('*');

  await knex.schema.table('instruction_sessions', (table) => {
    table.bigInteger('instruction_location_id');

    table
      .foreign('instruction_location_id')
      .references('instruction_locations.id');
  });

  await knex
    .table('instruction_sessions')
    .update({ instruction_location_id: location.id });

  await knex.schema.table('instruction_sessions', (table) => {
    table.bigInteger('instruction_location_id').notNullable().alter();
  });
};

exports.down = function () {};
