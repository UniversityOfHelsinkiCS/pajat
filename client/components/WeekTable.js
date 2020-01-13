import React from 'react'

const WeekTable = ({ title, week }) => {
  if (!week) return null
  return (
    <div>
      <h2>{title}</h2>
      <iframe src={`http://localhost:8000/api/kaikki/${week}`} style={{ width: '100%', height: '50em' }} />
    </div>
  )
}

export default WeekTable
