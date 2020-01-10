import { store } from "../../store";
import { API_ORIGIN_URL } from "../../config";

const fetchRooms = email => {
  let url = `${API_ORIGIN_URL}/rooms/${email}`;
  fetch(url, {
    headers: {
      credentials: email
    }
  })
    .then(data => data.json())
    .then(data => {
      store.dispatch({
        type: "UPDATE_ROOMS",
        payload: data
      });
    });
};

const addRoom = (formData, email) => {
  let url = `${API_ORIGIN_URL}/rooms/add`;
  fetch(url, {
    method: "POST",
    headers: {
      credentials: email,
      "content-type": "application/json"
    },
    body: JSON.stringify(formData)
  })
    .then(data => data.json())
    .then(data => {
      store.dispatch({
        type: "FETCH_ROOMS",
        payload: email
      });
    });
};

const deleteRoom = (id, email) => {
  let url = `${API_ORIGIN_URL}/rooms/delete/${id}`;
  fetch(url, {
    method: "DELETE",
    headers: {
      credentials: email
    }
  })
    .then(data => data.json())
    .then(data => {
      store.dispatch({
        type: "FETCH_ROOMS",
        payload: email
      });
    });
};

const editRoom = (formData, email, id) => {
  let url = `${API_ORIGIN_URL}/rooms/update/${id}`;
  fetch(url, {
    method: "PUT",
    headers: {
      credentials: email,
      "content-type": "application/json"
    },
    body: JSON.stringify(formData)
  })
    .then(data => data.json())
    .then(data => {
      console.log(data);
      store.dispatch({
        type: "FETCH_ROOMS",
        payload: email
      });
    });
};

export { fetchRooms, addRoom, deleteRoom, editRoom };
