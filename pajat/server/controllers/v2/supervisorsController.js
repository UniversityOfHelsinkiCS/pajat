const { ApplicationError } = require('@util/customErrors');
const { API_KEY, SHEET_ID, fetchValues } = require('@util/common');
const Person = require('@models/Person');
const Statistic = require('@models/Statistic');
const Course = require('@models/Course');
const { Op } = require('sequelize');

// list of all courses
const getCourses = async (req, res) => {
  try {
    const existingCourses = await Course.findAll({ raw: true });
    if (existingCourses.length === 0) {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/kurssit!A1:B20?key=${API_KEY}`;
      const values = await fetchValues(url);
      const dataBlock = values.map((course, index) => ({
        name: course[0],
        shortName: course[1],
      }));
      const courseDataBlock = await Course.bulkCreate(dataBlock);
      const result = await Course.findAll({ raw: true });
      res.send(result);
    } else res.send(existingCourses);
  } catch (e) {
    res.send(e);
  }
};

/*
get daily data from database by date and course
*/
const getDailyData = async (req, res) => {
  const { date, course } = req.params;
  const year = date.split('-')[0];
  const month = date.split('-')[1] - 1;
  const day = date.split('-')[2];

  const date1 = new Date(year, month, day);
  const date2 = new Date(year, month, parseInt(day) + 1);

  const getSortedList = (courseId, dataList) => {
    const clockTimes = [
      new Date(year, month, day, 10),
      new Date(year, month, day, 11),
      new Date(year, month, day, 12),
      new Date(year, month, day, 13),
      new Date(year, month, day, 14),
      new Date(year, month, day, 15),
      new Date(year, month, day, 16),
      new Date(year, month, day, 17),
      new Date(year, month, day, 18),
      new Date(year, month, day, 19),
    ];
    if (dataList.length > 0) {
      const data = [];
      clockTimes.forEach((clockTime) => {
        console.log(clockTime);
        const value = dataList.find((element) => element.time === clockTime);
        if (value) {
          data.push(value);
        } else
          data.push({
            time: clockTime,
            courseId: parseInt(courseId),
            students: 0,
          });
      });
      return data;
    }
    const data = clockTimes.map((clockTime) => ({
      time: clockTime,
      courseId: parseInt(courseId),
      students: 0,
    }));
    return data;
  };

  try {
    const result = await Statistic.findAll({
      where: {
        time: {
          [Op.between]: [date1, date2],
        },
        courseId: course,
      },
      raw: true,
    });
    const json = JSON.stringify(result);
    const jsonObj = JSON.parse(json);
    const sortedResult = await getSortedList(course, jsonObj);
    res.send(sortedResult);
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
  getDailyData,
};
