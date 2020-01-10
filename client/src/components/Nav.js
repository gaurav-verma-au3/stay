import React from "react";
import {Link, Redirect} from 'react-router-dom'
import { connect } from "react-redux";
import { mapStateToProps } from "../store";
 
class Nav extends React.Component {
  handleLogout() {
    localStorage.clear()
    if(localStorage.getItem("pg-control")===null) window.location.reload();
 }
 
  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-info">
        <a className="navbar-brand" href="/">mstay*</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Overview<span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/rooms">Rooms</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tenants">Tenants</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " to="/payments">Payments</Link>
                    </li>
                    <li className="nav-item">
              <button className="nav-link btn btn-danger px-3" onClick={this.handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
 
export default connect(mapStateToProps)( Nav);