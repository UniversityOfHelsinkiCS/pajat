exports.up = function (knex) {
  return knex.schema.createTable('user_course_competences', (table) => {
    table.bigInteger('user_id').notNullable();
    table.bigInteger('course_id').notNullable();
    table.primary(['user_id', 'course_id']);
    table.foreign('user_id').references('users.id');
    table.foreign('course_id').references('courses.id');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('user_course_competences');
};
