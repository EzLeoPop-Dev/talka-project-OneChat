"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Home, Save } from "lucide-react";

export default function GeneralInfoPage() {
  const searchParams = useSearchParams();
  const workspaceId = searchParams.get("id");

  const [timeout, setTimeoutValue] = useState(0);
  const [timezone, setTimezone] = useState("(GMT+07:00) Asia/Bangkok");
  const [workspaceName, setWorkspaceName] = useState("");
  
  const [workspaces, setWorkspaces] = useState([]);
  const [currentWsId, setCurrentWsId] = useState(null);
  const [loading, setLoading] = useState(true);

  //โหลดข้อมูลเมื่อเปิดหน้า
  useEffect(() => {
    const storedWorkspaces = JSON.parse(localStorage.getItem("workspaces") || "[]");
    setWorkspaces(storedWorkspaces);

    if (storedWorkspaces.length > 0) {
      const targetWs = workspaceId 
        ? storedWorkspaces.find(ws => ws.id.toString() === workspaceId)
        : storedWorkspaces[0];

      if (targetWs) {
        setCurrentWsId(targetWs.id);
        setWorkspaceName(targetWs.name);

        // ดึงค่า Timeout และ Timezone เก่ามาแสดง (ถ้าเคยบันทึกไว้)
        if (targetWs.timeout !== undefined) setTimeoutValue(targetWs.timeout);
        if (targetWs.timezone !== undefined) setTimezone(targetWs.timezone);
      }
    }
    setLoading(false);
  }, [workspaceId]);

  // 2. ฟังก์ชันบันทึกข้อมูลทั้งหมดลง Local Storage
  const handleSave = () => {
    if (!currentWsId) return;

    const updatedWorkspaces = workspaces.map((ws) => 
      ws.id === currentWsId ? { 
        ...ws, 
        name: workspaceName, // บันทึกชื่อ
        timeout: timeout,    // บันทึก Timeout (เก็บค่าไว้เฉยๆ)
        timezone: timezone   // บันทึก Timezone (เก็บค่าไว้เฉยๆ)
      } : ws
    );

    localStorage.setItem("workspaces", JSON.stringify(updatedWorkspaces));
    setWorkspaces(updatedWorkspaces);
    alert("Saved successfully!");
  };

  if (loading) return <div className="p-10 text-white">Loading...</div>;

  return (
    <div className="w-full h-[94vh] p-2 md:p-4">
      <div className="bg-[rgba(32,41,59,0.37)] border border-[rgba(254,253,253,0.5)] backdrop-blur-xl rounded-3xl shadow-2xl pt-5 px-4 h-full flex flex-col">
        
        {/* Header */}
        <div className="relative max-w-3xl p-8 pb-0">
          <div className="flex items-center gap-3 mb-8 ">
            <Home className="text-white p-2 bg-white/5 rounded-xl border border-white/10" size={50}  />
            <div>
              <h1 className="text-xl font-semibold text-white">General Info</h1>
              <p className="text-sm text-white/70">
                Change general Workspace-level settings.
              </p>
            </div>
          </div>
        </div>

        

        <div className="border-t border-white/28 mx-7 mb-4"></div>
        
        {/* Form Content */}
        <div className="relative max-w-3xl p-8 pt-2">
          <div className="flex flex-col gap-8 p-6">
            
            {/* Workspace Name */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Workspace Name
              </label>
              <input
                type="text"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                placeholder="My Workspace"
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 border border-transparent transition-all"
              />
            </div>

            {/* User Inactivity Timeout */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                User Inactivity Timeout (Minutes)
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
                <option className="bg-[#1e1e24] text-white">
                  (GMT+07:00) Asia/Bangkok
                </option>
                <option className="bg-[#1e1e24] text-white">
                  (GMT+08:00) Singapore
                </option>
                <option className="bg-[#1e1e24] text-white">
                  (GMT+09:00) Tokyo
                </option>
              </select>
            </div>

            {/* Save Button Zone */}
            <div className="flex justify-end pt-4">
                <button 
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-[rgba(88,40,201,0.4)] hover:bg-[rgba(88,40,201,0.6)] text-white px-6 py-2.5 rounded-xl transition shadow-lg border border-white/10"
                >
                    <Save size={18} /> Save Changes
                </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}