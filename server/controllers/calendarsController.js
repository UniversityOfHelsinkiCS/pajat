const { ApplicationError } = require('@util/customErrors')
const NodeCache = require('node-cache')
const { API_KEY, SHEET_ID } = require('@util/common')
const axios = require('axios')

const cache = new NodeCache({ stdTTL: 60 * 3 }) // 3 min

const fetchValues = async (sheetsUrl) => {
  const cacheHit = cache.get(sheetsUrl)
  if (cacheHit) return cacheHit

  const response = await axios.get(encodeURI(sheetsUrl))
  const { values } = response.data
  cache.set(sheetsUrl, values)
  return values
}


// Table is from B to G, starts at row 3 and is 11 rows high.
const getWeeks = async (course, currentWeekStartsAt, nextWeekStartsAt, location = 3, currentWeek, nextWeek) => {
  // TODO: Cache
  if (currentWeek && nextWeek) return [currentWeek, nextWeek]

  const rows = `B${location}:G${location + 11}`
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/ohjaus-${course}!${rows}?key=${API_KEY}`

  const values = await fetchValues(url)
  const currentWeekRows = (values.find(d => d.find(v => v.includes(currentWeekStartsAt))) ? values : undefined) || currentWeek
  const nextWeekRows = (values.find(d => d.find(v => v.includes(nextWeekStartsAt))) ? values : undefined) || nextWeek

  // Sanity check
  if (!values[1][1]) return console.error('Jotain viturallaan') && []

  return getWeeks(course, currentWeekStartsAt, nextWeekStartsAt, location + 12, currentWeekRows, nextWeekRows)
}

const mankeloi = (values) => {
  const days = values[1].map((v, idx) => {
    const value = v.trim()
    if (!['Ma', 'Ti', 'Ke', 'To', 'Pe'].includes(value)) return undefined

    const parseTimeRow = row => ({ [row[0]]: (row[idx] || '').split(', ') })

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
  const currentWeekUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Kurssit!F1?key=${API_KEY}`
  const nextWeekUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Kurssit!F2?key=${API_KEY}`
  const currentWeekValues = await fetchValues(currentWeekUrl)
  const nextWeekValues = await fetchValues(nextWeekUrl)
  const currentWeekStartsAt = currentWeekValues[0][0]
  const nextWeekStartsAt = nextWeekValues[0][0]

  const [currentWeekRows, nextWeekRows] = await getWeeks(course, currentWeekStartsAt, nextWeekStartsAt)

  return [currentWeekRows, nextWeekRows]
}

const getAll = async (req, res) => {
  const [current, next] = await getCurrentAndNext()
  const mankeledCurrent = mankeloi(current)
  const mankeledNext = mankeloi(next)
  res.send([mankeledCurrent, mankeledNext])
}

const getHeader = async (course) => {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/ohjaus-${course}!B1:B2?key=${API_KEY}`
  const values = await fetchValues(url)
  const longName = values[0][0]
  const shortName = values[1][0]
  return `<h2>${longName} (${shortName})</h2>`
}

const getHelp = async () => {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Kurssit!A1:B48?key=${API_KEY}`
  const courseNames = await fetchValues(url)
  const hashMap = courseNames.reduce((acc, keyValPair) => {
    const [fullName, short] = keyValPair
    acc[fullName] = short
    return acc
  }, {})

  return hashMap
}

const weekToTable = week => (
  `
  <table>
  <thead>
    <tr>
      ${week[0].map((day, idx) => (`<td>${(idx !== 0) ? `${week[1][idx]} ${day}` : 'Time'}</td>`)).join('')}
    </tr>
  </thead>
  <tbody>
    ${week.map((row, idx) => {
    if (idx < 2) return ''
    while (row.length < 6) row.push('')

    return (
      `<tr>
        ${row.map(val => (val === 'OHJAUSTA' ? `<td style="background-color: lightgray;">${''}</td>` : `<td>${val}</td>`)).join('')}
      </tr>`
    )
  }).join('')}
  </tbody>
  </table>
`
)

const getSingleCourseTable = async (course, week, includeName = true) => {
  const [current, next] = await getCurrentAndNext(course)
  const chosenWeek = week === 'next' ? next : current

  return `
    ${includeName ? await getHeader(course) : ''}
    ${weekToTable(chosenWeek)}
  `
}

const getKaikkiTable = async (week, includeHelp = true) => {
  const helpMap = await getHelp()
  const course = 'kaikki'
  const [current, next] = await getCurrentAndNext(course, week)
  const chosenWeek = week === 'next' ? next : current

  const weekWithConvertedNames = chosenWeek.map(row => row.map((field) => {
    const longNames = field.split(', ')
    const converted = longNames.map(name => helpMap[name] || name)
    return converted.join(', ')
  }))
  const helpList = `
  <div>
    <ul>
      ${Object.keys(helpMap).map(key => `<li>${helpMap[key]} = ${key}</li>`).join('')}
    <ul>
  </div>
  `

  return `
  <style>
  tbody tr:nth-of-type(2n-1) td {
    background: whitesmoke;
  }
  table {
    border-collapse: collapse;
  }
  </style>
  ${weekToTable(weekWithConvertedNames)}
  ${includeHelp ? helpList : ''}
  `
}

const iframe = async (req, res) => {
  const { course, week } = req.params
  const { name, help } = req.query
  const table = course === 'kaikki'
    ? await getKaikkiTable(week, help !== 'false')
    : await getSingleCourseTable(course, week, name !== 'false')

  const html = `
  <html>
  <style>
  html { font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji; }
  thead td { font-weight: bold }
  td { padding: 3px; }
  table {
    table-layout: fixed;
    width: 100%;
  }
  </style>
  <body>
  ${table}
  </body>
  </html
  `

  res.send(html)
}

module.exports = {
  getAll,
  iframe,
}
