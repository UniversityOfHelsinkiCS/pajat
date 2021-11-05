exports.up = function (knex) {
  return knex
    .table('instruction_locations')
    .insert([{ name: 'B222' }, { name: 'Remote' }]);
};

exports.down = function () {};
