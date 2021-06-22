import {
    SAVE_REQUEST,
    SAVE_SUCCESS,
    SAVE_FAILURE
  } from "./actions";

  const initialState = {
    loading: false,
    users: [],
    error: "",
  };
  

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case SAVE_REQUEST:
        return {
            ...state,
            loading: true,
          };
      case SAVE_SUCCESS:
        return {
            loading: false,
            users: action.payload,
            error: "",
          };
      case SAVE_FAILURE:
        return {
            loading: false,
            users: [],
            error: action.payload,
          };
      default:
        return state;
    }
  };

  export default reducer;