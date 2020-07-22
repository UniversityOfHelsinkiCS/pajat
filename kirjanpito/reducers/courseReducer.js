import url from '../config/url';

const initialState = {
  courses: [],
  courseId: null,
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
    dispatch({
      type: 'LOADING_FAIL',
    });
  }
};

export const setCourseId = (id) => (dispatch) => {
  try {
    dispatch({
      type: 'SET_COURSE_ID',
      payload: id,
    });
  } catch (e) {
    console.log(e);
  }
};

const courseReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'LOAD_COURSES':
      return {
        courses: payload,
        courseId: null,
      };
    case 'SET_COURSE_ID':
      return {
        ...state,
        courseId: payload,
      };
    case 'LOADING_FAIL':
      return state;
    default:
      return state;
  }
};

export default courseReducer;
