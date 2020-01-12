import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "../store";
import AddTenant from "./AddTenant";
import EditTenant from './EditTenant'
import { Link } from "react-router-dom";
class Tenants extends Component {
    handleDeleteTenant = (id, email) => {
        this.props.dispatch({ type: "DELETE_TENANT", payload: id, email: email });
      };
  
  render() {
    return (

<div className="container-fluid p-0">
        <div className="container-fluid d-flex py-3 px-0  align-items-center bg-info ">
 
            <h6 className="m-0 p-0">
            <strong className="m-0 p-0">Tenants</strong>
          </h6>
          <div className="ml-auto">
            <AddTenant />
            </div>
            </div>

      <div className="bg-light rounded">
        
        <div className="table-responsive">
          <table className="table table-bordered table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th className="text-center" scope="col">
                  TENANT NAME
                </th>
                <th scope="col">CONTACT NO</th>
                <th scope="col">FATHERS NAME</th>
                <th scope="col">ADDRESS</th>
                <th scope="col">EMERGENCY CONTACT</th>
                <th scope="col">ALLOTMENT DATE</th>
                <th scope="col" className="text-center">
                  UPDATE
                </th>
                <th scope="col" className="text-center">
                  DELETE
                </th>
              </tr>
            </thead>
            <tbody>
              {this.props.tenants.map((tenant, index) => {

                return (
                  <tr key={tenant._id}>
                    <td>{index + 1}</td>
                    <td className="">
                    <Link key={tenant._id} to={`tenants/${tenant._id}`} ><strong className="" key={tenant._id}>{tenant.name}</strong></Link>
                    </td>
                    <td> {tenant.contact} </td>
                    <td> {tenant.fathersName} </td>
                    <td> {tenant.address} </td>
                <td className="text-danger font-weight-bold "> {tenant.emergencyContactPerson}  {tenant.emergencyContact}</td>
                    <td> {tenant.allotmentDate} </td>
                    
                    <td>
                    <EditTenant currentTenant={tenant} />
                    </td>
                    <td>
                      <div className="container d-flex justify-content-center">
                        <button
                          onClick={() =>
                            this.handleDeleteTenant(
                              tenant._id,
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
      </div>

    );
  }
}

export default connect(mapStateToProps)(Tenants);
