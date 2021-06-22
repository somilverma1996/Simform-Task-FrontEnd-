import {
    ADD_QUESTION,
    GET_QUESTIONS,
  } from "./actions";

const initialState = [];

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_QUESTION:
        return [
          ...action.payload
        ];
      case GET_QUESTIONS:
        return state;
      default:
        return state;
    }
  };

  export default reducer;