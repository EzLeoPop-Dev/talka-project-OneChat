"use client";

import { useState, useMemo } from "react";

export default function ActivityLog() {
  const [expandedRow, setExpandedRow] = useState(null);

  // ---- FILTER STATE ----
  const [filterType, setFilterType] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [searchText, setSearchText] = useState("");

  const activityLogs = [
    {
      id: 1,
      type: "chat_incoming",
      actor: "Customer",
      target: "Support Team",
      timestamp: "2025-11-26T09:12:30.10",
      message: "Customer sent a new message",
      details: { channel: "Facebook", preview: "สวัสดีครับ ขอสอบถาม..." },
    },
    {
      id: 2,
      type: "chat_incoming",
      actor: "Customer",
      target: "Support Team",
      timestamp: "2025-11-26T09:13:02.55",
      message: "Customer sent a new message",
      details: { channel: "Line", preview: "สวัสดีครับ ขอสอบถาม..." },
    },
    {
      id: 3,
      type: "invite_user",
      actor: "Owner",
      target: "new_member@test.com",
      timestamp: "2025-11-26T11:45:22.99",
      message: "Invited new team member",
      details: { role: "Employer", method: "Email Invite" },
    },
    {
      id: 4,
      type: "tag_create",
      actor: "Admin A",
      target: "Tag: Hot Lead",
      timestamp: "2025-11-26T10:05:11.42",
      message: "Created new tag",
      details: { color: "red", category: "VIP" },
    },
    {
      id: 5,
      type: "chat_incoming",
      actor: "Customer",
      target: "Support Team",
      timestamp: "2025-11-26T11:22:10.11",
      message: "Customer sent a new message",
      details: { channel: "Facebook", preview: "สวัสดีครับ ขอสอบถาม..." },
    },
    {
      id: 6,
      type: "tag_add",
      actor: "Admin B",
      target: "User #5521",
      timestamp: "2025-11-26T11:22:10.11",
      message: "Added tag to user",
      details: { tag: "VIP", user: "Somchai" },
    },
    {
      id: 7,
      type: "invite_user",
      actor: "Owner",
      target: "new_member@test.com",
      timestamp: "2025-11-26T11:46:03.44",
      message: "Invited new team member",
      details: { role: "Employer", method: "Email Invite" },
    },
    {
      id: 8,
      type: "chat_incoming",
      actor: "Customer",
      target: "Support Team",
      timestamp: "2025-11-26T09:15:47.20",
      message: "Customer sent a new message",
      details: { channel: "Line", preview: "สวัสดีครับ ขอสอบถาม..." },
    },
  ];

  const typeLabel = {
    chat_incoming: "Chat Incoming",
    tag_create: "Create Tag",
    tag_add: "Add Tag",
    invite_user: "Invite User",
  };

  const typeColor = {
    chat_incoming: "text-sky-400",
    tag_create: "text-green-400",
    tag_add: "text-yellow-300",
    invite_user: "text-purple-300",
  };

  // ---- FILTER + SORT + SEARCH ----
  const filteredLogs = useMemo(() => {
    let logs = [...activityLogs];

    // 1) FILTER TYPE
    if (filterType !== "all") {
      logs = logs.filter((log) => log.type === filterType);
    }

    // 2) SEARCH (message, actor, target)
    if (searchText.trim() !== "") {
      logs = logs.filter((log) =>
        [log.message, log.actor, log.target]
          .join(" ")
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
    }

    // 3) SORT
    logs.sort((a, b) => {
      const timeA = new Date(a.timestamp).getTime();
      const timeB = new Date(b.timestamp).getTime();
      return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
    });

    return logs;
  }, [filterType, sortOrder, searchText]);

  return (
    <div className="w-full h-[94vh] p-2 md:p-4">
      <div className="bg-[rgba(32,41,59,0.25)] border border-[rgba(254,253,253,0.5)] backdrop-blur-xl rounded-3xl shadow-2xl pt-5 px-4 h-full flex flex-col">
        {/* FILTER BAR */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {/* FILTER TYPE */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white"
          >
            <option
              className="bg-[rgba(24,23,23,0.52)] backdrop-blur-xl"
              value="all"
            >
              All Activities
            </option>
            <option
              className="bg-[rgba(24,23,23,0.52)] backdrop-blur-xl"
              value="chat_incoming"
            >
              Chat Incoming
            </option>
            <option
              className="bg-[rgba(24,23,23,0.52)] backdrop-blur-xl"
              value="tag_create"
            >
              Create Tag
            </option>
            <option
              className="bg-[rgba(24,23,23,0.52)] backdrop-blur-xl"
              value="tag_add"
            >
              Add Tag
            </option>
            <option
              className="bg-[rgba(24,23,23,0.52)] backdrop-blur-xl"
              value="invite_user"
            >
              Invite User
            </option>
          </select>

          {/* SORT */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white"
          >
            <option
              className="bg-[rgba(24,23,23,0.52)] backdrop-blur-xl"
              value="newest"
            >
              Newest
            </option>
            <option
              className="bg-[rgba(24,23,23,0.52)] backdrop-blur-xl"
              value="oldest"
            >
              Oldest
            </option>
          </select>

          {/* SEARCH */}
          <input
            placeholder="Search activities..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white"
          />

          <button
            onClick={() => setSearchText("")}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white"
          >
            Refresh
          </button>
        </div>

        {/* LOG LIST */}
        <div className="space-y-3 overflow-auto">
          {filteredLogs.map((log) => (
            <div key={log.id}>
              <button
                onClick={() =>
                  setExpandedRow(expandedRow === log.id ? null : log.id)
                }
                className="w-full text-left px-4 py-3 rounded-lg bg-white/20 text-white"
              >
                <div className="flex justify-between">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-300">{log.timestamp}</p>

                    <p className={`text-sm font-bold ${typeColor[log.type]}`}>
                      {typeLabel[log.type]}
                    </p>

                    <p className="text-base">{log.message}</p>

                    <p className="text-sm text-gray-300">
                      {log.actor} → {log.target}
                    </p>
                  </div>

                  <span className="text-gray-400">
                    <i className="fa-solid fa-chevron-down"></i>
                  </span>
                </div>
              </button>

              {expandedRow === log.id && (
                <pre className="bg-black/40 p-4 mt-2 rounded-xl border border-gray-700 text-xs overflow-auto">
                  {JSON.stringify(log.details, null, 2)}
                </pre>
              )}
            </div>
          ))}

          {filteredLogs.length === 0 && (
            <p className="text-center text-gray-300 py-6">
              No activities found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
