"use client";
import Link from "next/link";
import { Sparkles } from "lucide-react"; 

export default function AiSuppBtn() {
    return (
        <Link 
            href="/ai-support" 
            className="absolute bottom-6 right-15 z-50 group" 
        >
            <button className="flex items-center gap-2 bg-linear-to-r from-indigo-500 to-purple-600 text-white px-5 py-3 
            rounded-full shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-white/20 transition-all duration-300 
            hover:scale-105 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]"
            >
                <Sparkles className="w-5 h-5 animate-pulse" />
            </button>
        </Link>
    );
}