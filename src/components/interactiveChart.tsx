import * as React from "react";
import { useState } from "react";
import {
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  Bar,
  Cell,
} from "recharts";

export type DataEntry = {
  name: string;
  words: number;
};

type ChartProps = {
  data: DataEntry[];
};
const InteractiveChart = ({ data }: ChartProps) => {
  const [allActive, setAllActive] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<Number>(0);

  const handleMouseOver = (data: any, index: any) => {
    setActiveIndex(index);
    setAllActive(false);
  };

  const handleMouseOut = (data: any, index: any) => {
    setAllActive(true);
  };

  return (
    <>
      <p>interactive chart here</p>
      <BarChart width={730} height={250} data={data}>
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis
          dataKey="name"
          // label="height"
          axisLine={false}
          tickLine={false}
          // ticks={["3", "2", "1", 4, "5", "", "7"]}
        />
        <YAxis interval={1} allowDecimals={false} hide={true} />
        {/* <Tooltip /> */}
        <Bar
          dataKey="words"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          {data.map((entry, index) => (
            <Cell
              cursor="pointer"
              fill={index === activeIndex || allActive ? "#2980b9" : "#bdc3c7"}
              key={`cell-${index}`}
            ></Cell>
          ))}
        </Bar>
      </BarChart>
    </>
  );
};

export default InteractiveChart;
