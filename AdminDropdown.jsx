"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Settings,
  ChevronDown,
  Shield,
  Tag,
  Cpu,
  UserRound,
  Users2,
  FolderDot,
} from "lucide-react";

export default function AdminDropdown() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <div>
      {/* ปุ่มหลักของ Admin */}
      <button
        onClick={() =>
          setOpenDropdown(openDropdown === "admin" ? null : "admin")
        }
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-300 ${
          pathname.startsWith("/admin")
            ? "bg-white/20 text-white"
            : "text-white/80 hover:bg-white/10 hover:text-white"
        }`}
      >
        <Shield size={20} />
        <span className="text-sm font-medium">Admin Panel</span>
        <ChevronDown
          size={16}
          className={`ml-auto transition-transform duration-300 ${
            openDropdown === "admin" ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* ส่วน dropdown ที่เลื่อนลง */}
      
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          openDropdown === "admin"
            ? "max-h-60 opacity-100 mt-1"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="ml-4 flex flex-col space-y-1">
            <Link
            href="/admin/generalinfo"
            className={`w-full text-left px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors duration-300 ${
              pathname === "/admin/generalinfo"
                ? "bg-white/20 text-white"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Settings size={16} />
            General Info
          </Link>

          <Link
            href="/admin/channel"
            className={`w-full text-left px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors duration-300 ${
              pathname === "/admin/channel"
                ? "bg-white/20 text-white"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            <FolderDot size={16} />
            Channel
          </Link>

          <Link
            href="/admin/usersetting"
            className={`w-full text-left px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors duration-300 ${
              pathname === "/admin/usersetting"
                ? "bg-white/20 text-white"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            <UserRound size={16} />
            User Setting
          </Link>

          <Link
            href="/admin/teamsetting"
            className={`w-full text-left px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors duration-300 ${
              pathname === "/admin/teamsetting"
                ? "bg-white/20 text-white"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Users2 size={16} />
            Team Setting
          </Link>

          <Link
            href="/admin/tag"
            className={`w-full text-left px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors duration-300 ${
              pathname === "/admin/tag"
                ? "bg-white/20 text-white"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Tag size={16} />
            Tag Setting
          </Link>

          <Link
            href="/admin/aiprompt"
            className={`w-full text-left px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors duration-300 ${
              pathname === "/admin/aiprompt"
                ? "bg-white/20 text-white"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Cpu size={16} />
            AI Prompt
          </Link>
        </div>
      </div>
    </div>
  );
}
