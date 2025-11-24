"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
    Grid3x3,
    MessageCircle,
    Contact,
    Headphones,
    LayoutDashboard,
    Shield,
    ChevronDown,
    Megaphone,
    Building2,
    LogOut
} from "lucide-react";

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const [openDropdown, setOpenDropdown] = useState(null);
    const [isOpenWorkspace, setIsOpenWorkspace] = useState(false);
    const [selectedWorkspace, setSelectedWorkspace] = useState("Work Space");
    const workspaces = ["Work Space", "Development", "Marketing", "Support Team"];

    // 🧠 ดึงชื่อผู้ใช้และ role จาก currentUser (ไม่ใช้ selectedRole แล้ว)
    const [userName, setUserName] = useState("Loading...");
    const [userRole, setUserRole] = useState("Employee");

    const [dark, setDark] = useState(true);
    const [lang, setLang] = useState("en");

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("currentUser");
            if (storedUser) {
                const user = JSON.parse(storedUser);
                setUserName(user.username || "Unknown User");
                setUserRole(user.role || "Employee");
            } else {
                setUserName("Guest");
                setUserRole("Employee");
            }
        } catch (error) {
            console.error("Error reading user from localStorage:", error);
            setUserName("Guest");
            setUserRole("Employee");
        }
    }, []);

    // 🚪 ปุ่ม Logout
    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        router.push("/auth/login");
    };

    return (
        <div className="flex p-3">
            {/* Sidebar */}
            <div
                className="relative w-[250px] h-[98vh] rounded-3xl overflow-hidden flex flex-col justify-between"
                style={{
                    background: dark
                        ? "linear-gradient(180deg, rgba(190, 126, 199, 0.5), rgba(139, 90, 158, 0.5))"
                        : "linear-gradient(180deg, rgba(240,240,245,0.5), rgba(200,180,230,0.5))",
                    boxShadow: "0 64px 64px -32px rgba(41, 15, 0, 0.56)",
                }}
            >
                {/* Backdrop blur */}
                <div className="absolute inset-0 backdrop-blur-[160px] bg-white/5"></div>

                {/* Border gradient */}
                <div
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    style={{
                        background: "radial-gradient(circle at 50% 0%, #B86E9F, #662525)",
                        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                        padding: "1px",
                    }}
                ></div>

                {/* ---- Sidebar Content ---- */}
                <div className="relative z-10 p-6 flex flex-col flex-1 overflow-y-auto">
                    {/* Header dots */}
                    <div className="flex items-center gap-2 mb-5">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                    </div>

                    {/* ✅ User Profile */}
                    <div className="flex items-center gap-3 mb-8">
                        <div
                            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                            style={{
                                backgroundColor: stringToColor(userName),
                            }}
                        >
                            {getInitials(userName)}
                        </div>

                        <div>
                            <p className="text-xs text-white/60 uppercase tracking-wide">{userRole}</p>
                            <p className="text-white font-medium">{userName}</p>
                        </div>
                    </div>

                    {/* Menu */}
                    <div className="mb-4">
                        <p className="text-xs text-white/50 uppercase tracking-wider mb-3">Main</p>
                        <nav className="space-y-1">
                            <SidebarLink
                                href={"/overlay"}
                                icon={<Grid3x3 size={20} />}
                                label="Overlay"
                                pathname={pathname}
                            />

                            <DropdownMenu
                                title="All Chat"
                                icon={<MessageCircle size={20} />}
                                isOpen={openDropdown === "all-chat"}
                                onToggle={() =>
                                    setOpenDropdown(openDropdown === "all-chat" ? null : "all-chat")
                                }
                                links={[
                                    { href: "/chat/allchat", label: "All Chat" },
                                    { href: "/chat/facebook", label: "Facebook" },
                                    { href: "/chat/line", label: "Line" },
                                ]}
                                pathname={pathname}
                            />

                            <SidebarLink
                                href="/contact"
                                icon={<Contact size={20} />}
                                label="Contact"
                                pathname={pathname}
                            />
                            <SidebarLink
                                href="/ai-support"
                                icon={<Headphones size={20} />}
                                label="AI Support"
                                pathname={pathname}
                            />
                            <SidebarLink
                                href="/dashboard"
                                icon={<LayoutDashboard size={20} />}
                                label="Dashboard"
                                pathname={pathname}
                            />

                            <DropdownMenu
                                title="Report"
                                icon={<Megaphone size={20} />}
                                isOpen={openDropdown === "Report"}
                                onToggle={() =>
                                    setOpenDropdown(openDropdown === "Report" ? null : "Report")
                                }
                                links={[
                                    { href: "/Report/contacts", label: "Contact Report" },
                                    { href: "/Report/conversation", label: "Conversation Report" },
                                    { href: "/Report/message", label: "Message Report" },
                                    { href: "/Report/responses", label: "Responses Report" },
                                    { href: "/Report/users", label: "Users Report" },
                                    { href: "/Report/#", label: "Ai Token Report" },
                                ]}
                                pathname={pathname}
                            />

                            <DropdownMenu
                                title="Admin Panel"
                                icon={<Shield size={20} />}
                                isOpen={openDropdown === "Admin"}
                                onToggle={() =>
                                    setOpenDropdown(openDropdown === "Admin" ? null : "Admin")
                                }
                                links={[
                                    { href: "/admin/generalinfo", label: "General Info" },
                                    { href: "/admin/channel", label: "Connect Platform" },
                                    { href: "/admin/usersetting", label: "User Setting" },
                                    { href: "/admin/teamsetting", label: "Team Setting" },
                                    { href: "/admin/tag", label: "Tag Setting" },
                                    { href: "/admin/aiprompt", label: "AI Prompt" },
                                ]}
                                pathname={pathname}
                            />
                        </nav>
                    </div>
                </div>

                {/* ---- Workspace Selector + Logout ---- */}
                <div className="relative z-20 p-3 space-y-3">
                    <div className="relative">
                        <button
                            onClick={() => setIsOpenWorkspace(!isOpenWorkspace)}
                            className="w-full flex items-center justify-between gap-3 border border-[rgba(254,253,253,0.5)] backdrop-blur-xl text-white px-4 py-3 rounded-2xl shadow-md transition-all hover:bg-[rgba(32,41,59,0.25)]"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 flex items-center justify-center bg-red-600 rounded-xl">
                                    <Building2 size={20} color="white" />
                                </div>
                                <span className="font-medium text-sm">{selectedWorkspace}</span>
                            </div>
                            <ChevronDown
                                size={18}
                                className={`transition-transform duration-300 ${
                                    isOpenWorkspace ? "rotate-180" : ""
                                }`}
                            />
                        </button>

                        <div
                            className={`absolute bottom-full mb-2 w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-white/40 transition-all duration-300 ${
                                isOpenWorkspace ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                            }`}
                        >
                            {workspaces.map((ws) => (
                                <button
                                    key={ws}
                                    onClick={() => {
                                        setSelectedWorkspace(ws);
                                        setIsOpenWorkspace(false);
                                    }}
                                    className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${
                                        selectedWorkspace === ws
                                            ? "bg-purple-200/60 text-purple-900"
                                            : "text-gray-700 hover:bg-white/60"
                                    }`}
                                >
                                    {ws}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 bg-red-500/80 hover:bg-red-600 text-white px-4 py-3 rounded-2xl shadow-md transition-all"
                    >
                        <LogOut size={18} />
                        <span className="font-medium text-sm">Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

// 🔹 SidebarLink
function SidebarLink({ href, icon, label, pathname }) {
    return (
        <Link
            href={href}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-300 ${
                pathname.startsWith(href)
                    ? "bg-white/20 text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
            }`}
        >
            {icon}
            <span className="text-sm font-medium">{label}</span>
        </Link>
    );
}

// 🔹 DropdownMenu
function DropdownMenu({ title, icon, links, isOpen, onToggle, pathname }) {
    return (
        <div>
            <button
                onClick={onToggle}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-300 ${
                    isOpen
                        ? "bg-white/20 text-white"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
            >
                {icon}
                <span className="text-sm font-medium">{title}</span>
                <ChevronDown
                    size={16}
                    className={`ml-auto transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-80 opacity-100 mt-1" : "max-h-0 opacity-0"
                }`}
            >
                <div className="ml-4 flex flex-col space-y-1">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors duration-300 ${
                                pathname === link.href
                                    ? "bg-white/20 text-white"
                                    : "text-white/70 hover:bg-white/10 hover:text-white"
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

// 🔤 ฟังก์ชันสร้างตัวย่อชื่อ
function getInitials(name) {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
}

// 🎨 ฟังก์ชันสุ่มสีพื้นหลังจากชื่อ
function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = Math.floor(Math.abs(Math.sin(hash) * 16777215) % 16777215).toString(16);
    return `#${"0".repeat(6 - color.length) + color}`;
}
