import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import loginReducer from './reducers/loginReducer';
import courseFilterReducer from './reducers/courseFilterReducer';

const reducer = combineReducers({
  login: loginReducer,
  filter: courseFilterReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
