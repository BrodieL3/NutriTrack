"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"

export function MacroChart() {
  const data = [
    { name: "Protein", value: 95, goal: 120, color: "#3b82f6" },
    { name: "Carbs", value: 160, goal: 200, color: "#22c55e" },
    { name: "Fat", value: 45, goal: 65, color: "#eab308" },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={40} outerRadius={80} paddingAngle={2} dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Legend
          layout="vertical"
          verticalAlign="middle"
          align="right"
          formatter={(value, entry, index) => {
            const item = data[index]
            return `${value}: ${item.value}g / ${item.goal}g`
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

