"use client";

import React, { useState, useEffect, useRef } from "react";
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
    Palette,
    Image as ImageIcon,
    Facebook,
    MessageSquare,
    Upload,
    Monitor,
    Sun,
    Moon,
    Users,
    LogOut,
    Check,
    X
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const [openDropdown, setOpenDropdown] = useState(null);
    const [isOpenWorkspace, setIsOpenWorkspace] = useState(false);
    const [selectedWorkspace, setSelectedWorkspace] = useState("Work Space");
    const workspaces = ["Work Space", "Development", "Marketing", "Support Team"];

    // User State
    const [userName, setUserName] = useState("Loading...");
    const [userRole, setUserRole] = useState("Employee");
    const [userTeam, setUserTeam] = useState("No Team"); // ✅ State สำหรับเก็บชื่อทีม
    const [openUserMenu, setOpenUserMenu] = useState(false);

    // Notification State
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);

    // Background & Theme State
    const [showBgModal, setShowBgModal] = useState(false);
    const [bgList, setBgList] = useState([]);
    const [selectedBg, setSelectedBg] = useState(null);
    const [showThemeModal, setShowThemeModal] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState("dark");

    // --- Themes Data ---
    const themes = [
        {
            id: 'light',
            name: 'Light',
            icon: Sun,
            preview: (
                <div className="w-full h-24 rounded-lg bg-white border border-gray-200 p-3 flex flex-col gap-2">
                    <div className="flex gap-2">
                        <div className="w-8 h-2 bg-gray-300 rounded"></div>
                        <div className="w-8 h-2 bg-gray-300 rounded"></div>
                        <div className="w-8 h-2 bg-gray-300 rounded"></div>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-1/3 h-full bg-gray-100 rounded border border-gray-200"></div>
                        <div className="flex-1 flex flex-col gap-1">
                            <div className="h-2 bg-gray-200 rounded"></div>
                            <div className="h-2 bg-gray-200 rounded"></div>
                            <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'dark',
            name: 'Dark',
            icon: Moon,
            preview: (
                <div className="w-full h-24 rounded-lg bg-gray-900 border border-gray-700 p-3 flex flex-col gap-2">
                    <div className="flex gap-2">
                        <div className="w-8 h-2 bg-gray-700 rounded"></div>
                        <div className="w-8 h-2 bg-gray-700 rounded"></div>
                        <div className="w-8 h-2 bg-gray-700 rounded"></div>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-1/3 h-full bg-gray-800 rounded border border-gray-700"></div>
                        <div className="flex-1 flex flex-col gap-1">
                            <div className="h-2 bg-gray-700 rounded"></div>
                            <div className="h-2 bg-gray-700 rounded"></div>
                            <div className="h-2 bg-gray-700 rounded w-3/4"></div>
                        </div>
                    </div>
                </div>
            )
        },
    ];

    const handleThemeChange = (themeId) => {
        setSelectedTheme(themeId);
        window.dispatchEvent(
            new CustomEvent("theme-changed", { detail: themeId })
        );
    };

    const loadNotifications = () => {
        try {
            const savedData = localStorage.getItem("onechat_data");
            if (savedData) {
                const chats = JSON.parse(savedData);
                const newChats = chats.filter(chat => chat.status === "New Chat");

                const formattedNotifications = newChats.map(chat => ({
                    id: chat.id,
                    name: chat.name,
                    profile: chat.imgUrl,
                    platform: chat.channel,
                    message: chat.lastMessage || "มีข้อความใหม่",
                    time: chat.lastMessageTime || "ล่าสุด",
                    icon: chat.channel?.toLowerCase(),
                }));

                setNotifications(formattedNotifications);
            }
        } catch (error) {
            console.error("Error loading notifications:", error);
        }
    };

    // ✅ ฟังก์ชันโหลดข้อมูล User และค้นหา Team (แก้ไขใหม่)
    const loadUserData = () => {
        try {
            const storedUser = localStorage.getItem("currentUser");
            const storedTeams = localStorage.getItem("teams"); // 1. ดึงข้อมูลทีมจาก LocalStorage

            if (storedUser) {
                const user = JSON.parse(storedUser);
                const currentName = user.username || "Unknown User";

                setUserName(currentName);
                setUserRole(user.role || "Employee");

                // 2. Logic ค้นหาทีม
                let myTeamName = "No Team";
                if (storedTeams) {
                    try {
                        const teams = JSON.parse(storedTeams);
                        // หา Team ที่สมาชิก (members) มีชื่อของ user คนปัจจุบันอยู่
                        const foundTeam = teams.find(t =>
                            t.members && Array.isArray(t.members) && t.members.includes(currentName)
                        );

                        if (foundTeam) {
                            myTeamName = foundTeam.name;
                        }
                    } catch (e) {
                        console.error("Error parsing teams:", e);
                    }
                }
                setUserTeam(myTeamName); // อัปเดต State

            } else {
                setUserName("Guest");
                setUserTeam("No Team");
            }
        } catch (error) {
            console.error("Error reading user data:", error);
        }
    };

    useEffect(() => {
        loadUserData(); // โหลดครั้งแรก

        // โหลด Background
        const savedList = localStorage.getItem("backgroundList");
        if (savedList) {
            try {
                setBgList(JSON.parse(savedList));
            } catch {
                setBgList(["/images/Bg.jpg", "/images/Bg2.png", "/images/Bg3.jpg", "/images/Bg4.jpg"]);
            }
        } else {
            const defaults = ["/images/Bg.jpg", "/images/Bg2.png", "/images/Bg3.jpg", "/images/Bg4.jpg"];
            setBgList(defaults);
            localStorage.setItem("backgroundList", JSON.stringify(defaults));
        }

        const savedBg = localStorage.getItem("appBackground");
        if (savedBg) setSelectedBg(savedBg);

        loadNotifications();

        // Listen events
        const handleChatUpdate = () => loadNotifications();
        window.addEventListener("chat-data-updated", handleChatUpdate);

        // ✅ เพิ่ม Listener: ถ้ามีการ update user หรือ storage (เช่น สร้างทีมใหม่) ให้โหลดข้อมูลใหม่
        window.addEventListener("user_updated", loadUserData);
        window.addEventListener("storage", loadUserData);

        // Interval check (กันพลาด)
        const intervalId = setInterval(loadUserData, 2000);

        return () => {
            window.removeEventListener("chat-data-updated", handleChatUpdate);
            window.removeEventListener("user_updated", loadUserData);
            window.removeEventListener("storage", loadUserData);
            clearInterval(intervalId);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        router.push("/auth/login");
    };

    const handleUploadBg = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            const dataUrl = reader.result;
            const updated = [...bgList, dataUrl];
            setBgList(updated);
            localStorage.setItem("backgroundList", JSON.stringify(updated));
        };
        reader.readAsDataURL(file);
        e.target.value = "";
    };

    const applyBackground = (bg) => {
        setSelectedBg(bg);
        localStorage.setItem("appBackground", bg);
        window.dispatchEvent(new CustomEvent("background-changed", { detail: bg }));
        setShowBgModal(false);
    };

    // Close Dropdown Outside Click
    const notiRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (notiRef.current && !notiRef.current.contains(e.target)) setShowNotifications(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="flex p-3">
            <div
                className="relative w-[250px] h-[98vh] rounded-3xl pt-6 pr-1 overflow-hidden flex flex-col justify-between"
                style={{
                    background: "linear-gradient(180deg, rgba(190, 126, 199, 0.5), rgba(139, 90, 158, 0.5))",
                    boxShadow: "0 64px 64px -32px rgba(41, 15, 0, 0.56)",
                }}
            >
                <div className="absolute inset-0 backdrop-blur-[160px] bg-white/5"></div>

                {/* Sidebar content */}
                <div className="relative z-10 flex px-6 flex-col flex-1 overflow-y-auto custom-scrollbar">

                    {/* Header icons */}
                    <div className="flex items-center justify-between mb-5">
                        <button
                            onClick={() => setShowNotifications(true)}
                            className="relative p-2 rounded-xl hover:bg-white/10 transition text-white"
                            aria-label="Open notifications"
                        >
                            {notifications.length > 0 && (
                                <div className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] bg-red-500 rounded-full animate-pulse px-1">
                                    <span className="text-[10px] font-bold text-white">{notifications.length}</span>
                                </div>
                            )}
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                                <path d="M18.63 13A17.89 17.89 0 0 1 18 8" />
                                <path d="M6.26 6.26A5.94 5.94 0 0 0 6 8c0 7-3 9-3 9h18" />
                                <path d="M18 8a6 6 0 0 0-9.33-5" />
                            </svg>
                        </button>
                    </div>

                    {/* ✅ User Section (Updated Layout: Team under Name) */}
                    <div className="flex items-center justify-between gap-3 mb-8 relative">
                        <div className="flex items-center gap-3">
                            {/* Avatar */}
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg border-2 border-white/20 shadow-md shrink-0"
                                style={{ backgroundColor: stringToColor(userName) }}
                            >
                                {getInitials(userName)}
                            </div>

                            {/* Info Column */}
                            <div className="flex flex-col items-start gap-0.5">
                                {/* Role (Top) */}
                                <p className="text-[10px] text-white/50 uppercase tracking-wide leading-none">
                                    {userRole}
                                </p>

                                {/* Name (Middle) */}
                                <p className="text-white font-bold text-sm leading-tight truncate max-w-[100px]" title={userName}>
                                    {userName}
                                </p>

                                {/* Team (Bottom) - Moved here */}
                                <div className="flex items-center gap-1.5 text-[10px] text-white/80 bg-white/10 px-2 py-0.5 rounded mt-1 border border-white/5">
                                    <Users size={10} className="opacity-70" />
                                    <span className="truncate max-w-[80px] font-medium" title={userTeam}>{userTeam}</span>
                                </div>
                            </div>
                        </div>

                        {/* Options Button */}
                        <button
                            onClick={() => setOpenUserMenu(!openUserMenu)}
                            className="text-white/80 hover:text-white px-2 py-1 rounded-lg hover:bg-white/10 transition self-start mt-1"
                        >
                            •••
                        </button>

                        {/* Dropdown Menu */}
                        {openUserMenu && (
                            <div className="absolute top-14 right-0 w-48 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-lg p-2 space-y-1 z-30">
                                <Link href="/account/profile">
                                    <button className="w-full text-left px-3 py-2 text-white/80 hover:bg-white/10 hover:text-white rounded-lg text-sm">My Profile</button>
                                </Link>
                                <Link href="/account/password">
                                    <button className="w-full text-left px-3 py-2 text-white/80 hover:bg-white/10 hover:text-white rounded-lg text-sm">Change Password</button>
                                </Link>
                                <Link href="/account/notification">
                                    <button className="w-full text-left px-3 py-2 text-white/80 hover:bg-white/10 hover:text-white rounded-lg text-sm">Notification Settings</button>
                                </Link>
                                <hr className="border-white/20" />
                                <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-400/20 hover:text-red-300 rounded-lg text-sm flex items-center gap-2">
                                    <LogOut size={14} /> Logout
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Menu */}
                    <div className="mb-4">
                        <p className="text-xs text-white/50 uppercase tracking-wider mb-3">Main</p>
                        <nav className="space-y-1">

                            <SidebarLink
                                href="/overlay"
                                icon={<Grid3x3 size={20} />}
                                label="Overlay"
                                pathname={pathname}
                            />

                            <DropdownMenu
                                title="Chat"
                                icon={<MessageCircle size={20} />}
                                isOpen={openDropdown === "Chat"}
                                onToggle={() => setOpenDropdown(openDropdown === "Chat" ? null : "Chat")}
                                links={[
                                    { href: "/chat/allchat", label: "All Chat" },
                                    { href: "/chat/customchat", label: "Custom Chat" },
                                    { href: "/chat/facebook", label: "Facebook" },
                                    { href: "/chat/line", label: "Line" },
                                ]}
                                pathname={pathname}
                            />

                            <SidebarLink
                                href="/dashboard"
                                icon={<LayoutDashboard size={20} />}
                                label="Dashboard"
                                pathname={pathname}
                            />

                            <p className="text-xs text-white/50 uppercase tracking-wider my-3 pt-2 border-t border-white/10">Admin Zone</p>

                            <SidebarLink
                                href="/contact"
                                icon={<Contact size={20} />}
                                label="Contact"
                                pathname={pathname}
                            />

                            <SidebarLink
                                href="/ai-support"
                                icon={<Headphones size={20} />}
                                label="AI Agent"
                                pathname={pathname}
                            />

                            <DropdownMenu
                                title="Report"
                                icon={<Megaphone size={20} />}
                                isOpen={openDropdown === "Report"}
                                onToggle={() => setOpenDropdown(openDropdown === "Report" ? null : "Report")}
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
                                onToggle={() => setOpenDropdown(openDropdown === "Admin" ? null : "Admin")}
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

                {/* Workspace Selector (Bottom) */}
                <div className="relative z-20 p-3 space-y-4 bg-black/10 backdrop-blur-sm">
                    <div className="relative">
                        <div className="flex items-center justify-end mb-2 gap-2 z-20">
                            <button onClick={() => setShowThemeModal(true)} className="p-2 rounded-md bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all hover:scale-105" title="Change Theme"><Palette size={16} /></button>
                            <button onClick={() => setShowBgModal(true)} className="p-2 rounded-md bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all hover:scale-105" title="Change Background"><ImageIcon size={16} /></button>
                        </div>

                        <button
                            onClick={() => setIsOpenWorkspace(!isOpenWorkspace)}
                            className="w-full flex items-center justify-between gap-3 border border-[rgba(254,253,253,0.3)] bg-white/5 text-white px-3 py-2.5 rounded-xl shadow-sm transition-all hover:bg-white/10"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 flex items-center justify-center bg-red-600 rounded-lg shadow-md">
                                    <Building2 size={16} color="white" />
                                </div>
                                <span className="font-medium text-sm">{selectedWorkspace}</span>
                            </div>
                            <ChevronDown size={16} className={`transition-transform duration-300 ${isOpenWorkspace ? "rotate-180" : ""}`} />
                        </button>

                        <div className={`absolute bottom-full mb-2 w-full bg-[#1e1e2e] border border-white/10 rounded-xl shadow-xl overflow-hidden transition-all duration-300 ${isOpenWorkspace ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}>
                            {workspaces.map((ws) => (
                                <button
                                    key={ws}
                                    onClick={() => { setSelectedWorkspace(ws); setIsOpenWorkspace(false); }}
                                    className={`w-full text-left px-4 py-3 text-xs font-medium transition-colors border-b border-white/5 last:border-0 ${selectedWorkspace === ws ? "bg-purple-600 text-white" : "text-white/70 hover:bg-white/10"}`}
                                >
                                    {ws}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="Logo flex items-center justify-center mt-2 gap-2 opacity-40 hover:opacity-80 transition-opacity duration-300">
                        <Image src="/images/LogoSidebar.png" alt="Talka Logo" width={24} height={24} className="object-contain" />
                        <h1 className="text-lg font-bold cursor-default tracking-widest">T a l k a</h1>
                    </div>
                </div>
            </div>

            {/* Notification Modal */}
            <AnimatePresence>
                {showNotifications && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 flex items-center justify-center z-[9999]">
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowNotifications(false)}></div>
                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-[400px] max-h-[70vh] bg-[#1a1a2e] border border-white/10 rounded-2xl shadow-2xl p-5 overflow-y-auto z-10">
                            <h2 className="text-lg text-white font-semibold mb-4 text-center border-b border-white/10 pb-2">Notifications</h2>
                            <div className="space-y-2">
                                {notifications.map((n) => (
                                    <div
                                        key={n.id}
                                        // ✅ เพิ่ม onClick ให้กดแล้วไปหน้า Chat
                                        onClick={() => {
                                            router.push(`/chat/allchat?id=${n.id}`);
                                            setShowNotifications(false);
                                        }}
                                        className="w-full flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition cursor-pointer border border-white/5"
                                    >
                                        <img src={n.profile} className="w-10 h-10 rounded-full object-cover" />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <p className="text-white text-sm font-medium truncate">{n.name}</p>
                                                <span className="text-[10px] text-white/40">{n.time}</span>
                                            </div>
                                            <p className="text-white/60 text-xs line-clamp-2 mt-0.5">{n.message}</p>
                                            <div className="mt-1 flex items-center gap-1 text-[10px] text-white/40">
                                                <span>via {n.platform}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => setShowNotifications(false)} className="w-full mt-4 py-2 bg-white/10 text-white text-sm rounded-lg hover:bg-white/20 transition">Close</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background Modal */}
            <AnimatePresence>
                {showBgModal && (
                    <motion.div key="bg-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 flex items-center justify-center z-[9999]">
                        <motion.div onClick={() => setShowBgModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
                        <motion.div key="bg-modal" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-[600px] max-h-[80vh] bg-[#1e1e2e] border border-white/10 rounded-2xl shadow-2xl p-6 overflow-y-auto z-20" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-white">Choose Background</h3>
                                <button onClick={() => setShowBgModal(false)} className="text-white/50 hover:text-white"><X size={24} /></button>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                {bgList.map((bg, idx) => (
                                    <div key={idx} className={`relative rounded-xl overflow-hidden cursor-pointer border-2 aspect-video group ${selectedBg === bg ? "border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]" : "border-transparent hover:border-white/30"}`}>
                                        <img src={bg} alt={`bg-${idx}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button onClick={() => applyBackground(bg)} className="bg-white text-black px-3 py-1 rounded-full text-xs font-bold transform translate-y-2 group-hover:translate-y-0 transition-transform">Apply</button>
                                        </div>
                                        {selectedBg === bg && <div className="absolute top-2 right-2 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center"><Check size={12} color="white" /></div>}
                                    </div>
                                ))}
                                <label className="flex flex-col items-center justify-center gap-2 rounded-xl bg-white/5 border-2 border-dashed border-white/20 cursor-pointer hover:bg-white/10 transition hover:border-white/40 aspect-video">
                                    <Upload className="w-6 h-6 text-white/50" />
                                    <span className="text-xs text-white/50 font-medium">Upload Image</span>
                                    <input type="file" accept="image/*" onChange={handleUploadBg} className="hidden" />
                                </label>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Theme Modal */}
            <AnimatePresence>
                {showThemeModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
                        <motion.div onClick={() => setShowThemeModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
                        <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="relative w-full max-w-md bg-[#1e1e2e] border border-white/10 rounded-2xl shadow-2xl p-6 z-20" onClick={(e) => e.stopPropagation()}>
                            <h3 className="text-xl font-bold text-white mb-6">Choose Theme</h3>
                            <div className="space-y-3">
                                {themes.map((theme) => {
                                    const Icon = theme.icon;
                                    const isSelected = selectedTheme === theme.id;
                                    return (
                                        <button key={theme.id} onClick={() => handleThemeChange(theme.id)} className={`w-full relative p-4 rounded-xl border-2 transition-all text-left group flex items-center gap-4 ${isSelected ? "border-purple-500 bg-purple-500/10" : "border-white/10 bg-white/5 hover:bg-white/10"}`}>
                                            <div className={`p-2 rounded-lg ${isSelected ? "bg-purple-500 text-white" : "bg-white/10 text-white/50 group-hover:text-white"}`}><Icon size={20} /></div>
                                            <div>
                                                <h4 className={`font-semibold ${isSelected ? "text-white" : "text-white/70 group-hover:text-white"}`}>{theme.name}</h4>
                                                <p className="text-xs text-white/40">Switch to {theme.name.toLowerCase()} mode</p>
                                            </div>
                                            {isSelected && <div className="absolute top-1/2 -translate-y-1/2 right-4 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center"><Check size={12} color="white" /></div>}
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}

// --------------------------------------------------------
// ✅ Helper Components
// --------------------------------------------------------

function SidebarLink({ href, icon, label, pathname }) {
    const isActive = pathname.startsWith(href);
    return (
        <Link
            href={href}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${isActive
                ? "bg-white/20 text-white shadow-lg"
                : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
        >
            {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-purple-400 rounded-r-full shadow-[0_0_10px_#a855f7]"></div>}
            <div className={`transition-transform duration-200 ${isActive ? "scale-110 text-purple-200" : "group-hover:scale-110"}`}>
                {icon}
            </div>
            <span className="text-sm font-medium">{label}</span>
        </Link>
    );
}

function DropdownMenu({ title, icon, links, isOpen, onToggle, pathname }) {
    const isParentActive = links.some(link => pathname === link.href);

    return (
        <div>
            <button
                onClick={onToggle}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isOpen || isParentActive
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
            >
                <div className={`transition-transform duration-200 ${isOpen || isParentActive ? "scale-110 text-purple-300" : "group-hover:scale-110"}`}>
                    {icon}
                </div>
                <span className="text-sm font-medium">{title}</span>
                <ChevronDown
                    size={16}
                    className={`ml-auto transition-transform duration-300 opacity-50 ${isOpen ? "rotate-180 opacity-100" : ""
                        }`}
                />
            </button>

            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="ml-4 border-l border-white/10 pl-2 space-y-1 py-1">
                    {links.map((link) => {
                        const isLinkActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`block w-full text-left px-4 py-2 rounded-lg text-sm transition-all duration-200 ${isLinkActive
                                    ? "bg-white/15 text-white font-medium translate-x-1"
                                    : "text-white/60 hover:bg-white/5 hover:text-white hover:translate-x-1"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

// Utils
function getInitials(name) {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
}

function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = Math.floor(Math.abs(Math.sin(hash) * 16777215) % 16777215).toString(16);
    return `#${"0".repeat(6 - color.length) + color}`;
}