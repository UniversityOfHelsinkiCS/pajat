const initialState = {
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

const filterEditorReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case 'SET_FILTER_EDITOR':
      return {
        isActive: true,
      };
    case 'HIDE_FILTER_EDITOR':
      return {
        isActive: false,
      };
    default:
      return state;
  }
};

export default filterEditorReducer;
