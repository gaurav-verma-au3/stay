import {
  fetchTenants,
  addTenant,
  deleteTenant,
  editTenant
} from "../api/tenants";

const tenantsReducer = (tenants = [], action) => {
  if (action.type === "FETCH_TENANTS") {
    fetchTenants(action.payload);
  }
  if (action.type === "UPDATE_TENANTS") {
    tenants = action.payload;
  }
  if (action.type === "ADD_TENANT") {
    addTenant(action.payload, action.email);
  }
  if (action.type === "DELETE_TENANT") {
    deleteTenant(action.payload, action.email);
  }
  if (action.type === "EDIT_TENANT") {
    editTenant(action.payload, action.id, action.email);
  }
  return tenants;
};
export default tenantsReducer;
