import * as React from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { colors, levelToColor } from "../tools/colors";

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
  level: number;
};

type ChartProps = {
  data: DataEntry[];
  setHighlight: any;
};

const InteractiveChart = ({ data, setHighlight }: ChartProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const handleMouseEnter = (data: any, index: any) => {
    setHighlight(index + 1);
    setActiveIndex(index);
  };

  const handleMouseLeave = (data: any, index: any) => {
    setHighlight(0);
    setActiveIndex(-1);
  };

  return (
    <Row className="justify-content-md-center">
      <ResponsiveContainer width="95%" height={250}>
        <BarChart
          data={data}
          barCategoryGap="2%"
          onMouseLeave={handleMouseLeave}
        >
          <XAxis
            dataKey="name"
            // label="height"
            axisLine={false}
            tickLine={false}
            // ticks={["3", "2", "1", 4, "5", "", "7"]}
          />
          <YAxis interval={1} allowDecimals={false} hide={true} />
          {/* <Tooltip /> */}
          <Bar dataKey="words" onMouseEnter={handleMouseEnter}>
            {data.map((entry, index) => {
              // console.log(entry)
              const color = levelToColor(entry.level);
              return (
                <Cell
                  cursor="pointer"
                  fill={index === activeIndex ? colors.active : color}
                  key={`cell-${index}`}
                ></Cell>
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Row>
  );
};

export default InteractiveChart;
