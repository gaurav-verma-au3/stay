import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "../store";
import AddRoom from "./AddRoom";
import {Link} from 'react-router-dom'
class Rooms extends Component {
  handleDeleteRoom = (id, email) => {
    this.props.dispatch({ type: "DELETE_ROOM", payload: id, email: email });
  };
  handleEditRoom = (e, email, id) => {
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
    return (
      <div>
        <hr />
        <AddRoom />

        <div className="table-responsive">
          <table className="table table-bordered table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th className="text-center" scope="col">
                  TENANT NAME
                </th>
                <th scope="col">NO OF BEDS</th>
                <th scope="col">RENT / BED</th>
                <th scope="col">TOTAL RENT</th>
                <th scope="col" className="text-center">
                  UPDATE
                </th>
                <th scope="col" className="text-center">
                  DELETE
                </th>
              </tr>
            </thead>
            <tbody>
              {this.props.rooms.map((room, index) => {
                return (
                  <tr key={room._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="container-fluid text-center p-0 m-0">

                        {                      

                          this.props.tenants.map(tenant => {
                            let counter = 0;
                            if (tenant.roomAlloted === room.name)
                            {counter +=1
                            return <Link to={`tenants/${tenant._id}`} ><strong key={tenant._id}>| {tenant.name} |</strong></Link>}
                            else if (counter===0){
                          return <strong><p className="text-center m-0 text-danger">VACCANT</p></strong>
                            }
                        })}
                      </div>
                    </td>
                    <td> {room.bedCount} </td>
                    <td> {room.rent} </td>
                    <td> {room.rent * room.bedCount} </td>
                    <td>
                      <div>
                        <div className="container d-flex justify-content-center">
                          <button
                            className="btn btn-primary btn-sm p-1 m-0"
                            data-toggle="modal"
                            data-target={`#editRoomModal-${room._id}`}
                          >
                            <small>Update</small>
                          </button>
                        </div>
                        <div
                          className="modal fade"
                          id={`editRoomModal-${room._id}`}
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
                                    this.handleEditRoom(
                                      e,
                                      this.props.isLoggedIn.user.email,
                                      room._id
                                    )
                                  }
                                >
                                  <div className="form-group">
                                    <label className="col-form-label">
                                      Room Name
                                    </label>
                                    <input
                                      placeholder={room.name}
                                      name="name"
                                      type="text"
                                      className="form-control validate"
                                      required
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label className="col-form-label">
                                      Bed Count
                                    </label>
                                    <input
                                      placeholder={room.bedCount}
                                      name="bedCount"
                                      type="text"
                                      className="form-control validate"
                                      required
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label className="col-form-label">
                                      Rent/Bed
                                    </label>
                                    <input
                                      placeholder={room.rent}
                                      name="rent"
                                      type="text"
                                      className="form-control validate"
                                    />
                                  </div>
                                  <div className="modal-footer">
                                    <div className="container d-flex justify-content-center">
                                      <button
                                        type="submit"
                                        //data-dismiss="modal"
                                        className="btn btn-primary"
                                      >
                                        Update Room
                                      </button>
                                    </div>
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
                            this.handleDeleteRoom(
                              room._id,
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

export default connect(mapStateToProps)(Rooms);
