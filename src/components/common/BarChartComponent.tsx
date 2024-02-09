"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: {
    name: string;
    values: Record<string, number>;
  };
}

const BarChartComponent: React.FC<Props> = ({ data }) => {
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];
  const barData = Object.keys(data.values).map((key) => ({
    name: key,
    value: data.values[key],
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={barData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />

        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
