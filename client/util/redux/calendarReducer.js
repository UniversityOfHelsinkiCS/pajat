import callBuilder from '../apiConnection'
/**
 * Actions and reducers are in the same file for readability
 */

export const getCalendarsAction = () => {
  const route = '/calendar'
  const prefix = 'GET_CALENDARS'
  return callBuilder(route, prefix)
}

// Reducer
// You can include more app wide actions such as "selected: []" into the state
export default (state = [], action) => {
  switch (action.type) {
    case 'GET_CALENDARS_SUCCESS':
      return action.response
    default:
      return state
  }
}
