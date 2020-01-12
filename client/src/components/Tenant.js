import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "../store";
import axios from "axios";
import EditTenant from "./EditTenant";
import { Link } from "react-router-dom";
import {API_ORIGIN_URL} from "../config"
export class Tenant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalImageUrl: null
    };
  }

  handleModalChange = source => {
    this.setState({ modalImageUrl: source });

    console.log(this.state);
  };

  fileChangedHandler = event => {
    const file = event.target.files[0];
    this.setState({ selectedFile: file });
  };

  uploadImage = event => {
    event.preventDefault();

    if (!this.state.selectedFile) return;

    this.setState({
      loading: true
    });

    const formData = new FormData();
    formData.append(
      "image",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    axios.post(`${API_ORIGIN_URL}/upload`, formData).then(({ data }) => {
      this.setState({
        image: data
      });
    });
  };
  handleDeleteTenant = (id, email) => {
    this.props.dispatch({ type: "DELETE_TENANT", payload: id, email: email });
  };
  render() {
    return (
      <div className="container-fluid bg-info p-5" >
        {this.props.tenants.map(tenant => {
          if (tenant._id === this.props.match.params.id)
            return (
              <div className="row">
                <div className="col-md-4 bg-light pt-5 rounded col-sm-12">
                  <div className="row">
                    <div className="col-md-6 col-sm-12 d-flex justify-content-center">
                      <div class="card" style={{ width: "20rem" }}>
                        <img
                          class="card-img-top img-thumbnail"
                          src={
                            tenant.documents
                              ? tenant.documents.id.secure_url
                              : null
                          }
                          alt=""
                        />
                        <div class="card-body">
                          <h5 class="card-title">ID Proof</h5>
                          <p class="card-text">Document Provided as Id Proof</p>
                        </div>
                        <button
                          className="btn btn-primary btn-sm m-2 py-2 px-5"
                          data-toggle="modal"
                          data-target="#image-modal"
                          onClick={() => {
                            let source = tenant.documents
                              ? tenant.documents.id.secure_url
                              : null;
                            this.handleModalChange(source);
                          }}
                        >
                          Click to View
                        </button>
                      </div>
                    </div>
                    <div className="col-md-6  col-sm-12 d-flex justify-content-center">
                      <div class="card" style={{ width: "20rem" }}>
                        <img
                          class="card-img-top img-thumbnail"
                          src={
                            tenant.documents
                              ? tenant.documents.address.secure_url
                              : null
                          }
                          alt=""
                        />
                        <div class="card-body">
                          <h5 class="card-title">Address Proof</h5>
                          <p class="card-text">
                            Document Provided as Address Proof
                          </p>
                        </div>
                        <button
                          className="btn btn-primary m-2 btn-sm py-2 px-5"
                          data-toggle="modal"
                          data-target="#image-modal"
                          onClick={() => {
                            let source = tenant.documents
                              ? tenant.documents.address.secure_url
                              : null;
                            this.handleModalChange(source);
                          }}
                        >
                          Click to View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/*==================================Modal Start=======================================*/}
                <div
                  class="modal fade"
                  id="image-modal"
                  tabindex="-1"
                  role="dialog"
                  aria-hidden="true"
                >
                  <div
                    class="modal-dialog modal-dialog-centered"
                    role="document"
                  >
                    <div class="modal-content" style={{ width: "80vw" }}>
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">
                          Document View
                        </h5>
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <img
                          style={{ width: "50vw" }}
                          src={this.state.modalImageUrl}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/*==================================Modal End======================================*/}

                <div className="col-md-8 bg-light col-sm-12 p-5  rounded">
                  <div className="container-fluid m-2 d-flex">
                    <div className="ml-auto">
                      <EditTenant currentTenant={tenant} />
                    </div>
                    <Link to="/"><button
                      className="btn btn-sm btn-danger ml-2"
                      onClick={() =>
                        this.handleDeleteTenant(tenant._id, tenant.owner)
                      }
                    >
                      <small>Delete</small>
                    </button></Link>
                  </div>
                  <p className="">
                    <strong>Name : </strong>
                    {tenant.name}
                  </p>
                  <hr />
                  <p className="">
                    <strong>Contact : </strong>
                    {tenant.contact}
                  </p>
                  <hr />
                  <p className="">
                    <strong>Father Name : </strong>
                    {tenant.fatherName}
                  </p>
                  <hr />
                  <p className="">
                    <strong>Address : </strong>
                    {tenant.address}
                  </p>
                  <hr />

                  <div className="alert alert-danger">
                    <p>
                      <strong className="btn btn-danger mr-4">
                        Emergency Contact Details
                      </strong>
                    </p>
                    <p>
                      Contact Person :{" "}
                      <strong>{tenant.emergencyContactPerson}</strong> | Contact
                      No : <strong>{tenant.emergencyContact}</strong>
                    </p>
                  </div>
                  <hr />
                  <p className="">
                    <strong>Room Alloted : </strong>
                    {tenant.roomAlloted}
                  </p>
                  <hr />
                  <p className="">
                    <strong>Allotment Date : </strong>
                    {tenant.allotmentDate}
                  </p>
                  <hr />
                </div>
              </div>
            );
          return null;
        })}
      </div>
    );
  }
}
export default connect(mapStateToProps)(Tenant);
