import { store } from "../../store";
import { API_ORIGIN_URL } from "../../config";

const fetchPayments = email => {
  let url = `${API_ORIGIN_URL}/payments/${email}`;
  fetch(url, {
    headers: {
      credentials: email
    }
  })
    .then(data => data.json())
    .then(data => {
      store.dispatch({
        type: "UPDATE_PAYMENTS",
        payload: data
      });
    });
};

const addPayment = (formData, email) => {
  let url = `${API_ORIGIN_URL}/payments/add`;
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
        type: "FETCH_PAYMENTS",
        payload: email
      });
    });
};

const editPayment = (formData, email, id) => {
  let url = `${API_ORIGIN_URL}/payments/update/${id}`;
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
        type: "FETCH_PAYMENTS",
        payload: email
      });
    });
};

const deletePayment = (id, email) => {
  let url = `${API_ORIGIN_URL}/payments/delete/${id}`;
  fetch(url, {
    method: "DELETE",
    headers: {
      credentials: email
    }
  })
    .then(data => data.json())
    .then(data => {
      store.dispatch({
        type: "FETCH_PAYMENTS",
        payload: email
      });
    });
};

export { fetchPayments, addPayment, editPayment, deletePayment };
