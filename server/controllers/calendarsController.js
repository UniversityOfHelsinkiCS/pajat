const { ApplicationError } = require('@util/customErrors')
const { API_KEY, SHEET_ID } = require('@util/common')
const axios = require('axios')

// Table is from B to G, starts at row 3 and is 11 rows high.
const getWeeks = async (course, currentWeekStartsAt, nextWeekStartsAt, location = 3, currentWeek, nextWeek) => {
  // TODO: Cache
  if (currentWeek && nextWeek) return [currentWeek, nextWeek]

  const rows = `B${location}:G${location + 11}`
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/ohjaus-${course}!${rows}?key=${API_KEY}`
  const response = await axios.get(url)

  const { values } = response.data
  const currentWeekRows = (values.find(d => d.find(v => v.includes(currentWeekStartsAt))) ? values : undefined) || currentWeek
  const nextWeekRows = (values.find(d => d.find(v => v.includes(nextWeekStartsAt))) ? values : undefined) || nextWeek

  // Sanity check
  if (!values[1][1]) return console.log('Jotain viturallaan') && []

  return getWeeks(course, currentWeekStartsAt, nextWeekStartsAt, location + 12, currentWeekRows, nextWeekRows)
}

const mankeloi = (values) => {
  const days = values[1].map((v, idx) => {
    const value = v.trim()
    if (!['Ma', 'Ti', 'Ke', 'To', 'Pe'].includes(value)) return undefined

    const parseTimeRow = row => ({ [row[1]]: (row[idx] || '').split(', ') })

    const timeValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
      .reduce((acc, rowIdx) => ({ ...acc, ...parseTimeRow(values[rowIdx]) }), {})

    return {
      day: value,
      date: values[0][idx],
      times: timeValues,
    }
  }).filter(val => val)

  return days
}

const getCurrentAndNext = async (course = 'kaikki') => {
  const currentWeekResponse = await axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Kurssit!F1?key=${API_KEY}`)
  const nextWeekResponse = await axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Kurssit!F2?key=${API_KEY}`)
  const currentWeekStartsAt = currentWeekResponse.data.values[0][0]
  const nextWeekStartsAt = nextWeekResponse.data.values[0][0]

  const [currentWeekRows, nextWeekRows] = await getWeeks(course, currentWeekStartsAt, nextWeekStartsAt)

  return [currentWeekRows, nextWeekRows]
}

const getAll = async (req, res) => {
  const [current, next] = await getCurrentAndNext()
  /*
    const mankeledCurrent = mankeloi(currentWeekRows)
    const mankeledNext = mankeloi(nextWeekRows)
    res.send([mankeledCurrent, mankeledNext])
  */
  res.send([current, next])
}

const iframe = async (req, res) => {
  const { course, week } = req.params
  const [current, next] = await getCurrentAndNext(course)
  const chosenWeek = week === 'next' ? next : current
  const weekToTable = week => (
    `<html>
    <body>
    <table>
    <thead>
      <tr>
        ${week[0].map((day, idx) => (`<td>${(idx !== 0) ? `${week[1][idx]} ${day}` : 'Time'}</td>`)).join('')}
      </tr>
    </thead>
    <tbody>
      ${week.map((row, idx) => {
      if (idx < 2) return ''
      return (
        `<tr>
          ${row.map(val => (val === 'OHJAUSTA' ? `<td style="background-color: lightgray;">${''}</td>` : `<td>${val}</td>`)).join('')}
        </tr>`
      )
    }).join('')}
    </tbody>
  </table>
  </body>
  </html>
  `
  )
  res.send(weekToTable(chosenWeek))
}

module.exports = {
  getAll,
  iframe,
}
