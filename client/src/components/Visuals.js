import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "../store";
import PaymentsChart from "./PaymentsChart";
import OccupancyChart from "./OccupancyChart";
class Visuals extends Component {
  render() {
    return (
      <div className="container-fluid ">
        <div className="row">
          <div className="col-md-4 col-sm-12">
            <OccupancyChart />
          </div>
          <div className="col-md-4 col-sm-12"></div>
          <div className="col-md-4 col-sm-12">
            <PaymentsChart />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Visuals);
