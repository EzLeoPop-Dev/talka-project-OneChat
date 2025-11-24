"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/SideBar";

export default function SidebarLayout({ children }) {
    const [bg, setBg] = useState("/images/Bg.jpg");

    useEffect(() => {
        const saved = localStorage.getItem("appBackground");
        if (saved) setBg(saved);

        const listener = (e) => {
            setBg(e.detail);
        };
        window.addEventListener("background-changed", listener);
        return () => window.removeEventListener("background-changed", listener);
    }, []);

    return (
        <div
            className="flex h-screen bg-center bg-cover text-white overflow-hidden transition-all duration-300"
            style={{ backgroundImage: `url(${bg})` }}
        >
            <div className="fixed top-0 left-0 h-full z-20">
                <Sidebar />
            </div>

            <main className="flex-1 ml-[250px] h-full overflow-y-auto p-6">
                {children}
            </main>
        </div>
    );
}
