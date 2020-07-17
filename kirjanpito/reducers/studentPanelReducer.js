const initialState = {
  index: 0,
  active: false,
};

export const setActive = (index) => async (dispatch) => {
  dispatch({
    type: 'SET_ACTIVE',
    payload: index,
  });
};

const studentPanelReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_ACTIVE':
      return {
        index: payload,
        active: !state.active,
      };
    default:
      return state;
  }
};

export default studentPanelReducer;
