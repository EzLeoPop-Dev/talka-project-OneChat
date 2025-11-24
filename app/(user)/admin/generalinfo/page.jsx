"use client";
import { useState } from "react";
import { Home } from "lucide-react";

export default function GeneralInfoPage() {
  const [timeout, setTimeoutValue] = useState(0);
  const [timezone, setTimezone] = useState("(GMT+07:00) Asia/Bangkok");

  return (
    <div className="w-full h-[94vh] p-2 md:p-4">
      {/* Overlay สำหรับทำให้สีเข้มขึ้นนิดหน่อย */}
      <div className="bg-[rgba(32,41,59,0.25)] border border-[rgba(254,253,253,0.5)] backdrop-blur-xl rounded-3xl shadow-2xl pt-5 px-4 h-full flex flex-col">
        {/* เนื้อหาหลัก */}
        <div className="relative max-w-3xl p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <Home className="text-white" size={48} />
            <div>
              <h1 className="text-xl font-semibold text-white">General Info</h1>
              <p className="text-sm text-white/70">
                Change general Workspace-level settings.
              </p>
            </div>
          </div>
        </div>

          <div className="border-t border-white/28 mx-7 mb-4"></div>
        
            {/* Workspace Name */}
        <div className="relative max-w-3xl p-8">
          <div className="flex flex-col gap-8 p-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Workspace Name
              </label>
              <input
                type="text"
                placeholder="My Workspace"
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
              />
            </div>

            {/* User Inactivity Timeout */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                User Inactivity Timeout
              </label>
              <input
                type="number"
                value={timeout}
                onChange={(e) => setTimeoutValue(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
              />
            </div>

            {/* Time Zone */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Time Zone
              </label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/40 cursor-pointer"
              >
                <option className="bg-[rgba(24,23,23,0.52)] backdrop-blur-xl">
                  (GMT+07:00) Asia/Bangkok
                </option>
                <option className="bg-[rgba(24,23,23,0.52)] backdrop-blur-xl">
                  (GMT+08:00) Singapore
                </option>
                <option className="bg-[rgba(24,23,23,0.52)] backdrop-blur-xl">
                  (GMT+09:00) Tokyo
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
