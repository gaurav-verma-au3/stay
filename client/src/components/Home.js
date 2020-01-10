import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "../store";
import Visuals from "./Visuals";
import Rooms from "./Rooms";
import Payments from "./Payments";
class Home extends Component {
  fetchRooms = email => {
    this.props.dispatch({ type: "FETCH_ROOMS", payload: email });
    this.props.dispatch({ type: "FETCH_TENANTS", payload: email });
    this.props.dispatch({ type: "FETCH_PAYMENTS", payload: email });
  };

  componentDidMount() {
    this.fetchRooms(this.props.isLoggedIn.user.email);
  }
  render() {
    return (
      <div className="container-fluid  m-0 p-0">
        <div className="container-fluid m-0 p-0">
          <Visuals />
        </div>
        <div className="container-fluid" style={{ height: "45vh" }}>
          <div className="row">
            <div className=" col-md-12 p-4 bg-info  col-sm-12 ">
              <Rooms />
            </div>
            {/* 
            <div className=" col-md-6 col-sm-12">
              <Tenants />
            </div> */}
          </div>
          <div className="row">
            <div className="col-12 bg-info p-4">
              <Payments />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Home);
