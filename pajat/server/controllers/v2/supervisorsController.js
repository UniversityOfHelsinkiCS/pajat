const { ApplicationError } = require('@util/customErrors');
const { API_KEY, SHEET_ID, fetchValues } = require('@util/common');
const Person = require('@models/Person');
const Statistic = require('@models/Statistic');
const Course = require('@models/Course');
const { Op } = require('sequelize');

// list of all courses
const getCourses = async (req, res) => {
  try {
    const existingCourses = await Course.findAll();
    if (existingCourses.length === 0) {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/kurssit!A1:B20?key=${API_KEY}`;
      const values = await fetchValues(url);
      const dataBlock = values.map((course, index) => ({
        name: course[0],
        shortName: course[1],
      }));
      const courseDataBlock = await Course.bulkCreate(dataBlock);
      const result = await Course.findAll();
      res.send(result);
    } else res.send(existingCourses);
  } catch (e) {
    res.send(e);
  }
};

const getMockPerson = async (req, res) => {
  const existingPerson = await Person.findOne({
    where: {
      firstNames: 'Jami',
    },
  });

  if (!existingPerson) {
    const createdPerson = await Person.create({
      firstNames: 'Jami',
      lastName: 'Kousa',
      loginCode: 'SECRET',
    });

    return res.send(createdPerson);
  }

  existingPerson.loginCode = 'UPDATED';

  existingPerson.save();

  return res.send(existingPerson);
};

module.exports = {
  getCourses,
  getMockPerson,
};
