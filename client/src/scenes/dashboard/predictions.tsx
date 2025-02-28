import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery } from "@/state/api";
import { Box, Button, Typography, useTheme } from "@mui/material";
import React, { useMemo, useState } from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import regression, { DataPoint } from "regression";

type Props = {};

const Predictions = (props: Props) => {
  const { palette } = useTheme();

  // State to toggle the prediction line visibility
  const [isPredictions, setIsPredictions] = useState(false);

  // API call to fetch KPI data
  const { data: kpiData } = useGetKpisQuery();

  // Formatting the raw data to prepare it for rendering on the chart
  const formattedData = useMemo(() => {
    if (!kpiData) return [];

    const monthData = kpiData[0].monthlyData;

    // Prepare the data for regression analysis
    const formatted: Array<DataPoint> = monthData.map(
      ({ revenue }, i: number) => {
        return [i, revenue]; // Each data point: [index, revenue]
      }
    );

    // Perform regression calculation
    const regressionLine = regression.linear(formatted);

    // Map the data for the chart with actual, regression, and predicted values
    return monthData.map(({ month, revenue }, i: number) => {
      return {
        name: month,
        "Actual Revenue": revenue,
        "Regression Line": regressionLine.points[i][1],
        "Predicted Revenue": regressionLine.predict(i + 12)[1], // Predict revenue for the next year
      };
    });
  }, [kpiData]);

  return (
    <>
      {/* DashboardBox component wrapping the entire chart */}
      <DashboardBox gridArea="d">
        <ResponsiveContainer width="100%" height="100%">
          {/* LineChart for visualizing the revenue data */}
          <LineChart
            data={formattedData} // Use the formatted data for the chart
            margin={{
              top: 20,
              right: 75,
              left: 20,
              bottom: 80,
            }}
          >
            {/* Adding a grid to the background */}
            <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[800]} />

            {/* XAxis with months as the data key */}
            <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }}>
              {/* Label for XAxis */}
              <Label value="Month" offset={-5} position="insideBottom" />
              {/* Clickable label for toggling predictions */}
              <Label
                value="Click-Predictions"
                offset={-7}
                dx={150}
                position="insideBottom"
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  fill: "green", // Green color for the label
                  cursor: "pointer", // Make the label clickable
                }}
                onClick={() => setIsPredictions(!isPredictions)} // Toggle the predictions when clicked
                sx={{
                  color: palette.grey[900],
                  backgroundColor: palette.grey[700],
                  boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,.4)",
                }}
              />
            </XAxis>

            {/* YAxis for the revenue in USD */}
            <YAxis
              domain={[12000, 26000]} // Setting the domain for Y axis (Revenue range)
              axisLine={{ strokeWidth: "0" }} // Hides the axis line
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`} // Format Y axis labels as currency
            >
              {/* Label for YAxis */}
              <Label
                value="Revenue in USD"
                angle={-90} // Rotating the label to be vertical
                offset={-5}
                position="insideLeft"
              />
            </YAxis>

            {/* Tooltip for showing detailed information on hover */}
            <Tooltip />

            {/* Legend for the chart */}
            <Legend verticalAlign="top" />

            {/* Line representing actual revenue */}
            <Line
              type="monotone"
              dataKey="Actual Revenue"
              stroke={palette.primary.main}
              strokeWidth={0}
              dot={{ strokeWidth: 5 }} // Customizing the dot size
            />

            {/* Line representing regression line */}
            <Line
              type="monotone"
              dataKey="Regression Line"
              stroke="#8884d8" // Light purple color for regression line
              dot={false} // Disable dots for regression line
            />

            {/* Conditional rendering of predicted revenue line */}
            {isPredictions && (
              <Line
                strokeDasharray="5 5" // Dashed line for predicted revenue
                dataKey="Predicted Revenue"
                stroke={palette.secondary[500]} // Secondary color for predicted line
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Predictions;
