"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const items = [
    {
        title: "Getting Started",
        subtitle: "เริ่มต้นใช้งาน Talka อย่างรวดเร็ว",
        desc: "เรียนรู้ส่วนสำคัญของระบบ Talka พร้อมคู่มือที่เข้าใจง่าย สำหรับผู้ใช้งานใหม่ที่ต้องการเริ่มต้นสร้าง Chatbot ของตัวเอง",
        step: "01",
        icon: "🚀",
        color: "from-blue-500 to-cyan-400"
    },
    {
        title: "Customize Workspace",
        subtitle: "ปรับธีม พื้นหลัง",
        desc: "ปรับแต่งพื้นที่ทำงานให้เข้ากับสไตล์ของคุณ เปลี่ยนสีธีม เลือกพื้นหลังที่ชอบ และจัดการเลย์เอาต์ตามความต้องการ",
        step: "02",
        icon: "🎨",
        color: "from-purple-500 to-pink-400"
    },
    {
        title: "Create Flow",
        subtitle: "ออกแบบ flow ของ chatbot",
        desc: "สร้าง conversation flow ง่าย ๆ ด้วย drag & drop editor ที่ใช้งานง่าย ไม่ต้องเขียนโค้ด ก็สามารถสร้าง chatbot ที่ซับซ้อนได้",
        step: "03",
        icon: "⚡",
        color: "from-amber-500 to-orange-400"
    },
    {
        title: "Connect Channels",
        subtitle: "เชื่อมต่อ Facebook / LINE / API",
        desc: "รวมช่องทางการสื่อสารทั้งหมดมาที่เดียว เชื่อมต่อกับ Facebook Messenger, LINE Official Account และ Custom API ได้อย่างง่ายดาย",
        step: "04",
        icon: "🔗",
        color: "from-green-500 to-emerald-400"
    },
    {
        title: "Analyze & Publish",
        subtitle: "ปล่อยใช้งานและวัดผล",
        desc: "ติดตามผล วิเคราะห์การตอบสนองของผู้ใช้ ดู metrics สำคัญ และปรับปรุง chatbot ของคุณให้มีประสิทธิภาพมากขึ้นเรื่อย ๆ",
        step: "05",
        icon: "📊",
        color: "from-rose-500 to-red-400"
    },
];

export default function TutorialCarousel() {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [rotation, setRotation] = useState(0);
    const length = items.length;
    const radius = 350;

    const prev = () => {
        setDirection(-1);
        setRotation(r => r + (360 / length));
        setIndex((i) => (i - 1 + length) % length);
    };

    const next = () => {
        setDirection(1);
        setRotation(r => r - (360 / length));
        setIndex((i) => (i + 1) % length);
    };

    useEffect(() => {
        const timer = setInterval(() => next(), 5000);
        return () => clearInterval(timer);
    }, [index]);

    const getCardPosition = (cardIndex) => {
        const relativeIndex = (cardIndex - index + length) % length;
        const angle = (relativeIndex * (360 / length)) * (Math.PI / 180);

        return {
            x: Math.sin(angle) * radius,
            y: Math.cos(angle) * radius * 0.3,
            z: Math.cos(angle) * radius,
            scale: relativeIndex === 0 ? 1.15 : 0.75 + Math.cos(angle) * 0.15,
            opacity: relativeIndex === 0 ? 1 : 0.4 + Math.cos(angle) * 0.3,
            rotateY: -angle * (180 / Math.PI)
        };
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
            {/* Animated background particles */}
            <div className="absolute inset-0">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white/20 rounded-full"
                        initial={{
                            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                            scale: 0
                        }}
                        animate={{
                            y: [
                                Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                                Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000) - 40,
                                Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                            ],
                            x: [
                                Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                                Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000) + 20,
                                Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                            ],
                            scale: [0.5, 1, 0.5],
                            opacity: [0.2, 0.5, 0.2]
                        }}
                        transition={{
                            duration: 5 + Math.random() * 10,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* Title */}
            <motion.div
                className="relative z-10 mb-16 text-center"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            >
                <motion.h1
                    className="text-5xl font-bold text-white mb-3 drop-shadow-lg"
                    animate={{
                        textShadow: [
                            "0 0 20px rgba(255,255,255,0.5)",
                            "0 0 40px rgba(255,255,255,0.8)",
                            "0 0 20px rgba(255,255,255,0.5)",
                        ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    Talka Tutorial
                </motion.h1>
                <motion.p
                    className="text-white/80 text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    เริ่มต้นใช้งานได้ใน 5 ขั้นตอนง่าย ๆ
                </motion.p>
            </motion.div>

            {/* Circular Carousel Container */}
            <div className="relative w-full max-w-[1100px] h-[600px] flex items-center justify-center perspective-2000">
                {/* Rotating Circle Path Indicator */}
                <motion.div
                    className="absolute w-[700px] h-[420px] border-2 border-white/10 rounded-full"
                    animate={{ rotate: rotation }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                />

                {/* Cards in circular formation */}
                <AnimatePresence mode="sync">
                    {items.map((item, cardIndex) => {
                        const position = getCardPosition(cardIndex);
                        const isActive = cardIndex === index;

                        return (
                            <motion.div
                                key={cardIndex}
                                className={`absolute w-80 h-[500px] cursor-pointer ${isActive ? 'z-30' : 'z-10'
                                    }`}
                                initial={false}
                                animate={{
                                    x: position.x,
                                    y: position.y,
                                    z: position.z,
                                    scale: position.scale,
                                    opacity: position.opacity,
                                    rotateY: position.rotateY
                                }}
                                transition={{
                                    duration: 0.8,
                                    type: "spring",
                                    stiffness: 80,
                                    damping: 20
                                }}
                                whileHover={!isActive ? {
                                    scale: position.scale * 1.05,
                                    opacity: position.opacity + 0.2
                                } : {}}
                                onClick={() => {
                                    if (cardIndex !== index) {
                                        const diff = (cardIndex - index + length) % length;
                                        if (diff <= length / 2) {
                                            for (let i = 0; i < diff; i++) next();
                                        } else {
                                            for (let i = 0; i < length - diff; i++) prev();
                                        }
                                    }
                                }}
                                style={{
                                    transformStyle: 'preserve-3d',
                                }}
                            >
                                <Card item={item} isActive={isActive} />
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Controls */}
            <motion.button
                onClick={prev}
                className="absolute left-8 top-1/2 -translate-y-1/2 z-40 p-4 rounded-full bg-white/10 text-white backdrop-blur-xl border border-white/20 shadow-2xl"
                whileHover={{ scale: 1.15, backgroundColor: "rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
                <ChevronLeft className="w-7 h-7" />
            </motion.button>

            <motion.button
                onClick={next}
                className="absolute right-8 top-1/2 -translate-y-1/2 z-40 p-4 rounded-full bg-white/10 text-white backdrop-blur-xl border border-white/20 shadow-2xl"
                whileHover={{ scale: 1.15, backgroundColor: "rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
                <ChevronRight className="w-7 h-7" />
            </motion.button>

            {/* Animated Indicators */}
            <div className="relative flex gap-3 mt-12 z-10">
                {items.map((_, i) => (
                    <motion.button
                        key={i}
                        className={`rounded-full cursor-pointer ${i === index
                                ? "bg-white shadow-lg"
                                : "bg-white/40"
                            }`}
                        animate={{
                            width: i === index ? 48 : 12,
                            height: 12
                        }}
                        whileHover={{ backgroundColor: "rgba(255,255,255,0.6)", scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        onClick={() => {
                            const diff = (i - index + length) % length;
                            if (diff <= length / 2) {
                                for (let j = 0; j < diff; j++) next();
                            } else {
                                for (let j = 0; j < length - diff; j++) prev();
                            }
                        }}
                    />
                ))}
            </div>

            <style jsx>{`
                .perspective-2000 {
                    perspective: 2000px;
                    transform-style: preserve-3d;
                }
            `}</style>
        </div>
    );
}

function Card({ item, isActive = false }) {
    return (
        <motion.div
            className={`h-full rounded-3xl shadow-2xl border overflow-hidden bg-gray-100 ${isActive
                    ? "border-white/40 shadow-white/30"
                    : "border-white/10"
                }`}
            style={{
                transformStyle: 'preserve-3d',
            }}
            animate={isActive ? {
                boxShadow: [
                    "0 25px 50px -12px rgba(255,255,255,0.25)",
                    "0 25px 50px -12px rgba(255,255,255,0.4)",
                    "0 25px 50px -12px rgba(255,255,255,0.25)",
                ]
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
        >
            {/* Card Header */}
            <div className="bg-white px-6 py-4 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 text-center">
                    {item.title}
                </h3>
            </div>

            {/* Image Placeholder with gradient background */}
            <div className={`relative h-48 bg-gradient-to-br ${item.color} flex items-center justify-center overflow-hidden`}>
                <motion.div
                    className="absolute inset-0 opacity-20"
                    animate={{
                        background: [
                            "radial-gradient(circle at 20% 20%, white 0%, transparent 50%)",
                            "radial-gradient(circle at 80% 80%, white 0%, transparent 50%)",
                            "radial-gradient(circle at 20% 20%, white 0%, transparent 50%)",
                        ]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />

                {/* Icon Display */}
                <motion.div
                    className="relative z-10 text-8xl"
                    animate={isActive ? {
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                    } : {
                        scale: 1,
                        rotate: 0
                    }}
                    transition={{
                        duration: 0.6,
                        ease: "easeInOut"
                    }}
                >
                    {item.icon}
                </motion.div>

                {/* Step Badge */}
                <motion.div
                    className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-sm font-bold text-gray-800"
                    whileHover={{ scale: 1.05 }}
                >
                    Step {item.step}
                </motion.div>
            </div>

            {/* Content section */}
            <div className="p-6 bg-white">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    {item.subtitle}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {item.desc}
                </p>

                {/* Button */}
                <motion.button
                    className="w-full py-2.5 px-4 bg-gray-700 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    เริ่มต้นเลย
                </motion.button>
            </div>

            {/* Active Indicator */}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-2 h-2 rounded-full bg-gray-400"
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.6, 1, 0.6]
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: i * 0.2
                                }}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}