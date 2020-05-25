import React from 'react'

const WeekTable = ({ title, week }) => {
  if (!week) return null
  const help = week === 'next' ? '?help=false' : ''
  return (
    <div>
      <h2>{title}</h2>
      <iframe
        frameBorder="0"
        src={`https://study.cs.helsinki.fi/pajat/api/kaikki/${week}${help}`}
        style={{ width: '100%', height: '50em' }}
      />
    </div>
  )
}

export default WeekTable
