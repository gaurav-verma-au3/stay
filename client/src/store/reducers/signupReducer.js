import { signupUser } from "../api/post";

const signupReducer = (signupResponse = null, action) => {
  if (action.type === "SIGNUP_USER") {
    signupUser(action.payload);
  }

  if (action.type === "UPDATE_SIGNUP_RESPONSE") {
    signupResponse = action.payload;
  }
  return signupResponse;
};

export default signupReducer;
