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
        <div className="p-4 bg-info">
          <h6 className="text-left mr-5" ><strong>Occupancy Status</strong></h6>

          <div className="bg-light d-flex justify-content-center rounded" >
          <PieChart  s width={300} height={300}>
            <Pie
              data={data}
              cx={150}
              cy={150}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
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

           </div> 
      );
    }
  }

  export default connect(mapStateToProps)(OccupancyChart);


