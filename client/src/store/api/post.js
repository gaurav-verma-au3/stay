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

// const fetchComments = videoId => {
//   let url = ``;
//   fetch(url)
//     .then(data => data.json())
//     .then(response => {
//       store.dispatch({
//         type: "UPDATE_COMMENTS",
//         payload: response.items
//       });
//     });
// };

// const fetchSearch = key => {
//   let url = ``;
//   console.log(url);
//   fetch(url)
//     .then(data => data.json())
//     .then(response => {
//       console.log(response.items);
//       store.dispatch({
//         type: "UPDATE_TRENDING",
//         payload: response.items
//       });
//     });
// };

// const gettoken = () => {
//   let user = localStorage.getItem("user");
//   user = JSON.parse(user);
//   return user.accessToken;
// };

// function createPlaylist(formData) {
//   let url = "";
//   let token = gettoken();
//   fetch(url, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "content-type": "application/json"
//     },
//     body: JSON.stringify(formData)
//   })
//     .then(data => data.json())
//     .then(res => {
//       store.dispatch({
//         type: "PLAYLIST_CREATED",
//         payload: res
//       });
//     });
// }

export { authincateLogin, signupUser };
