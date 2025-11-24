"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function ProfilePage() {
    const [email, setEmail] = useState("");
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [status, setStatus] = useState("online");

    const handleSave = (e) => {
        e.preventDefault();
        alert("Profile saved (this is a demo).");
    };

    return (
        <>
        <h1 className="text-3xl mb-5 font-bold">Profile Setting</h1>
            <div className="grid grid-cols-12 gap-6">
                {/* Left column avatar */}
                <div className="col-span-4">
                    <div className="rounded-lg p-6 bg-white/3 border border-white/6 backdrop-blur-md flex flex-col items-center">
                        <div className="w-36 h-36 rounded-full overflow-hidden mb-4 bg-white/6 flex items-center justify-center">
                            {/* using regular img to accept local path */}
                            <img
                                src="/mnt/data/4479b77e-6432-47d2-9a2a-4a6d45cad421.png"
                                alt="avatar"
                                className="object-cover w-full h-full"
                            />
                        </div>

                        <button className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm hover:brightness-105">
                            Change Profile
                        </button>

                        <p className="mt-4 text-xs text-white/50 text-center">
                            Upload a square image for best results.
                        </p>
                    </div>
                </div>

                {/* Right column form */}
                <div className="col-span-8">
                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <label className="flex flex-col text-sm text-white/70">
                                <span className="mb-2">Email</span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="rounded-md px-3 py-2 bg-white/5 text-white placeholder-white/40 border border-white/6"
                                />
                            </label>

                            <div></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <label className="flex flex-col text-sm text-white/70">
                                <span className="mb-2">First Name</span>
                                <input
                                    value={first}
                                    onChange={(e) => setFirst(e.target.value)}
                                    placeholder="First name"
                                    className="rounded-md px-3 py-2 bg-white/5 text-white placeholder-white/40 border border-white/6"
                                />
                            </label>

                            <label className="flex flex-col text-sm text-white/70">
                                <span className="mb-2">Last Name</span>
                                <input
                                    value={last}
                                    onChange={(e) => setLast(e.target.value)}
                                    placeholder="Last name"
                                    className="rounded-md px-3 py-2 bg-white/5 text-white placeholder-white/40 border border-white/6"
                                />
                            </label>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-sm text-white/70 min-w-[120px]">Online Status</div>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="rounded-md px-3 py-2 bg-white/5 text-white placeholder-white/40 border border-white/6"
                            >
                                <option value="online">🟢 online</option>
                                <option value="away">🟡 away</option>
                                <option value="offline">🔴 offline</option>
                            </select>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="rounded-xl px-6 py-3 bg-linear-to-r from-purple-600 to-pink-500 text-white font-medium hover:brightness-105"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>

    );
}
