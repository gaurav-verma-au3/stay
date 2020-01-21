import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "../store";
import AddTenant from "./AddTenant";

class AddRoom extends Component {
  handleSubmit = (e, email) => {
    e.preventDefault();

    this.props.dispatch({
      type: "ADD_ROOM",
      payload: {
        name: e.target.name.value,
        bedCount: e.target.bedCount.value,
        rent: e.target.rent.value,
        owner: email
      },
      email: email
    });
  };
  render() {
    return (
      <div className="container-fluid p-0">
        <div className="container-fluid d-flex py-3 px-3  align-items-center bg-info ">
 
            <h6 className="m-0 p-0">
            <strong className="m-0 p-0">Rooms</strong>
          </h6>
          <div className="ml-auto">
            <AddTenant />
            </div>
            <button
            className="btn btn-primary btn-sm ml-3 p-1 px-1"
            data-toggle="modal"
            data-target="#exampleModal"
            data-whatever="@mdo"
          >
            Add New Room
          </button>
            </div>
        
      <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add New Room
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
                    <label className="col-form-label">Room Name</label>
                    <input
                      name="name"
                      type="text"
                      className="form-control validate"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">Bed Count</label>
                    <input
                      name="bedCount"
                      type="text"
                      className="form-control validate"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">Rent/Bed</label>
                    <input
                      name="rent"
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
                      Add
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

export default connect(mapStateToProps)(AddRoom);
