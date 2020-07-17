const initialState = {
  isFilter: false,
};

export const setFilterOn = () => async (dispatch) => {
  dispatch({
    type: 'SET_FILTER_ON',
  });
};

export const setFilterOff = () => async (dispatch) => {
  dispatch({
    type: 'SET_FILTER_OFF',
  });
};

const courseFilterReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case 'SET_FILTER_ON':
      return {
        isFilter: true,
      };
    case 'SET_FILTER_OFF':
      return {
        isFilter: false,
      };
    default:
      return state;
  }
};

export default courseFilterReducer;
