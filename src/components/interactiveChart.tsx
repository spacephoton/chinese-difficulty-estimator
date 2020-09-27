import * as React from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import {
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  Bar,
  Cell,
  ResponsiveContainer,
} from "recharts";

export type DataEntry = {
  name: string;
  words: number;
};

type ChartProps = {
  data: DataEntry[];
  setHighlight: any;
};
const InteractiveChart = ({ data, setHighlight }: ChartProps) => {
  const [allActive, setAllActive] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<Number>(0);

  const handleMouseOver = (data: any, index: any) => {
    setHighlight(index + 1);
    setActiveIndex(index);
    setAllActive(false);
  };

  const handleMouseOut = (data: any, index: any) => {
    setAllActive(true);
    setHighlight(0);
  };

  return (
    <Row className="justify-content-md-center">
      <ResponsiveContainer width="95%" height={250}>
        <BarChart data={data} barCategoryGap="2%">
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
                fill={
                  index === activeIndex || allActive ? "#2980b9" : "#bdc3c7"
                }
                key={`cell-${index}`}
              ></Cell>
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Row>
  );
};

export default InteractiveChart;
