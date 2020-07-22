import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import loginReducer from './reducers/loginReducer';
import courseFilterReducer from './reducers/courseFilterReducer';
import studentPanelReducer from './reducers/studentPanelReducer';
import courseReducer from './reducers/courseReducer';
import filterEditorReducer from './reducers/filterEditorReducer';

const reducer = combineReducers({
  login: loginReducer,
  filteredList: courseFilterReducer,
  panel: studentPanelReducer,
  courses: courseReducer,
  editor: filterEditorReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
