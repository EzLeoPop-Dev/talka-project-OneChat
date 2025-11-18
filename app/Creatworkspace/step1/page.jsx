"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FloatingFirefly = ({ size = 6, color = "#fef08a", pathX = [-50, 50], pathY = [-30, 30], duration = 8, delay = 0 }) => {
    return (
        <motion.div
            className="absolute rounded-full"
            style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color,
                boxShadow: `0 0 ${size * 2}px ${color}`,
                opacity: 0.8,
            }}
            initial={{ x: pathX[0], y: pathY[0] }}
            animate={{ x: pathX, y: pathY }}
            transition={{ duration: duration, delay: delay, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
    );
};

export default function OrganizationStep1WithNavbar({ initialLang = "th" }) {
    const [employees, setEmployees] = useState("");
    const [dark, setDark] = useState(true);
    const [lang, setLang] = useState(initialLang);

    const options = [
        { value: "1-5", label: "1-5" },
        { value: "6-20", label: "6-20" },
        { value: "21-50", label: "21-50" },
        { value: "51-100", label: "51-100" },
        { value: "more-100", label: lang === "th" ? "มากกว่า 100" : "More 100" },
    ];

    return (
        <div className="relative min-h-screen flex justify-center items-center overflow-hidden">
            {/* Gradient Background */}
            <motion.div
                className="absolute inset-0 z-0"
                animate={{
                    background: dark
                        ? "linear-gradient(135deg, #0f0f14, #1a1a2e, #0f0f14)"
                        : "linear-gradient(135deg, #f0f0f5, #dcdcff, #f0f0f5)",
                    backgroundSize: "400% 400%",
                    backgroundPosition: ["0% 50%", "50% 100%", "100% 50%", "50% 0%", "0% 50%"],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            {/* Animated Circles */}
            <motion.div
                className="absolute w-[600px] h-[600px] bg-[rgba(184,110,159,0.69)] rounded-full filter blur-3xl opacity-40 z-0"
                initial={{ x: -480, y: -50 }}
                animate={{ x: [-480, 480, -480] }}
                transition={{ duration: 12, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
            />
            <motion.div
                className="absolute w-[500px] h-[500px] bg-[rgba(110,184,159,0.69)] rounded-full filter blur-3xl opacity-40 z-0"
                initial={{ x: 480, y: 100 }}
                animate={{ x: [480, -480, 480] }}
                transition={{ duration: 14, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
            />

            {/* Fireflies */}
            <FloatingFirefly size={6} color="#fef08a" pathX={[-200, 200]} pathY={[-50, 50]} duration={12} delay={0} />
            <FloatingFirefly size={5} color="#ffd700" pathX={[-150, 150]} pathY={[-30, 60]} duration={10} delay={2} />
            <FloatingFirefly size={7} color="#fffacd" pathX={[-180, 180]} pathY={[-40, 40]} duration={14} delay={1} />

            {/* Navbar */}
            <div className="absolute top-6 right-6 flex items-center gap-3 z-20">
                {/* Dark Mode */}
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setDark(!dark)}
                    className="px-3 py-2 rounded-md bg-gray-600 text-white flex items-center gap-2 overflow-hidden relative"
                >
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={dark ? "light" : "dark"}
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="flex items-center gap-2"
                        >
                            {dark ? "🌞" : "🌙"} {dark ? (lang === "th" ? "สว่าง" : "Light") : lang === "th" ? "มืด" : "Dark"}
                        </motion.span>
                    </AnimatePresence>
                </motion.button>

                {/* Language */}
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setLang(lang === "th" ? "en" : "th")}
                    className="px-3 py-2 rounded-md bg-purple-600 text-white overflow-hidden relative"
                >
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={lang}
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            {lang === "th" ? "ไทย" : "EN"}
                        </motion.span>
                    </AnimatePresence>
                </motion.button>
            </div>

            {/* Main Card */}
            <motion.div
                key={dark}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={`relative z-10 w-full max-w-3xl p-10 rounded-2xl border flex flex-col items-center gap-6 ${dark ? "bg-[#0f0f14]/90 text-white border-[#262626]" : "bg-white/90 text-black border-gray-300"
                    }`}
            >
                <h1 className="text-center text-2xl font-semibold mb-6">{lang === "th" ? "สร้างองค์กรของคุณ" : "Create your organization"}</h1>

                <div className="w-full flex flex-col gap-4">
                    <div>
                        <label className="text-sm">{lang === "th" ? "ชื่อองค์กร" : "Organization name"}</label>
                        <input
                            type="text"
                            placeholder={lang === "th" ? "ชื่อโปรเจค" : "Project name"}
                            className={`w-full mt-1 rounded-md px-4 py-2 outline-none focus:border-gray-500 transition-colors duration-500 ${dark ? "bg-[#19191f] border border-[#2a2a2f] text-white" : "bg-white border border-gray-300 text-black"
                                }`}
                        />
                    </div>
                    <div>
                        <label className="text-sm">{lang === "th" ? "เว็บไซต์" : "Website"}</label>
                        <input
                            type="text"
                            placeholder={lang === "th" ? "เว็บไซต์โปรเจค" : "Project website"}
                            className={`w-full mt-1 rounded-md px-4 py-2 outline-none focus:border-gray-500 transition-colors duration-500 ${dark ? "bg-[#19191f] border border-[#2a2a2f] text-white" : "bg-white border border-gray-300 text-black"
                                }`}
                        />
                    </div>
                    <div>
                        <p className="text-sm">{lang === "th" ? "มีพนักงานกี่คนในองค์กรของคุณ?" : "How many people work at your organization?"}</p>
                        <div className="flex flex-col gap-2 mt-1">
                            {options.map((opt) => (
                                <label key={opt.value} className="flex items-center gap-3 text-sm">
                                    <input
                                        type="radio"
                                        name="employees"
                                        value={opt.value}
                                        checked={employees === opt.value}
                                        onChange={(e) => setEmployees(e.target.value)}
                                        className="h-4 w-4"
                                    />
                                    {opt.label}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-between w-full mt-6 text-sm text-gray-400">
                    <span>{lang === "th" ? "ขั้นตอน 1 จาก 2" : "Step 1 of 2"}</span>
                    <div className="flex gap-4">
                        <a href="/tutorail">
                            <button className="px-6 py-2 rounded-md bg-[#8f5ca0] text-white hover:opacity-80 transition">{lang === "th" ? "ข้าม" : "Skip"}</button>
                        </a>
                        <a href="/Creatworkspace/step2">
                            <button className="px-6 py-2 rounded-md bg-[#8f5ca0] text-white hover:opacity-80 transition">{lang === "th" ? "ถัดไป" : "Next"}</button>
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
