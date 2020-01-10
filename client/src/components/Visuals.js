import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "../store";
import PaymentsChart from "./PaymentsChart";
import OccupancyChart from "./OccupancyChart";
class Visuals extends Component {
  render() {
    return (
      <div className="container-fluid m-0 p-0 ">
        <div className="row m-0">
          <div className="col-md-6 col-sm-12 m-0 p-0">
            <OccupancyChart />
          </div>
          {/* <div className="col-md-6 col-sm-6"></div> */}
          <div className="col-md-6 col-sm-12 m-0 p-0 ">
            <PaymentsChart />
          </div>
        </div>
      </div>

    );
  }
}

export default connect(mapStateToProps)(Visuals);
