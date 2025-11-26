"use client";
import { useState, useRef, useEffect } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BarChart3, Coins, TrendingUp, Calendar } from "lucide-react";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const mockData = [
  { day: "dec 27", tokens: 3200 },
  { day: "dec 28", tokens: 5000 },
  { day: "dec 29", tokens: 4100 },
  { day: "dec 30", tokens: 8000 },
  { day: "dec 31", tokens: 6200 },
];

export default function AiToken() {
  const [range, setRange] = useState([
    {
      startDate: new Date("2025-12-27"),
      endDate: new Date("2025-12-31"),
      key: "selection",
    },
  ]);

  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const chartFontSize = "12px";

  return (
    <>
      <div className="w-full h-full p-2 md:p-4">
        <div
          className="bg-[rgba(32,41,59,0.25)]
          border border-[rgba(254,253,253,0.5)]
          backdrop-blur-xl rounded-3xl shadow-2xl
          pt-7 px-6 h-full flex flex-col text-white"
        >
          {/* Calendar Selector */}
          <div className="relative mb-6" ref={calendarRef}>
            <button
              onClick={() => setShowCalendar((s) => !s)}
              className="flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-xl backdrop-blur-sm"
            >
              <Calendar size={16} />
              {format(range[0].startDate, "MMM dd, yyyy")} -{" "}
              {format(range[0].endDate, "MMM dd, yyyy")}
            </button>

            {showCalendar && (
              <div className="absolute top-12 z-30">
                <div className="transform scale-90 origin-top-left bg-white rounded-xl shadow-xl">
                  <DateRange
                    editableDateInputs
                    onChange={(item) => setRange([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={range}
                  />

                  <button
                    onClick={() => setShowCalendar(false)}
                    className="w-full bg-purple-500 py-2 text-white rounded-b-xl"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/10 rounded-2xl p-4 border border-white/20 flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <Coins className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm opacity-80">Total Tokens</p>
                <p className="text-xl font-bold">145,300</p>
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-4 border border-white/20 flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm opacity-80">Tokens Today</p>
                <p className="text-xl font-bold">6,720</p>
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-4 border border-white/20 flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm opacity-80">Estimated Cost</p>
                <p className="text-xl font-bold">$12.45</p>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white/10 rounded-2xl p-4 border border-white/20 mb-6 h-[32vh]">
            <p className="mb-2 opacity-80">Token Usage</p>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={mockData}>
                <XAxis
                  dataKey="day"
                  stroke="#fff"
                  style={{ fontSize: chartFontSize }}
                />
                <YAxis stroke="#fff" style={{ fontSize: chartFontSize }} />
                <Tooltip
                  contentStyle={{
                    background: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(8px)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                  labelStyle={{ fontSize: chartFontSize, color: "#fff" }}
                  itemStyle={{ fontSize: chartFontSize, color: "#fff" }}
                  formatter={(value) => [
                    `${value.toLocaleString()} tokens`,
                    "Tokens",
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="tokens"
                  stroke="#fff"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Breakdown Table */}
          <div className="bg-white/10 rounded-2xl p-4 border border-white/20 h-fit overflow-auto">
            <p className="mb-4 opacity-80">Usage Breakdown</p>

            <table className="w-full text-sm">
              <thead className="opacity-70">
                <tr className="text-left border-b border-white/20">
                  <th className="py-2">Feature</th>
                  <th className="py-2">Tokens</th>
                  <th className="py-2">Cost</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-3">Support Agent</td>
                  <td>32,500</td>
                  <td>$2.44</td>
                </tr>

                <tr className="border-b border-white/10">
                  <td className="py-3">Receptionist</td>
                  <td>50,100</td>
                  <td>$4.08</td>
                </tr>

                <tr>
                  <td className="py-3">Sales Agent</td>
                  <td>62,700</td>
                  <td>$5.93</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
