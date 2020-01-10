import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "../store";
import axios from "axios";
import {API_ORIGIN_URL} from '../config'
export class AddTenant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      idStatus: null,
      addressStatus: null,
      idImage: null,
      addressImage: null,
      modalImageUrl: null
    };
  }
  fileChangedHandler = event => {
    const file = event.target.files[0];
    this.setState({ selectedFile: file });
  };

  uploadImage = (event, type) => {
    event.preventDefault();

    if (!this.state.selectedFile) return;
    if (type === "idProof") {
      this.setState({
        idStatus: "Uploading"
      });
    } else {
      this.setState({
        addressStatus: "Uploading"
      });
    }

    const formData = new FormData();
    formData.append(
      "image",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    
    axios.post(`${API_ORIGIN_URL}/upload`, formData).then(({ data }) => {
      if (type === "idProof") {
        this.setState({
          idStatus: "UpLoaded",
          idImage: data
        });
        console.log(this.state.idImage);
      } else {
        this.setState({
          addressStatus: "UpLoaded",
          addressImage: data
        });
        console.log(
          this.state.addressImage,
          this.state.addressImage.secure_url
        );
      }
    });
  };

  handleSubmit = (e, email) => {
    e.preventDefault();

    this.props.dispatch({
      type: "ADD_TENANT",
      payload: {
        name: e.target.name.value,
        contact: e.target.contact.value,
        fatherName: e.target.fatherName.value,
        address: e.target.address.value,
        emergencyContactPerson: e.target.emergencyContactPerson.value,
        emergencyContact: e.target.emergencyContact.value,
        roomAlloted: e.target.roomAlloted.value,
        allotmentDate: e.target.allotmentDate.value,
        documents: {
          id: this.state.idImage,
          address: this.state.addressImage
        },
        owner: email
      },
      email: email
    });
  };
  render() {
    return (
      <div>
        <button
          className="btn btn-primary btn-sm p-1 px-3"
          data-toggle="modal"
          data-target="#addTenantModal"
        >
          Add New Tenant
        </button>
        <div
          className="modal fade"
          id="addTenantModal"
          tabIndex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add New Tenant
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
                <div className="container">
                  <div className="row">
                    <div className="col-6">
                    {this.state.idImage != null ? (
                        <img
                          src={this.state.idImage.secure_url}
                          style={{ width: "100%" }}
                          alt=""
                        />
                      ) : (
                        <div>
                          {" "}
                          <div className="form-group">
                            <label>
                              <strong>Upload Id Proof</strong>
                            </label>
                            <div className="custom-file">
                              <input
                                type="file"
                                name="files"
                                onChange={e => this.fileChangedHandler(e)}
                                className="custom-file-input"
                              />
                              <label className="custom-file-label">
                                Choose file
                              </label>
                            </div>
                          </div>
                          <div className="form-group">
                            <button
                              onClick={e => this.uploadImage(e, "idProof")}
                              className="btn btn-block btn-dark"
                            >
                              Upload
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="col-6">
                      {this.state.addressImage != null ? (
                        <img
                          src={this.state.addressImage.secure_url}
                          style={{ width: "100%" }}
                          alt=""
                        />
                      ) : (
                        <div>
                          {" "}
                          <div className="form-group">
                            <label>
                              <strong>Upload Address Proof</strong>
                            </label>
                            <div className="custom-file">
                              <input
                                type="file"
                                name="files"
                                onChange={e => this.fileChangedHandler(e)}
                                className="custom-file-input"
                              />
                              <label className="custom-file-label">
                                Choose file
                              </label>
                            </div>
                          </div>
                          <div className="form-group">
                            <button
                              onClick={e => this.uploadImage(e, "addressProof")}
                              className="btn btn-block btn-dark"
                            >
                              Upload
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <form
                  onSubmit={e =>
                    this.handleSubmit(e, this.props.isLoggedIn.user.email)
                  }
                >
                  <div className="form-group mb-3">
                    <label>Tenant Name</label>
                    <input
                      name="name"
                      type="text"
                      className="form-control validate"
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Phone Number</label>
                    <input
                      name="contact"
                      type="text"
                      className="form-control validate"
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Fathers Name</label>
                    <input
                      name="fatherName"
                      type="text"
                      className="form-control validate"
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Permanent Address</label>
                    <input
                      name="address"
                      type="text"
                      className="form-control validate"
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Emergency Contact Person : (local)</label>
                    <input
                      name="emergencyContactPerson"
                      type="text"
                      className="form-control validate"
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>Emergency Phone Number</label>
                    <input
                      name="emergencyContact"
                      type="text"
                      className="form-control validate"
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>Room Alloted</label>
                    <select
                      className="custom-select tm-select-accounts"
                      name="roomAlloted"
                    >
                      <option defaultValue="Select Room"></option>
                      {this.props.rooms.map(room => (
                        <option key={room._id} value={room.name}>
                          {room.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group mb-3">
                    <label>Allotment Date</label>
                    <input
                      name="allotmentDate"
                      type="date"
                      className="form-control validate"
                      data-large-mode="true"
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
                    <button type="submit" className="btn btn-primary">
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
  };
};

export default connect(mapStateToProps)(AddTenant);
