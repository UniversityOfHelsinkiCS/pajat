const { ApplicationError } = require('@util/customErrors');
const { API_KEY, SHEET_ID, fetchValues } = require('@util/common');

// list of all courses
const getCourses = async (req, res) => {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/kurssit!A1:B20?key=${API_KEY}`;
  const values = await fetchValues(url);
  if (!values) throw new ApplicationError('Try again later', 503);
  res.send(values);
};

module.exports = {
  getCourses,
};
