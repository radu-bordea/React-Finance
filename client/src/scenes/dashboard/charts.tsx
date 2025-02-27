import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  Label,
  LineChart,
  CartesianGrid,
  Line,
  Legend,
  BarChart,
  Bar,
} from "recharts";

type Props = {};

const Charts = (props: Props) => {
  const { palette } = useTheme();

  // Fetching the KPI data from the API
  const { data } = useGetKpisQuery();

  // Memoized revenue data for the chart
  const revenue = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue }) => {
        return {
          name: month.substring(0, 3), // Extract first 3 letters of the month
          revenue: revenue,
        };
      })
    );
  }, [data]);

  // Memoized revenue and expenses data for the chart
  const revenueExpenses = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          expenses: expenses,
        };
      })
    );
  }, [data]);

  // Memoized revenue and profit data for the chart (Profit = Revenue - Expenses)
  const revenueProfit = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          profit: (revenue - expenses).toFixed(2), // Calculating profit with 2 decimals
        };
      })
    );
  }, [data]);

  // Logging data for debugging (can be removed in production)
  console.log("🚀 ~ Charts ~ data:", data);

  return (
    <>
      {/* AreaChart for displaying revenue and expenses */}
      <DashboardBox gridArea="a">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={revenueExpenses} // Data used in the chart (revenue & expenses)
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 30,
            }}
          >
            {/* Gradient definitions for the areas */}
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[200]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            {/* XAxis configuration */}
            <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }}>
              <Label
                value="Revenue (top), Expenses (bottom)"
                offset={-20}
                position="insideBottom"
                style={{ fontSize: "14px", fontWeight: "bold" }}
              />
            </XAxis>
            {/* YAxis configuration */}
            <YAxis
              tickLine={false}
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "10px" }}
              domain={[8000, 23000]} // Set the Y-axis domain for revenue and expenses
            />
            {/* Tooltip that displays data when hovering over the chart */}
            <Tooltip />
            {/* Area charts for revenue and expenses */}
            <Area
              type="monotone"
              dataKey="revenue"
              dot={true} // Show dots on data points
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorRevenue)" // Use the gradient for fill color
            />
            <Area
              type="monotone"
              dataKey="expenses"
              dot={true} // Show dots on data points
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorExpenses)" // Use the gradient for fill color
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>

      {/* LineChart for displaying revenue and profit */}
      <DashboardBox gridArea="b">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={revenueProfit} // Data used in the chart (revenue & profit)
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 0,
            }}
          >
            {/* Cartesian grid for the background */}
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            {/* XAxis configuration */}
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            {/* YAxis for profit */}
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            {/* YAxis for revenue on the right */}
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            {/* Tooltip that displays data when hovering over the chart */}
            <Tooltip />
            {/* Legend for the chart */}
            <Legend
              height={20}
              wrapperStyle={{
                margin: "0 0 10px 0",
              }}
            />
            {/* Line for profit */}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="profit"
              stroke={palette.tertiary[500]}
            />
            {/* Line for revenue */}
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      {/* BarChart for displaying revenue */}
      <DashboardBox gridArea="c">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={revenue} // Data used in the chart (revenue only)
            margin={{
              top: 17,
              right: 15,
              left: -5,
              bottom: 20,
            }}
          >
            {/* Gradient for the bar color */}
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            {/* Cartesian grid for the background */}
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            {/* XAxis configuration */}
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            >
              <Label
                value="Revenue by month"
                offset={-10}
                position="insideBottom"
                style={{ fontSize: "14px", fontWeight: "bold" }}
              />
            </XAxis>
            {/* YAxis configuration */}
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            {/* Tooltip that displays data when hovering over the chart */}
            <Tooltip />
            {/* Bar for revenue */}
            <Bar dataKey="revenue" fill="url(#colorRevenue)" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Charts;
