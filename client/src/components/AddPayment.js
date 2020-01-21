import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "../store";

class AddPayment extends Component {
  handleSubmit = (e, email) => {
    e.preventDefault();
    this.props.dispatch({
      type: "ADD_PAYMENT",
      payload: {
        tenantName: e.target.tenantName.value,
        roomName: e.target.roomName.value,
        amount: e.target.amount.value,
        paymentDate: e.target.paymentDate.value,
        targetMonth: e.target.targetMonth.value,
        owner: email
      },
      email: email
    });
  };
  render() {
    return (
      <div className="container-fluid p-0">
        <div className="container-fluid py-3 px-3 bg-info d-flex align-items-center ">
          <h6 className="m-0 p-0">
            <strong>Payments</strong>
          </h6>
          <button
            className="btn btn-primary btn-sm p-1 px-1 m-0 ml-auto"
            data-toggle="modal"
            data-target="#add-payment-modal"
            data-whatever="@mdo"
          >
            Add Payment
          </button>
        </div>
        <div
          className="modal fade"
          id="add-payment-modal"
          tabIndex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Payment
                </h5>
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
                    this.handleSubmit(e, this.props.isLoggedIn.user.email)
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
                        <option key={tenant._id} placeholder="Select Tenant">
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
                        <option key={room._id} placeholder="Select Room">
                          {room.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">Amount</label>
                    <input
                      name="amount"
                      type="text"
                      className="form-control validate"
                    />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">Payment Date</label>
                    <input
                      name="paymentDate"
                      type="text"
                      className="form-control validate"
                    />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">Target Month</label>
                    <input
                      name="targetMonth"
                      type="text"
                      className="form-control validate"
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      // data-dismiss="modal"
                      className="btn btn-primary"
                    >
                      Add Payment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(AddPayment);
