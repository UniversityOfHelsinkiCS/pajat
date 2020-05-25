import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCalendarsAction } from 'Utilities/redux/calendarReducer'
import WeekTable from 'Components/WeekTable'

export default () => {
  const dispatch = useDispatch()
  const { calendars } = useSelector(({ calendars }) => ({ calendars }))
  useEffect(() => {
    dispatch(getCalendarsAction())
  }, [])

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '3em' }}>
      <WeekTable title="Current week" week="current" />
      <div style={{ paddingTop: '5em' }} />
      <WeekTable title="Next week" week="next" />
      <div>
        <a href="https://github.com/UniversityOfHelsinkiCS/pajat">Source code (Github)</a>
        &nbsp; - &nbsp;
        <a href="https://study.cs.helsinki.fi/pajat/api/calendar">API for DIY</a>
        &nbsp; - &nbsp;
        <a href="https://study.cs.helsinki.fi/pajat/api/ohpe/current">Example of course specific tables for iframes</a>
      </div>
    </div>
  )
}
