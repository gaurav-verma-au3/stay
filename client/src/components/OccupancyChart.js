  import React, { Component } from "react";
  import { connect } from "react-redux";
  import { mapStateToProps } from "../store";
  import { PieChart, Pie, Cell } from "recharts";

  class OccupancyChart extends Component {
    render() {
      console.log(window.innerWidth)

      let bedCount = 0;
      this.props.rooms.forEach(room => {
        bedCount = bedCount + parseInt(room.bedCount);
      });
      let occupied = this.props.tenants.length;

      const data = [
        { name: "Occupied", value: occupied },
        { name: "Vaccant", value: bedCount - occupied }
      ];


      const COLORS = ["#00C49F", "#FF8042"];

      const RADIAN = Math.PI / 180;
      const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index
      }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        return (
          <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
          >
            {`${(percent * 100).toFixed(0)}%`}
          </text>
        );
      };

      return (
        <div>
          <div className="container-fluid d-flex align-items-center justify-content-center">
          <PieChart width={500} height={500}>
            <Pie
              data={data}
              cx={250}
              cy={250}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={200}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
              </Pie>

            </PieChart>
        </div>
              <h6 className="text-center"><strong>Occupancy Status</strong></h6>
           </div> 
      );
    }
  }

  export default connect(mapStateToProps)(OccupancyChart);


