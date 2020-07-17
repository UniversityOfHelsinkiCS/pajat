import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import loginReducer from './reducers/loginReducer';
import courseFilterReducer from './reducers/courseFilterReducer';
import studentPanelReducer from './reducers/studentPanelReducer';
import courseReducer from './reducers/courseReducer';

const reducer = combineReducers({
  login: loginReducer,
  filter: courseFilterReducer,
  panel: studentPanelReducer,
  courses: courseReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
