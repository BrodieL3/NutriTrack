"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

interface MacroChartProps {
  protein: number;
  carbs: number;
  fat: number;
}

export function MacroChart({ protein, carbs, fat }: MacroChartProps) {
  const data = [
    { name: "Protein", value: protein, goal: 120, color: "#3b82f6" },
    { name: "Carbs", value: carbs, goal: 200, color: "#22c55e" },
    { name: "Fat", value: fat, goal: 65, color: "#eab308" },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Legend
          layout="vertical"
          verticalAlign="middle"
          align="right"
          formatter={(value, entry, index) => {
            const item = data[index];
            return `${value}: ${item.value}g / ${item.goal}g`;
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
