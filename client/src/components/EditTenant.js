import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { mapStateToProps } from "../store";

class EditTenant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null,
      idStatus: null,
      addressStatus: null,
      idImage: null,
      addressImage: null,
      modalImageUrl: null,
      currentTenant: null
    };
  }

  handleInputChange = e => {
    let value = e.target.value;
    let k = e.target.name;

    this.setState({
      currentTenant: { ...this.state.currentTenant, [k]: value }
    });
  };

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
      let public_idToDelete = type==="idProof" ? this.state.currentTenant.documents.id.public_id.substring(11, this.state.currentTenant.documents.id.public_id.length) : this.state.currentTenant.documents.address.public_id.substring(11, this.state.currentTenant.documents.address.public_id.length)
    formData.append(
      "image",
      this.state.selectedFile,
        this.state.selectedFile.name,
    );
      console.log(public_idToDelete)
      
    axios.post(`http://localhost:3001/upload/${public_idToDelete}`, formData).then(({ data }) => {
      if (type === "idProof") {
        this.setState({
          idStatus: "UpLoaded",
          idImage: data
        });
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

    handleEditTenant = (e, id, email) => {
        e.preventDefault();
    let idImageobj =
      this.state.idImage === null
        ? this.state.currentTenant.documents.id
        : this.state.idImage;
    let addressImageObj =
      this.state.addressImage === null
        ? this.state.currentTenant.documents.address
        : this.state.addressImage;
    this.props.dispatch({
      type: "EDIT_TENANT",
      payload: {
        name: e.target.name.value,
        contact: e.target.contact.value,
        fatherName: e.target.fatherName.value,
        address: e.target.address.value,
        documents: {
          id: idImageobj,
          address: addressImageObj
        },
        emergencyContactPerson: e.target.emergencyContactPerson.value,
        emergencyContact: e.target.emergencyContact.value,
        roomAlloted: e.target.roomAlloted.value,
        allotmentDate: e.target.allotmentDate.value,
        owner: email
      },
      id: id,
      email: email
    });
  };

  componentDidMount() {
    this.setState({ currentTenant: this.props.currentTenant });
  }

  render() {
    console.log(this.state);

    return (
      <div>
        {/* ========================================Edit start============================================== */}

        <button
          className="btn btn-primary ml-auto"
          data-toggle="modal"
          data-target="#addTenantModal"
        >
          Edit
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
                  Edit
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
                          <div class="form-group">
                            <label>
                              <strong>Upload Id Proof</strong>
                            </label>
                            <div class="custom-file">
                              <input
                                type="file"
                                name="files"
                                onChange={e => this.fileChangedHandler(e)}
                                class="custom-file-input"
                              />
                              <label class="custom-file-label" for="customFile">
                                Choose file
                              </label>
                            </div>
                          </div>
                          <div class="form-group">
                            <button
                              onClick={e => this.uploadImage(e, "idProof")}
                              class="btn btn-block btn-dark"
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
                          <div class="form-group">
                            <label>
                              <strong>Upload Address Proof</strong>
                            </label>
                            <div class="custom-file">
                              <input
                                type="file"
                                name="files"
                                onChange={e => this.fileChangedHandler(e)}
                                class="custom-file-input"
                              />
                              <label class="custom-file-label" for="customFile">
                                Choose file
                              </label>
                            </div>
                          </div>
                          <div class="form-group">
                            <button
                              onClick={e => this.uploadImage(e, "addressProof")}
                              class="btn btn-block btn-dark"
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
                    this.handleEditTenant(e, this.state.currentTenant._id, this.props.isLoggedIn.user.email)
                  }
                >
                  <div className="form-group mb-3">
                    <label>Tenant Name</label>
                    <input
                      name="name"
                      type="text"
                      onChange={e => this.handleInputChange(e)}
                      value={
                        this.state.currentTenant
                          ? this.state.currentTenant.name
                          : null
                      }
                      className="form-control validate"
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Phone Number</label>
                    <input
                      name="contact"
                      type="text"
                      onChange={e => this.handleInputChange(e)}
                      value={
                        this.state.currentTenant
                          ? this.state.currentTenant.contact
                          : null
                      }
                      className="form-control validate"
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Fathers Name</label>
                    <input
                      name="fatherName"
                      type="text"
                      onChange={e => this.handleInputChange(e)}
                      value={
                        this.state.currentTenant
                          ? this.state.currentTenant.fatherName
                          : null
                      }
                      className="form-control validate"
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Permanent Address</label>
                    <input
                      name="address"
                      type="text"
                      onChange={e => this.handleInputChange(e)}
                      value={
                        this.state.currentTenant
                          ? this.state.currentTenant.address
                          : null
                      }
                      className="form-control validate"
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Emergency Contact Person : (local)</label>
                    <input
                      name="emergencyContactPerson"
                      type="text"
                      onChange={e => this.handleInputChange(e)}
                      value={
                        this.state.currentTenant
                          ? this.state.currentTenant.emergencyContactPerson
                          : null
                      }
                      className="form-control validate"
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>Emergency Phone Number</label>
                    <input
                      name="emergencyContact"
                      type="text"
                      onChange={e => this.handleInputChange(e)}
                      value={
                        this.state.currentTenant
                          ? this.state.currentTenant.emergencyContact
                          : null
                      }
                      className="form-control validate"
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>Room Alloted</label>
                    <select
                      className="custom-select tm-select-accounts"
                      name="roomAlloted"
                      onChange={e => this.handleInputChange(e)}
                    >
                      <option defaultValue="Select Room"></option>
                      {this.props.rooms.map(room => (
                        <option
                          key={room._id}
                          value={room.name}
                          selected={
                            this.state.currentTenant
                              ? room.name ===
                                this.state.currentTenant.roomAlloted
                                ? true
                                : false
                              : false
                          }
                        >
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
                      onChange={e => this.handleInputChange(e)}
                      value={
                        this.state.currentTenant
                          ? this.state.currentTenant.allotmentDate
                          : null
                      }
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

        {/* ========================================Edit end ============================================= */}
      </div>
    );
  }
}

export default connect(mapStateToProps)(EditTenant);
