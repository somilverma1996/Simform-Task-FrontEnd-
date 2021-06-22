
import { combineReducers } from "redux";
import reducer from "../questions/reducer";
import saveQuesReducer from "../saveanswer/reducer";

const rootReducer = combineReducers({
  questionReducer: reducer,  
  addQuestions: saveQuesReducer
});

export default rootReducer;