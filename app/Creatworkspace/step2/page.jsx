"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    { name: "Travel & Hospitality", desc: "Transportation, delivery, and warehouse management services", icon: "🏨" },
    { name: "Beauty & Wellness", desc: "Salons, spas, beauty clinics, and self-care products/services", icon: "💧" },
    { name: "Professional Services", desc: "Consulting, legal, marketing, HR, and other expert services", icon: "⚖️" },
    { name: "Other", desc: "Other industries not listed", icon: "❓" },
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

export default function IndustryStepNoNavbar({ initialLang = "th" }) {
    const [dark, setDark] = useState(true);
    const [lang, setLang] = useState(initialLang);
    const [selected, setSelected] = useState(null);

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

            {/* Top Right Buttons */}
            <div className="absolute top-6 right-6 flex items-center gap-3 z-20">
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
                className={`relative z-10 w-full max-w-5xl p-10 rounded-2xl border flex flex-col items-center gap-6 ${dark ? "bg-[#0f0f14]/90 text-white border-[#262626]" : "bg-white/90 text-black border-gray-300"
                    }`}
            >
                <h1 className="text-center text-2xl font-semibold mb-8">
                    {lang === "th" ? "สร้างองค์กรของคุณ" : "Create your organization"}
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8 w-full">
                    {industries.map((industry) => (
                        <motion.div
                            key={industry.name}
                            onClick={() => setSelected(industry.name)}
                            className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${selected === industry.name
                                ? "bg-[#8f5ca0] border-[rgba(255,255,255,0.30)] text-white"
                                : dark
                                    ? "bg-[#19191f] border-[#2a2a2f] text-gray-300 hover:bg-[#26262e]"
                                    : "bg-white border-gray-300 text-black hover:bg-gray-200"
                                }`}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <div className="text-3xl mb-2">{industry.icon}</div>
                            <div className="font-semibold">{industry.name}</div>
                            <div className="text-xs mt-1">{industry.desc}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer: Step left, Buttons right */}
                <div className="flex justify-between items-center mt-4 text-sm text-gray-400 w-full">
                    <span>{lang === "th" ? "ขั้นตอน 2 จาก 2" : "Step 2 of 2"}</span>
                    <div className="flex gap-4">
                        <a href="/Creatworkspace/step1">
                            <button className="px-6 py-2 rounded-md bg-gray-600 text-white hover:opacity-80 transition">
                                {lang === "th" ? "กลับ" : "Back"}
                            </button>
                        </a>
                        <a href="/tutorail">
                            <button
                                disabled={!selected}
                                className={`px-6 py-2 rounded-md text-white transition ${selected ? "bg-[#8f5ca0] hover:opacity-80 cursor-pointer" : "bg-[#8f5ca0] cursor-not-allowed"
                                    }`}
                            >
                                {lang === "th" ? "เสร็จสิ้น" : "Complete"}
                            </button>
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
