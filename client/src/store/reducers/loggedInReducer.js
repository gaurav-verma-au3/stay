import { authincateLogin } from "../api/post";
import { store } from "../../store";

const loggedInReducer = (
  isLoggedIn = { status: false, user: null, error: null, message: null },
  action
) => {
  if (action.type === "LOGIN_AUTH") {
    authincateLogin(action.payload, store);
  }
  if (action.type === "UPDATE_USER") {
    console.log(action.payload);
    return (isLoggedIn = action.payload);
  }
  if (action.type === "LOGOUT") {
    isLoggedIn = false;
  }
  return isLoggedIn;
};

export default loggedInReducer;
