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
    Palette,
    Image as ImageIcon,
    Facebook,
    MessageSquare,
    Upload,
    Monitor,
    Sun,
    Moon
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

    // 🧠 ดึงผู้ใช้จาก localStorage
    const [userName, setUserName] = useState("Loading...");
    const [userRole, setUserRole] = useState("Employee");

    const [openUserMenu, setOpenUserMenu] = useState(false);

    // 🔔 Notification State
    const [showNotifications, setShowNotifications] = useState(false);

    // ---------------- Background modal state ----------------
    const [showBgModal, setShowBgModal] = useState(false);
    const [bgList, setBgList] = useState([]);
    const [selectedBg, setSelectedBg] = useState(null);

    const [showThemeModal, setShowThemeModal] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState("dark");

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


    const notifications = [
        {
            id: 1,
            name: "Supachai Phon",
            profile: "/images/profile1.jpg",
            platform: "Facebook",
            message: "สวัสดีครับ ขอสอบถามหน่อยครับ",
            time: "2 นาทีที่แล้ว",
            icon: "facebook",
        },
        {
            id: 2,
            name: "Nattawat",
            profile: "/images/profile2.jpg",
            platform: "Line",
            message: "พอจะมีสินค้าพร้อมส่งไหม?",
            time: "10 นาทีที่แล้ว",
            icon: "line",
        },
    ];

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("currentUser");
            if (storedUser) {
                const user = JSON.parse(storedUser);
                setUserName(user.username || "Unknown User");
                setUserRole(user.role || "Employee");
            } else {
                setUserName("Guest");
            }
        } catch (error) {
            console.error("Error reading user from localStorage:", error);
        }

        // load background list from localStorage (or set defaults)
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
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        router.push("/auth/login");
    };

    // Upload handler: convert to data URL and add to bgList & localStorage
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

    // Apply background: save to localStorage (Layout reads 'appBackground')
    const applyBackground = (bg) => {
        setSelectedBg(bg);
        localStorage.setItem("appBackground", bg);
        // Trigger event for Layout to update immediately
        window.dispatchEvent(new CustomEvent("background-changed", { detail: bg }));
        setShowBgModal(false);
    };

    return (
        <div className="flex p-3">
            <div
                className="relative w-[250px] h-[98vh] rounded-3xl pt-6 pr-1 overflow-hidden flex flex-col justify-between"
                style={{
                    background:
                        "linear-gradient(180deg, rgba(190, 126, 199, 0.5), rgba(139, 90, 158, 0.5))",
                    boxShadow: "0 64px 64px -32px rgba(41, 15, 0, 0.56)",
                }}
            >
                <div className="absolute inset-0 backdrop-blur-[160px] bg-white/5"></div>

                {/* Sidebar content */}
                <div className="relative z-10 flex px-6 flex-col flex-1 overflow-y-auto">

                    {/* 🔔 Header icons */}
                    <div className="flex items-center justify-between mb-5">

                        {/* Notification Bell */}
                        <button
                            onClick={() => setShowNotifications(true)}
                            className="relative p-2 rounded-xl hover:bg-white/10 transition text-white"
                            aria-label="Open notifications"
                        >
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                                <path d="M18.63 13A17.89 17.89 0 0 1 18 8" />
                                <path d="M6.26 6.26A5.94 5.94 0 0 0 6 8c0 7-3 9-3 9h18" />
                                <path d="M18 8a6 6 0 0 0-9.33-5" />
                            </svg>
                        </button>
                    </div>

                    {/* User Section */}
                    <div className="flex items-center justify-between gap-3 mb-8 relative">

                        <div className="flex items-center gap-3">
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                                style={{
                                    backgroundColor: stringToColor(userName),
                                }}
                            >
                                {getInitials(userName)}
                            </div>

                            <div>
                                <p className="text-xs text-white/60 uppercase tracking-wide">
                                    {userRole}
                                </p>
                                <p className="text-white font-medium">{userName}</p>
                            </div>
                        </div>

                        <button
                            onClick={() => setOpenUserMenu(!openUserMenu)}
                            className="text-white/80 hover:text-white px-2 py-1 rounded-lg"
                        >
                            •••
                        </button>

                        {openUserMenu && (
                            <div className="absolute top-14 right-0 w-48 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-lg p-2 space-y-1 z-30">
                                <Link href="/account/profile">
                                    <button className="w-full text-left px-3 py-2 text-white/80 hover:bg-white/10 hover:text-white rounded-lg text-sm">
                                        My Profile
                                    </button>
                                </Link>

                                <Link href="/account/password">
                                    <button className="w-full text-left px-3 py-2 text-white/80 hover:bg-white/10 hover:text-white rounded-lg text-sm">
                                        Change Password
                                    </button>
                                </Link>

                                <Link href="/account/notification">
                                    <button className="w-full text-left px-3 py-2 text-white/80 hover:bg-white/10 hover:text-white rounded-lg text-sm">
                                        Notification Settings
                                    </button>
                                </Link>

                                <hr className="border-white/20" />

                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-400/20 hover:text-red-300 rounded-lg text-sm"
                                >
                                    Logout
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
                                href="/dashboard"
                                icon={<LayoutDashboard size={20} />}
                                label="Dashboard"
                                pathname={pathname}
                            />

                            <p className="text-xs text-white/50 uppercase tracking-wider my-3">Admin Zone</p>

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

                {/* Workspace Selector */}
                <div className="relative z-20 p-3 space-y-4">

                    <div className="relative">

                        {/* TOP RIGHT ICON BUTTONS */}
                        <div className="flex items-center mb-2 gap-2 z-20">

                            {/* Change Theme (icon only for now) */}
                            <button
                                onClick={() => setShowThemeModal(true)}
                                className="p-2 rounded-md bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all hover:scale-110"
                                title="Change Theme"
                            >
                                <Palette size={18} />
                            </button>

                            {/* Change Background (opens modal to pick/upload background for entire dashboard) */}
                            <button
                                onClick={() => setShowBgModal(true)}
                                className="p-2 rounded-md bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all hover:scale-110"
                                title="Change Background"
                            >
                                <ImageIcon size={18} />
                            </button>

                        </div>

                        {/* WORKSPACE DROPDOWN */}
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
                                className={`transition-transform duration-300 ${isOpenWorkspace ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        {/* Dropdown list */}
                        <div
                            className={`absolute bottom-full mb-2 w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-white/40 transition-all duration-300 ${isOpenWorkspace
                                ? "max-h-60 opacity-100"
                                : "max-h-0 opacity-0"
                                }`}
                        >
                            {workspaces.map((ws) => (
                                <button
                                    key={ws}
                                    onClick={() => {
                                        setSelectedWorkspace(ws);
                                        setIsOpenWorkspace(false);
                                    }}
                                    className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${selectedWorkspace === ws
                                        ? "bg-purple-200/60 text-purple-900"
                                        : "text-gray-700 hover:bg-white/60"
                                        }`}
                                >
                                    {ws}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Logo */}
                    <div className="Logo flex items-center justify-center mt-4 gap-3 opacity-50">
                        <Image
                            src="/images/LogoSidebar.png"
                            alt="Picture of the author"
                            width={30}
                            height={30}
                        />
                        <h1 className="text-2xl font-bold cursor-default">T a l k a</h1>
                    </div>
                </div>
            </div>

            {/* 🔔 Notification Modal with animation */}
            <AnimatePresence>
                {showNotifications && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 flex items-center justify-center z-999"
                    >
                        <div
                            className="absolute inset-0 bg-black/50 backdrop-blur-md"
                            onClick={() => setShowNotifications(false)}
                        ></div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.7, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.7, y: 40 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="relative w-[500px] max-h-[70vh] bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-5 overflow-y-auto z-10"
                        >

                            <h2 className="text-xl text-white font-semibold mb-4 text-center">
                                Notifications
                            </h2>

                            <div className="space-y-3">
                                {notifications.map((n) => (
                                    <div
                                        key={n.id}
                                        className="w-full flex items-center gap-4 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition cursor-pointer"
                                    >
                                        <img
                                            src={n.profile}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />

                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <p className="text-white font-medium">
                                                    {n.name}
                                                </p>

                                                {n.icon === "facebook" && (
                                                    <Facebook size={16} className="text-blue-400" />
                                                )}
                                                {n.icon === "line" && (
                                                    <MessageSquare size={16} className="text-green-400" />
                                                )}
                                            </div>

                                            <p className="text-white/60 text-sm">
                                                {n.platform} • {n.time}
                                            </p>
                                            <p className="text-white/80 mt-1 text-sm line-clamp-1">
                                                {n.message}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => setShowNotifications(false)}
                                className="w-full mt-5 py-2 bg-white/20 text-white rounded-xl hover:bg-white/30 transition"
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ---------------- Background Modal ---------------- */}
            <AnimatePresence>
                {showBgModal && (
                    <motion.div
                        key="bg-modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 flex items-center justify-center z-1000"
                    >
                        <motion.div
                            onClick={() => setShowBgModal(false)}
                            className="absolute inset-0 bg-black/50 backdrop-blur-md"
                        />

                        <motion.div
                            key="bg-modal"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 140, damping: 18 }}
                            className="relative w-[680px] max-h-[80vh] bg-white/6 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-5 overflow-y-auto z-20"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-white">Choose Background</h3>
                                <button
                                    onClick={() => setShowBgModal(false)}
                                    className="text-white/70 hover:text-white p-2 rounded"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Grid of backgrounds */}
                            <div className="grid grid-cols-3 gap-4">
                                {bgList.map((bg, idx) => (
                                    <div
                                        key={idx}
                                        className={`relative rounded-xl overflow-hidden cursor-pointer border ${selectedBg === bg ? "border-white/60" : "border-white/10"
                                            }`}
                                    >
                                        <img
                                            src={bg}
                                            alt={`bg-${idx}`}
                                            className="w-full h-36 object-cover"
                                        />
                                        <div className="p-2 absolute left-2 bottom-2">
                                            <button
                                                onClick={() => applyBackground(bg)}
                                                className="bg-white/20 text-white px-3 py-1 rounded-md hover:bg-white/30 transition"
                                            >
                                                Apply
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Upload new */}
                            <div className="mt-5">
                                <label className="flex items-center gap-3 p-3 rounded-lg bg-white/8 border border-white/12 cursor-pointer hover:bg-white/12 transition">
                                    <Upload className="w-5 h-5" />
                                    <span className="text-white/80">Upload an image</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleUploadBg}
                                        className="hidden"
                                    />
                                </label>
                                <p className="text-xs text-white/60 mt-2">Uploaded images store in browser (local only).</p>
                            </div>

                            <div className="mt-5 flex justify-end">
                                <button
                                    onClick={() => setShowBgModal(false)}
                                    className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 transition text-white"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showThemeModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 flex items-center justify-center z-50 p-4"
                    >
                        <motion.div
                            onClick={() => setShowThemeModal(false)}
                            className="absolute inset-0 bg-black/50 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", stiffness: 140, damping: 18 }}
                            className="relative w-full max-w-[500px] bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl p-6 z-20"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-2xl font-bold text-white mb-6">Choose Your Theme</h3>

                            <div className="grid grid-cols-1 gap-4">
                                {themes.map((theme) => {
                                    const Icon = theme.icon;
                                    const isSelected = selectedTheme === theme.id;

                                    return (
                                        <motion.button
                                            key={theme.id}
                                            onClick={() => handleThemeChange(theme.id)}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`relative p-4 rounded-xl border-2 transition-all ${isSelected
                                                ? "border-blue-500 bg-blue-500/20 shadow-lg shadow-blue-500/30"
                                                : "border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30"
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`p-3 rounded-lg ${isSelected ? "bg-blue-500" : "bg-white/10"
                                                    }`}>
                                                    <Icon className="w-6 h-6 text-white" />
                                                </div>

                                                <div className="flex-1 text-left">
                                                    <h4 className="text-white font-semibold text-lg mb-2">
                                                        {theme.name}
                                                    </h4>
                                                    {theme.preview}
                                                </div>

                                                {isSelected && (
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className="absolute top-4 right-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                                                    >
                                                        <svg
                                                            className="w-4 h-4 text-white"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={3}
                                                                d="M5 13l4 4L19 7"
                                                            />
                                                        </svg>
                                                    </motion.div>
                                                )}
                                            </div>
                                        </motion.button>
                                    );
                                })}
                            </div>

                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    onClick={() => setShowThemeModal(false)}
                                    className="px-6 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 transition text-white font-medium"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}

/* Sidebar Link Component */
function SidebarLink({ href, icon, label, pathname }) {
    return (
        <Link
            href={href}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-300 ${pathname.startsWith(href)
                ? "bg-white/20 text-white"
                : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
        >
            {icon}
            <span className="text-sm font-medium">{label}</span>
        </Link>
    );
}

function DropdownMenu({ title, icon, links, isOpen, onToggle, pathname }) {
    return (
        <div>
            <button
                onClick={onToggle}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-300 ${isOpen
                    ? "bg-white/20 text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
            >
                {icon}
                <span className="text-sm font-medium">{title}</span>
                <ChevronDown
                    size={16}
                    className={`ml-auto transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>

            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-80 opacity-100 mt-1" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="ml-4 flex flex-col space-y-1">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors duration-300 ${pathname === link.href
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

/* Utils */
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
