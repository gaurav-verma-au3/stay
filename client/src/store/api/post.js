import { store } from "../../store";
import { API_ORIGIN_URL } from "../../config";

const authincateLogin = formData => {
  let url = `${API_ORIGIN_URL}/login`;
  fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(formData)
  })
    .then(data => data.json())
    .then(data => {
      store.dispatch({
        type: "UPDATE_USER",
        payload: data
      });
    });
};

const signupUser = formData => {
  let url = `${API_ORIGIN_URL}/register`;
  fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(formData)
  })
    .then(data => data.json())
    .then(data => {
      store.dispatch({
        type: "UPDATE_SIGNUP_RESPONSE",
        payload: data
      });
    });
};

export { authincateLogin, signupUser };
