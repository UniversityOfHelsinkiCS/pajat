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

  const currentWeek = calendars[0]
  const nextWeek = calendars[1]
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <WeekTable title="Current week" week={currentWeek} />
      <WeekTable title="Next week" week={nextWeek} />
    </div>
  )
}
