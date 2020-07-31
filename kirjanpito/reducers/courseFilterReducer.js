import {
  getCourseList,
  removeCourseList,
  storeCourseList,
} from '../utils/courseStorage.js';

const initialState = {
  filteredList: [],
  isActive: false,
};

export const setFilterEditor = () => async (dispatch) => {
  dispatch({
    type: 'SET_FILTER_EDITOR',
  });
};

export const hideFilterEditor = () => async (dispatch) => {
  dispatch({
    type: 'HIDE_FILTER_EDITOR',
  });
};

export const loadFilteredList = () => async (dispatch) => {
  let list = [];
  list = await getCourseList();
  dispatch({
    type: 'SET_COURSES',
    payload: list,
  });
};

export const setFilteredList = (list) => async (dispatch) => {
  await removeCourseList();
  storeCourseList(list);
  dispatch({
    type: 'SET_COURSES',
    payload: list,
  });
};

const courseFilterReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_COURSES':
      return {
        filteredList: payload,
      };
    case 'SET_FILTER_EDITOR':
      return {
        ...state,
        isActive: true,
      };
    case 'HIDE_FILTER_EDITOR':
      return {
        ...state,
        isActive: false,
      };
    default:
      return state;
  }
};

export default courseFilterReducer;
