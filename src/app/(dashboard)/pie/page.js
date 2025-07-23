"use client";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Frontend Developer", value: 70 },
  { name: "Backend Developer", value: 40 },
  { name: "UI/UX Developer", value: 20 },
  { name: "SAP Consultant", value: 60 },
];

const COLORS = ["#00c6a2", "#0072ff", "#ffa600", "#ff6384"];

export default function PiePage() {
  return (
    <div className="mt-30 bg-white md:ml-25 sm:ml-0 p-4 rounded-2xl shadow-md md:w-[92%] sm:w-[70%] mx-auto  h-[70vh] flex flex-col">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
        Job Title Distribution
      </h2>

      <div className="flex-1  p-5">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              outerRadius="80%"
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
