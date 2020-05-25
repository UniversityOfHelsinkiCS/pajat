const { ApplicationError } = require('@util/customErrors')
const { API_KEY, SHEET_ID, fetchValues } = require('@util/common')

const translations = {
  en: {
    ma: 'Mon',
    ti: 'Tue',
    ke: 'Wed',
    to: 'Thu',
    pe: 'Fri',
  },
  fi: {
    ma: 'Ma',
    ti: 'Ti',
    ke: 'Ke',
    to: 'To',
    pe: 'Pe',
  },
}

const getHeader = async (course) => {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/ohjaus-${course}!B1:B2?key=${API_KEY}`
  const values = await fetchValues(url)
  const longName = values[0][0]
  const shortName = values[1][0]
  return `<h2>${longName} (${shortName})</h2>`
}

const getWeekForCourse = async (course, week) => {
  // <3
  const currentWeekRows = 'B3:G14'
  const nextWeekRows = 'B15:G26'
  const rows = week === 'next' ? nextWeekRows : currentWeekRows
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/ohjaus-${course}!${rows}?key=${API_KEY}`
  const values = await fetchValues(url)
  if (!values) throw new ApplicationError('Try again later', 503, { rows, course, weekStartDate, url })

  return values
}

const weekToSingleCourseTable = (
  week,
  pajaTimeColor = 'white',
  pajaTimeText = '✖',
  lang,
) => {
  const getDayTranslation = (day) => {
    const key = day.toLowerCase().trim()
    const chosenLang = lang || 'en'
    return (translations && translations[chosenLang] && translations[chosenLang][key]) || day
  }

  const weekDays = week[0].map(
    (day, idx) => `<td><div class="cell-content-container">
    ${idx !== 0 ? `${getDayTranslation(week[1][idx])} ${day}` : ''}
    </div></td>`,
  ).join('')

  return `
  <table>
  <thead>
    <tr>
    ${weekDays}
    </tr>
  </thead>
  <tbody>
    ${week.map((row, idx) => {
    if (idx < 2) return ''
    while (row.length < 6) row.push('')

    return (
      `<tr>
        ${row
        .map(val => (val === 'OHJAUSTA'
          ? `<td class="day-cell" style="background-color: ${pajaTimeColor};"><div class="cell-content-container">${pajaTimeText}</div></td>`
          : `<td><div class="cell-content-container">${val}</div></td>`))
        .join('')}
      </tr>`
    )
  }).join('')}
  </tbody>
  </table>
`
}

const getSingleCourseTable = async (
  course,
  week,
  includeName = true,
  pajaTimeColor,
  pajaTimeText,
  lang,
) => {
  const chosenWeek = await getWeekForCourse(course, week)

  if (!chosenWeek) return 'No course or week here'

  return `
    ${includeName ? await getHeader(course) : ''}
    ${weekToSingleCourseTable(chosenWeek, pajaTimeColor, pajaTimeText, lang)}
  `
}

const iframe = async (req, res) => {
  const { course, week } = req.params
  const {
    name,
    color: pajaTimeColor,
    text: pajaTimeText,
    lang,
  } = req.query
  const table = await getSingleCourseTable(
    course,
    week,
    name !== 'false',
    pajaTimeColor,
    pajaTimeText,
    lang,
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
