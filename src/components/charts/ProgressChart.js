import React from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

export default function ProgressChart({ name, value, fill = "#8884d8" }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadialBarChart
        cx="50%"
        cy="50%"
        innerRadius="70%"
        outerRadius="100%"
        barSize={20}
        data={[{ name, value, fill }]}
      >
        <PolarAngleAxis
          type="number"
          domain={[0, 100]}
          angleAxisId={0}
          tick={false}
        />
        <RadialBar minAngle={15} background clockWise dataKey="value" />
        <Legend
          iconSize={10}
          layout="horizontal"
          align="center"
          formatter={(value, entry) => `${entry.payload.value}% - ${value}`}
        />
        <Tooltip />
      </RadialBarChart>
    </ResponsiveContainer>
  );
}
