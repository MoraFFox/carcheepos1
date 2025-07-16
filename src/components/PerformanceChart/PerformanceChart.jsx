import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./PerformanceChart.css";

const data = [
  { name: "Jan", views: 4000, inquiries: 24 },
  { name: "Feb", views: 3000, inquiries: 18 },
  { name: "Mar", views: 2000, inquiries: 15 },
  { name: "Apr", views: 2780, inquiries: 20 },
  { name: "May", views: 1890, inquiries: 12 },
  { name: "Jun", views: 2390, inquiries: 25 },
  { name: "Jul", views: 3490, inquiries: 30 },
  { name: "Aug", views: 2800, inquiries: 22 },
  { name: "Sep", views: 3100, inquiries: 28 },
];

const totalViews = data.reduce((sum, item) => sum + item.views, 0);
const totalInquiries = data.reduce((sum, item) => sum + item.inquiries, 0);
const previousPeriodViews = 25000; // Fake previous total views
const performanceChange =
  previousPeriodViews > 0
    ? ((totalViews - previousPeriodViews) / previousPeriodViews) * 100
    : 0;

const PerformanceChart = () => {
  return (
    <div className="performance-chart-card">
      <div className="chart-header">
        <h3 className="chart-title">Listing Views & Inquiries</h3>
        <span className="chart-timespan">This Year</span>
      </div>
      <div className="chart-summary">
        <div className="summary-metric">{totalViews.toLocaleString()}</div>
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
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
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
              yAxisId="left"
              axisLine={false}
              tickLine={false}
              fontSize={12}
              dx={-10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              itemStyle={{ color: "#333" }}
              formatter={(value, name) => [
                value.toLocaleString(),
                name === "views" ? "Views" : "Inquiries",
              ]}
            />
            <Legend verticalAlign="top" height={36} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="views"
              name="Views"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="inquiries"
              name="Inquiries"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;
