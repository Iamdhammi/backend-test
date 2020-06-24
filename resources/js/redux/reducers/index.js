import { combineReducers } from "redux";
import auth from "./authReducer";
import talk from "./talkReducer";
import attendee from "./attendeeReducer";

export default combineReducers({ auth, talk, attendee });
