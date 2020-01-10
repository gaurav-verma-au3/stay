import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "../store";
import AddPayment from "./AddPayment";
export class Payments extends Component {
  handleDeletePayment = (id, email) => {
    this.props.dispatch({ type: "DELETE_PAYMENT", payload: id, email: email });
  };
  handleEditTenant = (e, id, email) => {
    e.preventDefault();
    this.props.dispatch({
      type: "EDIT_PAYMENT",
      payload: {
        name: e.target.tenantName.value,
        roomName: e.target.roomName.value,
        amount: e.target.amount.value,
        paymentDate: e.target.paymentDate.value,
        targetMonth: e.target.targetMonth.value,
        owner: email
      },
      id: id,
      email: email
    });
  };
  render() {
    return (
      <div>

        <AddPayment />

        <div className="table-responsive">
          <table className="table table-bordered table-sm ">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">TENANT NAME</th>
                <th scope="col">AMOUNT</th>
                <th scope="col">PAYMENT DATE</th>
                <th scope="col">TARGET MONTH</th>
                <th className="text-center" scope="col">
                  UPDATE
                </th>
                <th className="text-center" scope="col">
                  DELETE
                </th>
              </tr>
            </thead>
            <tbody>
              {this.props.payments.map((payment, index) => {
                return (
                  <tr key={payment._id}>
                    <td>{index + 1}</td>
                    <td>{payment.tenantName}</td>
                    <td> {payment.amount} </td>
                    <td> {payment.paymentDate} </td>
                    <td> {payment.targetMonth} </td>

                    <td>
                      <div>
                        <div className="container d-flex justify-content-center">
                          <button
                            className="btn btn-primary btn-sm p-1 m-0"
                            data-toggle="modal"
                            data-target={`#editPaymentModal-${payment._id}`}
                          >
                            <small>Update</small>
                          </button>
                        </div>
                        <div
                          className="modal fade"
                          id={`editPaymentModal-${payment._id}`}
                          tabIndex="-1"
                          role="dialog"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title">Update Tenant</h5>
                                <button
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <form
                                  onSubmit={e =>
                                    this.handleEditPayment(
                                      e,
                                      payment._id,
                                      this.props.isLoggedIn.user.email
                                    )
                                  }
                                >
                                  <div className="form-group">
                                    <label>Name</label>
                                    <select
                                      className="custom-select tm-select-accounts"
                                      name="tenantName"
                                      required
                                    >
                                      {this.props.tenants.map(tenant => (
                                        <option
                                          key={tenant._id}
                                          placeholder="Select Tenant"
                                        >
                                          {tenant.name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="form-group">
                                    <label>Room Name</label>
                                    <select
                                      className="custom-select tm-select-accounts"
                                      name="roomName"
                                      required
                                    >
                                      {this.props.rooms.map(room => (
                                        <option
                                          key={room._id}
                                          placeholder="Select Room"
                                        >
                                          {room.name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="form-group">
                                    <label className="col-form-label">
                                      Amount
                                    </label>
                                    <input
                                      name="amount"
                                      type="text"
                                      className="form-control validate"
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label className="col-form-label">
                                      Payment Date
                                    </label>
                                    <input
                                      name="paymentDate"
                                      type="text"
                                      className="form-control validate"
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label className="col-form-label">
                                      Target Month
                                    </label>
                                    <input
                                      name="targetMonth"
                                      type="text"
                                      className="form-control validate"
                                    />
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="submit"
                                      className="btn btn-primary"
                                    >
                                      Update Tenant
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="container d-flex justify-content-center">
                        <button
                          onClick={() =>
                            this.handleDeletePayment(
                              payment._id,
                              this.props.isLoggedIn.user.email
                            )
                          }
                          className="btn btn-sm btn-danger"
                        >
                          <small>Delete</small>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Payments);
