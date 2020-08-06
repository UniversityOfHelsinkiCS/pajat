import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import loginReducer from './reducers/loginReducer';
import courseFilterReducer from './reducers/courseFilterReducer';
import studentPanelReducer from './reducers/studentPanelReducer';
import courseReducer from './reducers/courseReducer';
import statisticsReducer from './reducers/statisticsReducer';
import datePickerReducer from './reducers/datePickerReducer';

const reducer = combineReducers({
  login: loginReducer,
  filter: courseFilterReducer,
  calendar: statisticsReducer,
  panel: studentPanelReducer,
  courses: courseReducer,
  datePicker: datePickerReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
