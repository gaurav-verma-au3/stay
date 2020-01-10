import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "../store";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

class PaymentsChart extends Component {
  render() {
    let data = [
      {
        name: "JAN",
        collected: 0,
        due: 0,
        total: 0
      },
      {
        name: "FEB",
        collected: 0,
        due: 0,
        total: 0
      },
      {
        name: "MAR",
        collected: 0,
        due: 0,
        total: 0
      },
      {
        name: "APR",
        collected: 0,
        due: 0,
        total: 0
      },
      {
        name: "MAY",
        collected: 0,
        due: 0,
        total: 0
      },
      {
        name: "JUN",
        collected: 0,
        due: 0,
        total: 0
      },
      {
        name: "JUL",
        collected: 0,
        due: 0,
        total: 0
      },
      {
        name: "AUG",
        collected: 0,
        due: 0,
        total: 0
      },
      {
        name: "SEP",
        collected: 0,
        due: 0,
        total: 0
      },
      {
        name: "OCT",
        collected: 0,
        due: 0,
        total: 0
      },
      {
        name: "NOV",
        collected: 0,
        due: 0,
        total: 0
      },
      {
        name: "DEC",
        collected: 0,
        due: 0,
        total: 0
      }
    ];

    let total = 0;
    this.props.rooms.forEach(room => {
      total = total + parseInt(room.rent) * parseInt(room.bedCount);
    });

    this.props.payments.forEach(payment => {
      data.forEach(obj => {
        if (obj.name === payment.targetMonth) {
          obj.collected = obj.collected + parseInt(payment.amount);
          obj.due = total - obj.collected;
          obj.total = total;
        }
      });
    });
    return (
      <div className="p-4 bg-info">
        <h6 className="text-left mr-5" ><strong>Payments Overview</strong></h6>
<div className="bg-light rounded" >
        <BarChart

          width={500}
          height={500}
          data={data}
          margin={{
            top: 70,
            right: 50,
            left: 50,
            bottom: 50
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="collected" stackId="a" fill="#8884d8" />
          <Bar dataKey="due" stackId="a" fill="#82ca9d" />
          <Bar dataKey="total" fill="#ffc658" />
        </BarChart>
        </div>
        </div>
    );
  }
}

export default connect(mapStateToProps)(PaymentsChart);
