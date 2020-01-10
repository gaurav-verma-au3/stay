import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "../store";
export class EditRoom extends Component {
  handleSubmit = (e, email, id) => {
    e.preventDefault();

    this.props.dispatch({
      type: "EDIT_ROOM",
      payload: {
        name: e.target.name.value,
        bedCount: e.target.bedCount.value,
        rent: e.target.rent.value,
        owner: email
      },
      email: email,
      id: id
    });
  };
  render() {
    console.log(this.props.id);
    return (
      <div key={this.props.id}>
        <button
          className="btn btn-primary btn-sm p-1 m-0"
          data-toggle="modal"
          data-target="#editModal"
        >
          <small>Update</small>
        </button>
        <div
          className="modal fade"
          id="editModal"
          tabIndex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Room</h5>
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
                    this.handleSubmit(
                      e,
                      this.props.isLoggedIn.user.email,
                      this.props.id
                    )
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
                      Update Room
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

export default connect(mapStateToProps)(EditRoom);
