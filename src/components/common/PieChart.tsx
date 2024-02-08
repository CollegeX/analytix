"use client";
import React from "react";
import {
  PieChart as PC,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Props {
  data: {
    name: string;
    values: Record<string, number>;
  };
}

const PieChart: React.FC<Props> = ({ data }) => {
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"]; // You can customize the colors as per your preference

  const pieData = Object.keys(data.values).map((key) => ({
    name: key,
    value: data.values[key],
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PC>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Legend />
      </PC>
    </ResponsiveContainer>
  );
};

export default PieChart;
