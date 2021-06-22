import {
  SAVE_REQUEST,
  SAVE_SUCCESS,
  SAVE_FAILURE
} from "./actions";
import axios from 'axios';
import { toast } from 'react-toastify';

export const saveRequest = () => {
    return {
      type: SAVE_REQUEST,
    };
  };
  
  export const saveSuccess = () => {
    return {
      type: SAVE_SUCCESS,
    };
  };
  
  export const saveFailure = () => {
    return {
      type: SAVE_FAILURE,
    };
  };
  
  export const saveQues = (questions, ownProps) => {
    return (dispatch) => {
      console.log(questions)
      const data = {
        questions: questions
      };
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };
      dispatch(saveRequest());
      axios
        .post(`${process.env.REACT_APP_URL}questions/add`, questions, {
          headers: headers,
        })
        .then((response) => {
          console.log(response.data)
          const forms = response.data;
          dispatch(saveSuccess(forms));
          toast.dark("Saved in Database");
          ownProps.history.push("/formlist");
        })
        .catch((error) => {
          const errorMsg = error.message;
          dispatch(saveFailure(errorMsg));
        });
    };
  };