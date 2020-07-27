const { ApplicationError } = require('@util/customErrors');
const { API_KEY, SHEET_ID, fetchValues } = require('@util/common');
const Person = require('@models/Person');
const Statistic = require('@models/Statistic');
const Course = require('@models/Course');
const { Op } = require('sequelize');
const { connection } = require('../../util/db');
const logger = require('../../util/logger');

// login endpoint
const postLogin = async (req, res) => {
  try {
    const { key } = req.body;
    if (!key || key === 'CSDEPT') {
      res.sendStatus(403);
    }
    const existingUser = await Person.findOne({
      where: {
        key,
      },
      raw: true,
    });
    logger.log('info', {
      user: existingUser.fullName,
      action: 'SIGN IN',
    });
    // check a google sheet if used key is not in the database
    if (!existingUser) {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/kävijätilasto!A3:B100?key=${API_KEY}`;
      const values = await fetchValues(url);
      const result = values.find((row) => row[1] === key);
      if (!result) {
        logger.log('error', 'User not found.');
        res.sendStatus(403);
      }
      const name = result[0].split(' (')[0];
      const user = await Person.findOne({
        where: {
          fullName: name,
        },
        raw: true,
      });
      // updating an user info if the key is not in the database but it's in the google sheet
      if (user) {
        const updatedUser = await Person.update(
          { key },
          {
            where: {
              fullName: name,
            },
          }
        );
        logger.log('info', {
          user: name,
          action: 'SIGN IN',
        });
        res.send(updatedUser);
      }
      // adding user in the database
      await Person.create({
        fullName: name,
        key,
      });
      const createdUser = await Person.findOne({
        where: {
          fullName: name,
        },
        raw: true,
      });
      logger.log('info', {
        user: name,
        action: 'SIGN IN',
      });
      res.send(createdUser);
    }
    res.send(existingUser);
  } catch (e) {
    logger.log('error', e);
    res.send(e);
  }
};

// get authentication
const getAuthentication = async (req, res) => {
  const { user } = req;
  try {
    logger.log('info', {
      user: user.fullName,
      action: 'SIGN IN',
    });
    res.send(user);
  } catch (e) {
    logger.log('error', e, {
      user: user.fullName,
      action: 'SIGN IN',
    });
    res.send(e);
  }
};

// list of all courses
const getCourses = async (req, res) => {
  try {
    const existingCourses = await Course.findAll({ raw: true });
    if (existingCourses.length === 0) {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/kurssit!A1:B20?key=${API_KEY}`;
      const values = await fetchValues(url);
      const dataBlock = values.map((course, index) => ({
        title: course[0],
        shortTitle: course[1],
      }));
      await Course.bulkCreate(dataBlock);
      const result = await Course.findAll({ raw: true });
      res.send(result);
    } else res.send(existingCourses);
  } catch (e) {
    logger.log('error', e);
    res.send(e);
  }
};

/*
get daily data from database by date and course
*/
const getDailyData = async (req, res) => {
  const { date, course } = req.params;
  const year = parseInt(date.split('-')[0], 10);
  const month = parseInt(date.split('-')[1], 10) - 1;
  const day = parseInt(date.split('-')[2], 10);

  const date1 = new Date(year, month, day);
  const date2 = new Date(year, month, day + 1);

  const getSortedList = (courseId, hours) => {
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
    if (hours.length > 0) {
      const data = [];
      clockTimes.forEach((clockTime) => {
        const findTime = (element, clockTime) => {
          const value = element.time.getTime() === clockTime.getTime();
          return value;
        };
        const value = hours.find((element) => findTime(element, clockTime));
        if (value) {
          data.push(value);
        } else {
          data.push({
            time: clockTime,
            courseId: parseInt(courseId, 10),
            students: 0,
          });
        }
      });
      return data;
    }
    const data = clockTimes.map((clockTime) => ({
      time: clockTime,
      courseId: parseInt(courseId, 10),
      students: 0,
    }));
    return data;
  };

  try {
    if (course) {
      const result = await Statistic.findAll({
        where: {
          time: {
            [Op.between]: [date1, date2],
          },
          courseId: course,
        },
        raw: true,
      });
      const sortedResult = await getSortedList(course, result);
      res.send(sortedResult);
    } else res.send([]);
  } catch (e) {
    logger.log('error', e);
    res.send(e);
  }
};

// add student to the statistics table
const addStudent = async (req, res) => {
  const { time, course } = req.body;
  try {
    logger.log('info', {
      user: req.user.fullName,
      action: 'ADD STUDENT',
      time,
      courseId: course,
    });
    const existingStatistic = await Statistic.findOne({
      where: {
        time,
        courseId: course,
      },
      raw: true,
    });
    if (existingStatistic) {
      await Statistic.update(
        { students: existingStatistic.students + 1 },
        {
          where: {
            time,
            courseId: course,
          },
        }
      );
      res.end();
    } else {
      await Statistic.create({
        time,
        courseId: course,
        students: 1,
      });
      res.end();
    }
  } catch (e) {
    logger.log('error', e, {
      user: req.user.fullName,
      action: 'ADD STUDENT',
      time,
      courseId: course,
    });
    res.send(e);
  }
};

// remove student from the statistics table
const removeStudent = async (req, res) => {
  const { time, course } = req.body;
  try {
    logger.log('info', {
      user: req.user.fullName,
      action: 'REMOVE STUDENT',
      time,
      courseId: course,
    });
    const existingStatistic = await Statistic.findOne({
      where: {
        time,
        courseId: course,
      },
      raw: true,
    });
    if (existingStatistic) {
      if (existingStatistic.students > 0) {
        await Statistic.update(
          { students: existingStatistic.students - 1 },
          {
            where: {
              time,
              courseId: course,
            },
          }
        );
        res.end();
      } else res.end();
    } else res.end();
  } catch (e) {
    logger.log('error', e, {
      user: req.user.fullName,
      action: 'REMOVE STUDENT',
      time,
      courseId: course,
    });
    res.send(e);
  }
};

// get courses by person_id
const getCoursesByPersonId = async (req, res) => {
  const { person } = req.params;
  try {
    const courses = await connection.sequelize.query(
      `SELECT c.title, c.short_title, c.id 
      FROM (courses AS c JOIN personcourses AS pc ON c.id = pc.course_id) 
      WHERE pc.person_id = ${person}`
    );
    res.send(courses[0]);
  } catch (e) {
    res.send(e);
  }
};

module.exports = {
  getCourses,
  getDailyData,
  postLogin,
  getAuthentication,
  getCoursesByPersonId,
  addStudent,
  removeStudent,
};
