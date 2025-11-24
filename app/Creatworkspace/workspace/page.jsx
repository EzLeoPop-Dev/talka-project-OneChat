"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, Plus, Bell, User, Check, X, MessageSquare, Settings, ChevronDown, Globe, Users, Briefcase, Save, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const employeeOptions = [
    { value: "1-5", label: "1-5" },
    { value: "6-20", label: "6-20" },
    { value: "21-50", label: "21-50" },
    { value: "51-100", label: "51-100" },
    { value: "more-100", label: "More than 100" },
];

const industries = [
    { name: "Technology", desc: "Business related to software, hardware, and IT services", icon: "💻" },
    { name: "Retail", desc: "Stores and businesses selling products directly to consumers", icon: "🏪" },
    { name: "E-Commerce", desc: "Online shops and platforms selling products or services", icon: "🛒" },
    { name: "Finance", desc: "Banking, insurance, investment, and financial services", icon: "🏦" },
    { name: "Food & Beverage", desc: "Restaurants, cafes, and businesses producing or selling food and drinks", icon: "🍲" },
    { name: "Healthcare", desc: "Hospitals, clinics, medical services, and medical equipment", icon: "❤️" },
    { name: "Education", desc: "Schools, tutoring centers, and education-related services", icon: "🏫" },
    { name: "Real Estate", desc: "Buying, selling, renting, or managing properties and buildings", icon: "🏢" },
    { name: "Logistics", desc: "Transportation, delivery, and warehouse management services", icon: "📦" },
    { name: "Manufacturing", desc: "Factories and businesses that produce goods or components", icon: "🏭" },
    { name: "Entertainment", desc: "Media, content creation, production studios, gaming, and creative work", icon: "🎬" },
    { name: "Travel & Hospitality", desc: "Hotels, tourism, and travel related services", icon: "🏨" },
    { name: "Beauty & Wellness", desc: "Salons, spas, beauty clinics, and self-care products", icon: "💧" },
    { name: "Professional Services", desc: "Consulting, legal, marketing, HR, and other expert services", icon: "⚖️" },
    { name: "Other", desc: "Other industries not listed", icon: "❓" },
];

const roles = [
    { name: "Owner", desc: "The highest-level user with full control.", icon: "👑" },
    { name: "Admin", desc: "A system administrator who can manage users.", icon: "🛠️" },
    { name: "Employee", desc: "A regular user who can send and receive messages.", icon: "💼" }
];

const DEFAULT_INVITES = [
    { id: 1, name: "Jose", action: "invite to workspace", avatarColor: "bg-blue-400" },
];

const FloatingFirefly = ({ size = 6, color = "#fef08a", pathX = [-50, 50], pathY = [-30, 30], duration = 8, delay = 0 }) => {
    return (
        <motion.div
            className="absolute rounded-full"
            style={{ width: `${size}px`, height: `${size}px`, backgroundColor: color, boxShadow: `0 0 ${size * 2}px ${color}`, opacity: 0.8 }}
            initial={{ x: pathX[0], y: pathY[0] }}
            animate={{ x: pathX, y: pathY }}
            transition={{ duration: duration, delay: delay, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
    );
};

const getRoleStyle = (role) => {
    switch (role?.toLowerCase()) {
        case "owner":
            return "bg-purple-500/20 text-purple-300 border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]";
        case "admin":
            return "bg-blue-500/20 text-blue-300 border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]";
        case "employee":
            return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]";
        default:
            return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
};

export default function WorkspaceDashboard({ initialLang = "th" }) {
    const router = useRouter();
    
    const [dark, setDark] = useState(true);
    const [lang, setLang] = useState(initialLang);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortType, setSortType] = useState("Newest");
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [isNotiOpen, setIsNotiOpen] = useState(false);

    const [currentUser, setCurrentUser] = useState(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const [isWizardOpen, setIsWizardOpen] = useState(false);
    const [wizardStep, setWizardStep] = useState(1);
    const [formData, setFormData] = useState({ name: "", website: "", employees: "", industry: null, role: null });

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editData, setEditData] = useState({ id: null, name: "", industry: "" });

    const [isLoaded, setIsLoaded] = useState(false);

    const [workspaces, setWorkspaces] = useState([]);


    const [invites, setInvites] = useState([]);

    
    useEffect(() => {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
            const userObj = JSON.parse(storedUser);
            setCurrentUser(userObj);

            const processedKey = `processedInvites_${userObj.username}`;
            const processedIds = JSON.parse(localStorage.getItem(processedKey) || "[]");
            
        
            const availableInvites = DEFAULT_INVITES.filter(inv => !processedIds.includes(inv.id));
            setInvites(availableInvites);

        } else {
            router.push("/auth/login");
            return;
        }

     
        const savedWorkspaces = localStorage.getItem("workspaces");
        if (savedWorkspaces) {
            try {
                setWorkspaces(JSON.parse(savedWorkspaces));
            } catch (error) {
                console.error("Failed to load workspaces:", error);
            }
        }
        setIsLoaded(true); 

        const justRegistered = localStorage.getItem("justRegistered");
        if (justRegistered === "true") {
            setIsWizardOpen(true);
            setTimeout(() => {
                localStorage.removeItem("justRegistered");
            }, 1000);
        }
    }, [router]);

    
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("workspaces", JSON.stringify(workspaces));
        }
    }, [workspaces, isLoaded]);

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        router.push("/auth/login");
    };

    const processedWorkspaces = useMemo(() => {
        let result = workspaces.filter((ws) => 
            ws.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      
            (ws.owner === currentUser?.username || !ws.owner)
        );
        return result.sort((a, b) => {
            if (sortType === "A-Z") return a.name.localeCompare(b.name);
            if (sortType === "Z-A") return b.name.localeCompare(a.name);
            return b.timestamp - a.timestamp;
        });
    }, [workspaces, searchQuery, sortType, currentUser]);

    
    const handleOpenWizard = () => {
        setFormData({ name: "", website: "", employees: "", industry: null, role: null });
        setWizardStep(1);
        setIsWizardOpen(true);
    };

    const handleWizardComplete = () => {
        const newWs = {
            id: Date.now(),
            name: formData.name,
            role: formData.role || "Owner",
            industry: formData.industry || "Other",
            members: 1,
            timestamp: Date.now(),
            owner: currentUser?.username 
        };
        setWorkspaces([newWs, ...workspaces]);
        setIsWizardOpen(false);
    };

    const handleOpenEdit = (ws) => {
        setEditData({ id: ws.id, name: ws.name, industry: ws.industry });
        setIsEditOpen(true);
    };

    const handleSaveEdit = (e) => {
        e.preventDefault();
        setWorkspaces(workspaces.map(ws => 
            ws.id === editData.id ? { ...ws, name: editData.name, industry: editData.industry } : ws
        ));
        setIsEditOpen(false);
    };

    const handleInvite = (id, accept) => {
        if (accept) {
            const invite = invites.find(i => i.id === id);
        
            const newWs = {
                id: Date.now(), 
                name: `${invite.name}'s Space`, 
                role: "Admin", 
                industry: "General", 
                members: 5, 
                timestamp: Date.now(),
                owner: currentUser?.username 
            };
            setWorkspaces([newWs, ...workspaces]);
        }
        
     
        setInvites(invites.filter(i => i.id !== id));

       
        if (currentUser) {
            const processedKey = `processedInvites_${currentUser.username}`;
            const processedIds = JSON.parse(localStorage.getItem(processedKey) || "[]");
            if (!processedIds.includes(id)) {
                processedIds.push(id);
                localStorage.setItem(processedKey, JSON.stringify(processedIds));
            }
        }
    };

    // Close dropdowns
    const notiRef = useRef(null);
    const sortRef = useRef(null);
    const profileRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (notiRef.current && !notiRef.current.contains(e.target)) setIsNotiOpen(false);
            if (sortRef.current && !sortRef.current.contains(e.target)) setIsSortOpen(false);
            if (profileRef.current && !profileRef.current.contains(e.target)) setIsProfileOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const themeColorClass = "bg-[rgba(190,126,199,0.56)]";
    const themeHoverClass = "hover:bg-[rgba(190,126,199,0.7)]";

    return (
        <div className={`relative min-h-screen flex flex-col overflow-hidden transition-colors duration-500 ${dark ? "text-white" : "text-gray-800"}`}>
            
           
            <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.div className="absolute inset-0" animate={{ background: dark ? "linear-gradient(135deg, #0f0f14, #1a1a2e, #0f0f14)" : "linear-gradient(135deg, #f0f0f5, #eef2ff, #f0f0f5)", backgroundSize: "400% 400%", backgroundPosition: ["0% 50%", "50% 100%", "100% 50%", "50% 0%", "0% 50%"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
                <motion.div className="absolute w-[600px] h-[600px] bg-[rgba(184,110,159,0.4)] rounded-full filter blur-3xl opacity-40" initial={{ x: -480, y: -50 }} animate={{ x: [-480, 480, -480] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
                <FloatingFirefly size={6} color="#fef08a" pathX={[-200, 200]} pathY={[-50, 50]} duration={12} />
            </div>

           
            <header className='max-w-[1400px] w-full mx-auto mt-3 bg-[rgba(32,41,59,0.25)] backdrop-blur-2xl border-[rgba(255,255,255,0.30)] border px-6 md:px-10 py-2 rounded-[40px] relative z-40'>
                <nav className='flex justify-between items-center'>
                    
                    {/* LOGO SECTION */}
                    <div className="logo flex justify-between items-center gap-3">
                        <Image
                            src="/images/LogoNav.png"
                            width={50}
                            height={50}
                            alt="Talka Logo"
                            className="object-contain"
                        />
                        <p className={`text-xl font-semibold ${dark ? "text-white" : "text-gray-800"}`}>Talka</p>
                    </div>

                    {/* OPTIONS SECTION */}
                    <div className="flex items-center gap-4">
                        <button onClick={() => setDark(!dark)} className="p-2 rounded-full hover:bg-white/10 transition">{dark ? "🌞" : "🌙"}</button>
                        <button onClick={() => setLang(lang === "th" ? "en" : "th")} className="text-sm font-bold hover:text-purple-400 transition">{lang === "th" ? "TH" : "EN"}</button>
                        <div className="h-6 w-[1px] bg-white/20 mx-1"></div>
                        
                        {/* Notification */}
                        <div className="relative" ref={notiRef}>
                            <button onClick={() => setIsNotiOpen(!isNotiOpen)} className={`relative p-2 rounded-full transition ${isNotiOpen ? "bg-white/20" : "hover:bg-white/10"}`}>
                                <Bell size={20} />
                                {invites.length > 0 && <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#0f0f14]"></span>}
                            </button>
                            <AnimatePresence>
                                {isNotiOpen && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className={`absolute right-0 mt-3 w-80 rounded-2xl shadow-2xl border backdrop-blur-xl p-2 z-50 ${dark ? "bg-[#1a1a2e]/95 border-white/10" : "bg-white/95 border-gray-200"}`}>
                                            {invites.length === 0 ? <div className="p-4 text-center opacity-50 text-sm">No new notifications</div> : invites.map((invite) => (
                                                <div key={invite.id} className={`mb-2 p-3 rounded-xl flex items-center gap-3 ${dark ? "bg-white/5" : "bg-gray-50"}`}>
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${invite.avatarColor}`}>{invite.name[0]}</div>
                                                    <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{invite.name}</p><p className="text-[10px] opacity-60">{invite.action}</p></div>
                                                    <div className="flex gap-1">
                                                        <button onClick={() => handleInvite(invite.id, true)} className="p-1.5 bg-green-500/10 text-green-500 rounded"><Check size={14} /></button>
                                                        <button onClick={() => handleInvite(invite.id, false)} className="p-1.5 bg-red-500/10 text-red-500 rounded"><X size={14} /></button>
                                                    </div>
                                                </div>
                                            ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Profile Dropdown */}
                        <div className="relative" ref={profileRef}>
                            <button 
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-3 px-2 py-1 rounded-full hover:bg-white/10 transition"
                            >
                            
                                <div className="text-right hidden md:block">
                                    <p className="text-sm font-bold">{currentUser?.username || "Guest"}</p>
                                </div>
                                
                                <div className={`w-9 h-9 rounded-full ${themeColorClass} flex items-center justify-center border border-[rgba(255,255,255,0.30)] shadow-lg`}>
                                    <span className="text-white font-bold text-lg">
                                        {currentUser?.username ? currentUser.username[0].toUpperCase() : "G"}
                                    </span>
                                </div>
                                <ChevronDown size={14} className={`opacity-50 transition-transform ${isProfileOpen ? "rotate-180" : ""}`}/>
                            </button>

                                {/* Dropdown Menu */}
                                <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                                        className={`absolute right-0 mt-3 w-48 rounded-xl shadow-2xl border backdrop-blur-xl py-2 z-50 ${dark ? "bg-[#1a1a2e]/95 border-white/10" : "bg-white/95 border-gray-200"}`}
                                    >
                                        <div className="px-4 py-3 border-b border-white/10 mb-2">
                                            <p className="text-sm font-bold truncate">{currentUser?.username}</p>
                                            <p className="text-xs opacity-50 truncate">Signed in successfully</p>
                                        </div>
                                        <button 
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-sm hover:bg-red-500/10 text-red-400 flex items-center gap-2"
                                        >
                                            <LogOut size={16} /> Log Out
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main className="relative z-10 flex-1 max-w-6xl mx-auto w-full p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <h1 className="text-2xl font-bold tracking-wider uppercase text-white/90 drop-shadow-md">
                        {lang === "th" ? "พื้นที่ทำงานของคุณ" : "YOUR WORKSPACES"}
                    </h1>
                    
                    <div className="flex gap-3">
                        <div className={`flex items-center px-3 py-2.5 rounded-xl border border-white/10 ${dark ? "bg-black/20" : "bg-white/40"}`}>
                            <Search size={18} className="opacity-50 mr-2" />
                            <input type="text" placeholder={lang === "th" ? "ค้นหา..." : "Search..."} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent outline-none text-sm w-40 md:w-60" />
                        </div>
                        <div className="relative" ref={sortRef}>
                            <button onClick={() => setIsSortOpen(!isSortOpen)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 transition ${dark ? "bg-black/20 hover:bg-white/5" : "bg-white/40 hover:bg-white/60"}`}>
                                <SlidersHorizontal size={18} className="opacity-70" />
                                <span className="text-sm font-medium min-w-[60px] text-left">{sortType}</span>
                                <ChevronDown size={14} className={`opacity-50 transition ${isSortOpen ? "rotate-180" : ""}`} />
                            </button>
                            <AnimatePresence>{isSortOpen && (
                                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className={`absolute right-0 top-full mt-2 w-40 py-1 rounded-xl shadow-xl border border-white/10 z-30 overflow-hidden ${dark ? "bg-[#1a1a2e]" : "bg-white"}`}>
                                    {["Newest", "A-Z", "Z-A"].map((type) => (
                                        <button key={type} onClick={() => { setSortType(type); setIsSortOpen(false); }} className={`block w-full text-left px-4 py-2.5 text-sm transition ${sortType === type ? `bg-[rgba(190,126,199,0.2)] text-purple-300` : "hover:bg-white/5"}`}>{type}</button>
                                    ))}
                                </motion.div>
                            )}</AnimatePresence>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {/* Create Button */}
                    <motion.button whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }} whileTap={{ scale: 0.98 }} onClick={handleOpenWizard} className={`h-48 rounded-2xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center gap-3 transition-colors group ${dark ? "hover:border-white/40" : "hover:border-gray-400"}`}>
                        <div className="p-4 rounded-full bg-white/5 group-hover:scale-110 transition-transform"><Plus size={28} className="opacity-70" /></div>
                        <span className="text-sm font-medium opacity-70">{lang === "th" ? "สร้างใหม่" : "Create New"}</span>
                    </motion.button>

                    {/* Workspace Cards */}
                    <AnimatePresence mode="popLayout">
                        {processedWorkspaces.map((ws) => (
                            <motion.div key={ws.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className={`h-48 rounded-2xl p-5 flex flex-col justify-between border border-white/5 shadow-lg backdrop-blur-sm relative overflow-hidden group ${dark ? "bg-[#1e1e24]/80 hover:bg-[#25252d]" : "bg-white/60 hover:bg-white/80"}`}>
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-bl-full pointer-events-none"></div>
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <button 
                                            onClick={() => handleOpenEdit(ws)} 
                                            className="p-1.5 -ml-2 rounded-lg hover:bg-white/10 text-white/40 hover:text-white/90 transition z-20"
                                            title="Edit Workspace"
                                        >
                                            <Settings size={16} />
                                        </button>
                                        
                                        <span className={`text-[10px] px-2.5 py-1 rounded-full border font-bold tracking-wide uppercase ${getRoleStyle(ws.role)}`}>
                                            {ws.role}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-xl truncate leading-tight pr-2">{ws.name}</h3>
                                    <div className="flex items-center gap-2 mt-2 opacity-50 text-xs">
                                        <span className="flex items-center gap-1"><Users size={10} /> {ws.members}</span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1"><Briefcase size={10} /> {ws.industry || "General"}</span>
                                    </div>
                                </div>
                                <Link href="/chat/allchat">
                                    <button className={`w-full py-2.5 rounded-xl bg-white/5 ${themeHoverClass} hover:text-white text-sm font-medium transition border border-white/5`}>{lang === "th" ? "เข้าสู่พื้นที่" : "Open Space"}</button>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </main>

            {/* WIZARD MODAL */}
            <AnimatePresence>
                {isWizardOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsWizardOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                        
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 20 }} 
                            animate={{ scale: 1, opacity: 1, y: 0 }} 
                            exit={{ scale: 0.95, opacity: 0, y: 10 }}
                            className={`relative w-full max-w-4xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col max-h-[90vh] ${dark ? "bg-[#13131a] text-white" : "bg-white text-black"}`}
                        >
                            <div className="h-2 bg-gray-700 w-full">
                                <motion.div
                                    className="h-full rounded-full"
                                    animate={{ width: `${(wizardStep / 3) * 100}%` }}
                                    style={{
                                        background: "linear-gradient(140deg, rgb(93, 61, 153) 0%, rgb(201, 117, 173) 100%)",
                                    }}
                                />
                            </div>

                            <div className="p-8 overflow-y-auto custom-scrollbar">
                                <AnimatePresence mode="wait">
                                    {wizardStep === 1 && (
                                        <motion.div key="step1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} transition={{ duration: 0.2 }}>
                                            <h2 className="text-2xl font-bold text-center mb-6">{lang === "th" ? "สร้างองค์กรของคุณ" : "Create your organization"}</h2>
                                            <div className="flex flex-col gap-4 max-w-lg mx-auto">
                                                <div><label className="text-sm opacity-70 mb-1 block">{lang === "th" ? "ชื่อองค์กร" : "Organization name"}</label><div className={`flex items-center px-4 py-2 rounded-lg border ${dark ? "bg-black/20 border-white/10" : "bg-gray-50 border-gray-300"}`}><MessageSquare size={16} className="opacity-50 mr-3" /><input autoFocus type="text" placeholder="Project Name" className="bg-transparent w-full outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></div></div>
                                                <div><label className="text-sm opacity-70 mb-1 block">{lang === "th" ? "เว็บไซต์" : "Website"}</label><div className={`flex items-center px-4 py-2 rounded-lg border ${dark ? "bg-black/20 border-white/10" : "bg-gray-50 border-gray-300"}`}><Globe size={16} className="opacity-50 mr-3" /><input type="text" placeholder="www.example.com" className="bg-transparent w-full outline-none" value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} /></div></div>
                                                <div><label className="text-sm opacity-70 mb-2 block">{lang === "th" ? "พนักงานกี่คน?" : "Employee Count?"}</label><div className="grid grid-cols-3 gap-2">{employeeOptions.map((opt) => (<label key={opt.value} className={`cursor-pointer border rounded-lg p-2 text-center text-xs transition ${formData.employees === opt.value ? "bg-[rgba(190,126,199,0.56)] border-[rgba(255,255,255,0.30)] text-white" : "border-white/10 hover:bg-white/5"}`}><input type="radio" name="employees" value={opt.value} className="hidden" checked={formData.employees === opt.value} onChange={(e) => setFormData({...formData, employees: e.target.value})} />{opt.label}</label>))}</div></div>
                                            </div>
                                        </motion.div>
                                    )}
                                    {wizardStep === 2 && (
                                        <motion.div key="step2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} transition={{ duration: 0.2 }}>
                                            <h2 className="text-2xl font-bold text-center mb-6">{lang === "th" ? "เลือกประเภทธุรกิจ" : "Select Industry"}</h2>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">{industries.map((ind) => (<div key={ind.name} onClick={() => setFormData({...formData, industry: ind.name})} className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col items-center text-center gap-2 ${formData.industry === ind.name ? "bg-[rgba(190,126,199,0.56)] border-[rgba(255,255,255,0.30)] text-white transform scale-105" : "border-white/10 hover:bg-white/5"}`}><div className="text-3xl">{ind.icon}</div><div className="font-bold text-sm">{ind.name}</div><div className="text-[10px] opacity-60 leading-relaxed">{ind.desc}</div></div>))}</div>
                                        </motion.div>
                                    )}
                                    {wizardStep === 3 && (
                                        <motion.div key="step3" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} transition={{ duration: 0.2 }}>
                                            <h2 className="text-2xl font-bold text-center mb-6">{lang === "th" ? "เลือกบทบาทของคุณ" : "Select Your Role"}</h2>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{roles.map((role) => (<div key={role.name} onClick={() => setFormData({...formData, role: role.name})} className={`p-6 rounded-xl border cursor-pointer transition-all flex flex-col items-center text-center gap-3 ${formData.role === role.name ? "bg-[rgba(190,126,199,0.56)] border-transparent text-white transform scale-105 shadow-xl" : "border-white/10 hover:bg-white/5"}`}><div className="text-4xl">{role.icon}</div><div className="font-bold text-lg">{role.name}</div><div className="text-xs opacity-70 leading-relaxed">{role.desc}</div></div>))}</div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className={`p-6 border-t flex justify-between items-center ${dark ? "border-white/10 bg-[#0f0f14]" : "border-gray-200 bg-gray-50"}`}>
                                <span className="text-xs opacity-50">{lang === "th" ? `ขั้นตอน ${wizardStep} จาก 3` : `Step ${wizardStep} of 3`}</span>
                                <div className="flex gap-3">
                                    {wizardStep > 1 ? (
                                        <button onClick={() => setWizardStep(wizardStep - 1)} className="px-5 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition">{lang === "th" ? "ย้อนกลับ" : "Back"}</button>
                                    ) : (
                                        <button onClick={() => setIsWizardOpen(false)} className="px-5 py-2 rounded-lg text-sm font-medium hover:bg-red-500/10 text-red-400 transition">{lang === "th" ? "ยกเลิก" : "Cancel"}</button>
                                    )}
                                    {wizardStep < 3 ? (
                                        <button onClick={() => setWizardStep(wizardStep + 1)} disabled={wizardStep === 1 && !formData.name} className={`px-6 py-2 rounded-lg ${themeColorClass} border border-[rgba(255,255,255,0.30)] text-white text-sm font-medium transition ${wizardStep === 1 && !formData.name ? "opacity-50 cursor-not-allowed" : themeHoverClass}`}>{lang === "th" ? "ถัดไป" : "Next"}</button>
                                    ) : (
                                        <button onClick={handleWizardComplete} disabled={!formData.role} className={`px-6 py-2 rounded-lg ${themeColorClass} border border-[rgba(255,255,255,0.30)] text-white text-sm font-bold transition transform ${!formData.role ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`}>{lang === "th" ? "เสร็จสิ้น" : "Complete"}</button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* EDIT MODAL */}
            <AnimatePresence>
                {isEditOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsEditOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 10 }} className={`relative w-full max-w-md p-6 rounded-2xl shadow-2xl border border-white/10 ${dark ? "bg-[#1a1a2e]" : "bg-white"}`}>
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Settings size={20}/> {lang === "th" ? "แก้ไขพื้นที่ทำงาน" : "Edit Workspace"}</h3>
                            <form onSubmit={handleSaveEdit} className="flex flex-col gap-4">
                                <div><label className="text-xs opacity-60 uppercase font-bold tracking-wider mb-1 block">Workspace Name</label><input type="text" value={editData.name} onChange={(e) => setEditData({...editData, name: e.target.value})} className={`w-full p-3 rounded-lg outline-none border transition-all ${dark ? "bg-black/30 border-white/10 focus:border-purple-500 text-white" : "bg-gray-50 border-gray-200 text-black"}`} /></div>
                                <div><label className="text-xs opacity-60 uppercase font-bold tracking-wider mb-1 block">Industry</label><select value={editData.industry || "Other"} onChange={(e) => setEditData({...editData, industry: e.target.value})} className={`w-full p-3 rounded-lg outline-none border transition-all appearance-none cursor-pointer ${dark ? "bg-black/30 border-white/10 focus:border-purple-500 text-white" : "bg-gray-50 border-gray-200 text-black"}`}>{industries.map(ind => (<option key={ind.name} value={ind.name} className={dark ? "bg-[#1a1a2e]" : "bg-white"}>{ind.name}</option>))}</select></div>
                                <div className="flex justify-end gap-3 mt-4"><button type="button" onClick={() => setIsEditOpen(false)} className="px-4 py-2 rounded-lg text-sm font-medium opacity-60 hover:opacity-100 transition">Cancel</button><button type="submit" className={`px-6 py-2 rounded-lg ${themeColorClass} border border-[rgba(255,255,255,0.30)] ${themeHoverClass} text-white text-sm font-bold shadow-lg transition flex items-center gap-2`}><Save size={16}/> Save Changes</button></div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}