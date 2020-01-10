import {
  fetchPayments,
  addPayment,
  deletePayment,
  editPayment
} from "../api/payments";

const paymentsReducer = (payments = [], action) => {
  if (action.type === "FETCH_PAYMENTS") {
    fetchPayments(action.payload);
  }

  if (action.type === "UPDATE_PAYMENTS") {
    payments = action.payload;
  }

  if (action.type === "ADD_PAYMENT") {
    addPayment(action.payload, action.email);
  }

  if (action.type === "DELETE_PAYMENT") {
    deletePayment(action.payload, action.email);
  }
  if (action.type === "EDIT_PAYMENT") {
    editPayment(action.payload, action.email, action.id);
  }
  return payments;
};

export default paymentsReducer;
