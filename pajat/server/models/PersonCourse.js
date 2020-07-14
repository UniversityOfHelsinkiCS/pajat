const { Model, INTEGER } = require('sequelize');
const { connection } = require('../util/db');
const Person = require('./Person');
const Course = require('./Course');

class PersonCourse extends Model {}

PersonCourse.init(
  {
    personId: {
      type: INTEGER,
    },
    courseId: {
      type: INTEGER,
    },
  },
  {
    underscored: true,
    sequelize: connection.sequelize,
    modelName: 'personcourse',
    tableName: 'personcourses',
  }
);

Person.belongsToMany(Course, {
  through: PersonCourse,
  foreignKey: 'person_id',
});
Course.belongsToMany(Person, {
  through: PersonCourse,
  foreignKey: 'course_id',
});

module.exports = PersonCourse;
