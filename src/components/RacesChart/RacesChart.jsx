import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import "./RacesChart.css";

const data = [
  { name: "Jan", listings: 12 },
  { name: "Feb", listings: 15 },
  { name: "Mar", listings: 10 },
  { name: "Apr", listings: 18 },
  { name: "May", listings: 14 },
  { name: "Jun", listings: 22 },
  { name: "Jul", listings: 19 },
  { name: "Aug", listings: 16 },
  { name: "Sep", listings: 13 },
];

const totalListings = data.reduce((sum, item) => sum + item.listings, 0);
const previousPeriodTotal = 150; // Fake previous total
const performanceChange =
  previousPeriodTotal > 0
    ? ((totalListings - previousPeriodTotal) / previousPeriodTotal) * 100
    : 0;

const RacesChart = () => {
  return (
    <div className="races-chart-card">
      <div className="chart-header">
        <h3 className="chart-title">Monthly Listings</h3>
        <span className="chart-timespan">This Year</span>
      </div>
      <div className="chart-summary">
        <div className="summary-metric">{totalListings}</div>
        <div
          className={`summary-change ${
            performanceChange < 0 ? "negative" : "positive"
          }`}
        >
          {performanceChange !== 0 ? (performanceChange < 0 ? "▼" : "▲") : ""}{" "}
          {Math.abs(performanceChange).toFixed(1)}%
        </div>
      </div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={150}>
          <BarChart
            data={data}
            margin={{ top: 5, right: 5, left: -25, bottom: 5 }}
            barCategoryGap="35%"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e0e0e0"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              fontSize={12}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              fontSize={12}
              dx={-10}
              allowDecimals={false}
            />
            <Tooltip
              cursor={{ fill: "rgba(0,0,0,0.05)" }}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              itemStyle={{ color: "#333" }}
              formatter={(value) => [value, "Listings"]}
            />
            <Bar dataKey="listings" fill="#d1d5db" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <rect
                  key={`cell-${index}`}
                  fill={entry.name === "Jun" ? "#8b5cf6" : "#d1d5db"}
                  x={entry.x}
                  y={entry.y}
                  width={entry.width}
                  height={entry.height}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RacesChart;
