import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend
} from "recharts";

type DataItem = {
  name: string;
  value: number;
};

const COLORS = ["#3182CE", "#38B2AC", "#ED8936", "#9F7AEA"];

const renderActiveShape = (props: any) => {
  const {
    cx, cy, innerRadius, outerRadius,
    startAngle, endAngle, fill, name, value,
  } = props;

  const hoverOuterRadius = outerRadius + 4; 

  return (
    <g>
      {/* Draw the highlighted pie sector with the correct color */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={hoverOuterRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />

      {/* Display name and value at center */}
      <text x={cx} y={cy - 8} textAnchor="middle" fill="#333" fontSize={16}>
        {name}
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" fill="#666" fontSize={14}>
        {value}
      </text>
    </g>
  );
};

const DynamicPieChart: React.FC = memo(() => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = async () => {
      try {
        const response = await axios.get<DataItem[]>("http://127.0.0.1:5000/requests/aggregate?field=user_agent");
        if (response.data && response.data.length > 0) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      }
    };

    fetchData();

    return () => {
      setData([]);
    }
  }, []);

  const onPieEnter = (_: any, index: number): void => {
    setActiveIndex(index);
  };

  return (
    <ResponsiveContainer height={250}>
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
          style={{ cursor: "pointer" } as React.CSSProperties}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="square"
          layout="horizontal"
          align="center"
          formatter={(value: string) => <span style={{ color: "#4A5568", fontSize: "12px" }}>{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
});

export default DynamicPieChart;
