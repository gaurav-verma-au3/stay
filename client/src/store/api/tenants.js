import { store } from "../../store";
import { API_ORIGIN_URL } from "../../config";

const fetchTenants = email => {
  let url = `${API_ORIGIN_URL}/tenants/${email}`;
  fetch(url, {
    headers: {
      credentials: email
    }
  })
    .then(data => data.json())
    .then(data => {
      store.dispatch({
        type: "UPDATE_TENANTS",
        payload: data
      });
    });
};

const addTenant = (formData, email) => {
  let url = `${API_ORIGIN_URL}/tenants/add`;
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
        type: "FETCH_TENANTS",
        payload: email
      });
    });
};

const editTenant = (formData, id, email) => {
  let url = `${API_ORIGIN_URL}/tenants/update/${id}`;
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
        type: "FETCH_TENANTS",
        payload: email
      });
    });
};

const deleteTenant = (id, email) => {
  let url = `${API_ORIGIN_URL}/tenants/delete/${id}`;
  fetch(url, {
    method: "DELETE",
    headers: {
      credentials: email
    }
  })
    .then(data => data.json())
    .then(data => {
      store.dispatch({
        type: "FETCH_TENANTS",
        payload: email
      });
    });
};

export { fetchTenants, addTenant, deleteTenant, editTenant };
