"use client";
import { LineData } from "@/Data/LineData/LineData";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function LinePage({ compact = false }) {
  const containerHeight = compact ? "h-[350px]" : "h-[80vh]";

  return (
    <div
      className={`${
        compact ? "mt-0 md:ml-0" : "mt-25 md:ml-25"
      }  bg-white  sm:ml-0 p-4 rounded-2xl shadow-md w-[90%] mx-auto  ${containerHeight} flex flex-col`}
    >
      <h2 className="text-sm md:text-base font-semibold my-2 text-gray-800 text-center">
        Job Titles per Department
      </h2>

      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={LineData}
            margin={{ top: 5, right: 15, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10 }}
              interval={0}
              angle={-15}
              textAnchor="end"
            />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: "10px" }} />
            <Line
              type="monotone"
              dataKey="Frontend"
              stroke="#0072ff"
              strokeWidth={2}
              dot={{ r: 2 }}
            />
            <Line
              type="monotone"
              dataKey="Backend"
              stroke="#00c6a2"
              strokeWidth={2}
              dot={{ r: 2 }}
            />
            <Line
              type="monotone"
              dataKey="UIUX"
              stroke="#ff6f61"
              strokeWidth={2}
              dot={{ r: 2 }}
            />
            <Line
              type="monotone"
              dataKey="SAP"
              stroke="#a855f7"
              strokeWidth={2}
              dot={{ r: 2 }}
            />
            <Line
              type="monotone"
              dataKey="Analyst"
              stroke="#ec4899"
              strokeWidth={2}
              dot={{ r: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
