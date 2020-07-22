import {
  getCourseList,
  removeCourseList,
  storeCourseList,
} from '../utils/courseStorage.js';

const initialState = {
  filteredList: [],
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
    default:
      return state;
  }
};

export default courseFilterReducer;
