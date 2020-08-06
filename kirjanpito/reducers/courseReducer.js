import url from '../config/url';
import * as Sentry from '@sentry/react-native';

const initialState = {
  courses: [],
  selectedCourse: null,
};

export const loadCourses = () => async (dispatch) => {
  try {
    const result = await fetch(`${url}/api/courses/`);
    const courses = await result.json();
    const courseEditor = courses.map((course) => ({
      id: course.id,
      title: course.title,
      shortTitle: course.shortTitle,
      selector: false,
    }));
    const payload = courseEditor;
    dispatch({
      type: 'LOAD_COURSES',
      payload,
    });
  } catch (e) {
    Sentry.captureException(e);
    dispatch({
      type: 'LOADING_FAIL',
    });
  }
};

export const setSelectedCourse = (course) => (dispatch) => {
  try {
    dispatch({
      type: 'SET_COURSE',
      payload: course,
    });
  } catch (e) {
    Sentry.captureException(e);
  }
};

const courseReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'LOAD_COURSES':
      return {
        ...state,
        courses: payload,
      };
    case 'SET_COURSE':
      return {
        ...state,
        selectedCourse: payload,
      };
    case 'LOADING_FAIL':
      return state;
    default:
      return state;
  }
};

export default courseReducer;
