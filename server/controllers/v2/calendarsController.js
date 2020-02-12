const { API_KEY, SHEET_ID, fetchValues } = require('@util/common')

const getHeader = async (course) => {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/ohjaus-${course}!B1:B2?key=${API_KEY}`
  const values = await fetchValues(url)
  const longName = values[0][0]
  const shortName = values[1][0]
  return `<h2>${longName} (${shortName})</h2>`
}


// Table is from B to G, starts at row 3 and is 11 rows high.
const getWeeks = async (
  course,
  currentWeekStartsAt,
  nextWeekStartsAt,
  location = 3,
  currentWeek,
  nextWeek,
) => {
  // TODO: Cache
  if (currentWeek && nextWeek) return [currentWeek, nextWeek]

  const rows = `B${location}:G${location + 11}`
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/ohjaus-${course}!${rows}?key=${API_KEY}`

  const values = await fetchValues(url)
  const currentWeekRows = (values.find(row => row.find(v => v === currentWeekStartsAt))
    ? values
    : undefined) || currentWeek
  const nextWeekRows = (values.find(row => row.find(v => v === nextWeekStartsAt))
    ? values
    : undefined) || nextWeek

  // Sanity check
  if (!values[1][1]) throw new Error('Jotain viturallaan') && []

  return getWeeks(
    course,
    currentWeekStartsAt,
    nextWeekStartsAt,
    location + 12,
    currentWeekRows,
    nextWeekRows,
  )
}

const getCurrentAndNext = async (course = 'kaikki') => {
  const currentWeekUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Kurssit!F1?key=${API_KEY}`
  const nextWeekUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Kurssit!F2?key=${API_KEY}`
  const currentWeekValues = await fetchValues(currentWeekUrl)
  const nextWeekValues = await fetchValues(nextWeekUrl)
  const currentWeekStartsAt = currentWeekValues[0][0]
  const nextWeekStartsAt = nextWeekValues[0][0]

  const [currentWeekRows, nextWeekRows] = await getWeeks(
    course,
    currentWeekStartsAt,
    nextWeekStartsAt,
  )

  return [currentWeekRows, nextWeekRows]
}

const weekToSingleCourseTable = (
  week,
  pajaTimeColor = 'white',
  pajaTimeText = '✖',
) => `
  <table>
  <thead>
    <tr>
      ${week[0]
    .map(
      (day, idx) => `<td><div class="cell-content-container">${
        idx !== 0 ? `${week[1][idx]} ${day}` : ''
      }</div></td>`,
    )
    .join('')}
    </tr>
  </thead>
  <tbody>
    ${week
    .map((row, idx) => {
      if (idx < 2) return ''
      while (row.length < 6) row.push('')

      return `<tr>
        ${row
    .map(val => (val === 'OHJAUSTA'
      ? `<td class="day-cell" style="background-color: ${pajaTimeColor};"><div class="cell-content-container">${pajaTimeText}</div></td>`
      : `<td><div class="cell-content-container">${val}</div></td>`))
    .join('')}
      </tr>`
    })
    .join('')}
  </tbody>
  </table>
`

const getSingleCourseTable = async (
  course,
  week,
  includeName = true,
  pajaTimeColor,
  pajaTimeText,
) => {
  const [current, next] = await getCurrentAndNext(course)
  const chosenWeek = week === 'next' ? next : current

  return `
    ${includeName ? await getHeader(course) : ''}
    ${weekToSingleCourseTable(chosenWeek, pajaTimeColor, pajaTimeText)}
  `
}

const iframe = async (req, res) => {
  const { course, week } = req.params
  const {
    name,
    color: pajaTimeColor,
    text: pajaTimeText,
  } = req.query
  const table = await getSingleCourseTable(
    course,
    week,
    name !== 'false',
    pajaTimeColor,
    pajaTimeText,
  )

  const html = `
  <html>
  <style>
  html { font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji; }
  body {
    margin: 0;
  }
  tr td:nth-child(1) { width: 5em; }
  thead td { font-weight: bold }
  td {
    padding: 0 15px;
    height: 3rem;
    background-color: white;
    display: table-cell;
    text-align: center;
    vertical-align: middle;
  }

  tr:not(:last-child) td, thead td {
    border-bottom: 1px solid #dee2e6;
  }

  .cell-content-container {
    position: relative;
    bottom: -2px;
  }

  tr td:nth-of-type(2n) {
    filter: brightness(97%);
  }
  table {
    table-layout: fixed;
    width: 100%;
    font-size: calc(1em + 0.3vw);
    border-spacing: 0;
  }
  .day-cell {
    font-size: 2rem;
  }
  </style>
  <body>
  ${table.replace(/.2020/g, '.')}
  </body>
  </html
  `

  res.send(html)
}


module.exports = {
  iframe,
}
