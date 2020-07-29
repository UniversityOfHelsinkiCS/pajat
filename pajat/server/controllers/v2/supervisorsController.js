const { ApplicationError } = require('@util/customErrors');
const { API_KEY, SHEET_ID, SHEET_ID2, fetchValues } = require('@util/common');
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
    logger.log('info', 'sign in', {
      user: existingUser.fullName,
      action: 'SIGN IN',
    });
    // check a google sheet if used key is not in the database
    if (!existingUser) {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/kävijätilasto!A3:B100?key=${API_KEY}`;
      const values = await fetchValues(url);
      const result = values.find((row) => row[1] === key);
      if (!result) {
        logger.log('info', 'User not found.');
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
        logger.log('info', 'sign in', {
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
      logger.log('info', 'sign in', {
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
    logger.log('info', 'sign in', {
      user: user.fullName,
      action: 'SIGN IN',
    });
    res.send(user);
  } catch (e) {
    logger.log('error', e);
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
    logger.log('info', 'add student', {
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
    logger.log('info', 'remove student', {
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

// get weekly data from Google sheets and insert it into database
const getStatistics = async (req, res) => {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID2}/values/taulukko1!A3:T502?key=${API_KEY}`;
  const values = await fetchValues(url);
  if (!values) throw new ApplicationError('Try again later', 503);

  const week1 = values.slice(0, 50);
  /*   const week2 = values.slice(50, 100);
  const week3 = values.slice(100, 150);
  const week4 = values.slice(150, 200);
  const week5 = values.slice(200, 250);
  const week6 = values.slice(250, 300);
  const week7 = values.slice(300, 350);
  const week8 = values.slice(350, 400);
  const week9 = values.slice(400, 450);
  const week10 = values.slice(450); */

  // parse date and hour from sheets to Javascript date object
  const parseDate = (date, hours) => {
    const dateArray = date.split('.');
    const year = dateArray[2];
    const month = dateArray[1];
    const day = dateArray[0];
    const hour = hours.split('-')[1];
    let parsedDate = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hour)
    );
    return parsedDate;
  };

  // combine data from one row of the google sheet
  const buildDataBlock = (time, row) => {
    const hours = row.slice(3, 18);
    // list of course IDs in same order than courses are in the google sheet
    const courses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    const dataBlock = hours.map((data, index) => ({
      time,
      courseId: courses[index],
      students: data === '' ? 0 : parseInt(data, 10),
    }));
    const filteredData = dataBlock.filter((element) => element.students > 0);
    return filteredData;
  };

  // combine daily data from google sheet
  const buildDailyDataBlock = (day) => {
    const date = day[0][1];
    const dailyDataBlock = day.map((hour, index) => {
      const time = parseDate(date, hour[2]);
      const hourData = buildDataBlock(time, hour);
      return hourData;
    });
    return [
      ...dailyDataBlock[0],
      ...dailyDataBlock[1],
      ...dailyDataBlock[2],
      ...dailyDataBlock[3],
      ...dailyDataBlock[4],
      ...dailyDataBlock[5],
      ...dailyDataBlock[6],
      ...dailyDataBlock[7],
      ...dailyDataBlock[8],
      ...dailyDataBlock[9],
    ];
  };

  // combine weekly data from sheet and insert it into database
  const addWeekToDatabase = async (week) => {
    const day1 = week.slice(0, 10);
    const day2 = week.slice(10, 20);
    const day3 = week.slice(20, 30);
    const day4 = week.slice(30, 40);
    const day5 = week.slice(40);

    const dataBlock = [
      ...buildDailyDataBlock(day1),
      ...buildDailyDataBlock(day2),
      ...buildDailyDataBlock(day3),
      ...buildDailyDataBlock(day4),
      ...buildDailyDataBlock(day5),
    ];
    await Statistic.bulkCreate(dataBlock);
  };

  try {
    const firstDay = parseDate(week1[0][1], week1[0][2]);
    const existingWeek = await Statistic.findOne({
      where: {
        time: firstDay,
      },
    });
    if (!existingWeek || existingWeek.length === 0) {
      addWeekToDatabase(week1);
      res.send('Data is saved in the database.');
    } else {
      res.send('Data is already in the database.');
    }
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
  getStatistics,
};
