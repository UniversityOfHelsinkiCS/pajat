import React from 'react'

const WeekTable = ({ title, week }) => {
  console.log(week)
  if (!week) return null
  return (
    <div>
      <h2>{title}</h2>
      <table>
        <thead>
          <tr>
            {week[0].map((day, idx) => (<td key={day}>{(idx !== 0) ? `${week[1][idx]} ${day}` : 'Time'}</td>))}
          </tr>
        </thead>
        <tbody>
          {week.map((row, idx) => {
            if (idx < 2) return null
            return (
              <tr key={row[0]}>
                {row.map(val => <td>{val}</td>)}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default WeekTable
