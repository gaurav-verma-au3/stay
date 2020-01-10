import { combineReducers } from "redux";
import loggedInReducer from "./loggedInReducer";
import signupReducer from "./signupReducer";
import roomsReducer from "./roomsReducer";
import tenantsReducer from "./tenantsReducer";
import paymentsReducer from "./paymentsReducer";
const reducers = combineReducers({
  isLoggedIn: loggedInReducer,
  signupResponse: signupReducer,
  rooms: roomsReducer,
  tenants: tenantsReducer,
  payments: paymentsReducer
});

export default reducers;
