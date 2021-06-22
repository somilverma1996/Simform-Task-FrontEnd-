import {
    ADD_QUESTION,
    GET_QUESTIONS,
  } from "./actions";

  export const addQuestion = (data) => {
    console.log(data)
    return {
      type: ADD_QUESTION,
      payload: data
    };
  };
  
  export const getQuestion = () => {
    return {
      type: GET_QUESTIONS,
    };
  };

  export const addQues = (data) => {
    return (dispatch) => {
      dispatch(addQuestion(data));
    };
  };