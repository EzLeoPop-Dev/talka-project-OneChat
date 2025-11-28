"use client";

import React, { useState } from "react";
import { Camera, User, Mail, Save, Activity } from "lucide-react"; // แนะนำให้ลง lucide-react เพิ่ม หรือใช้ icon อื่นแทนได้

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
        <div className="text-white flex items-center justify-center p-4 relative overflow-hidden">

            <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

            <div className="w-full max-w-5xl backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row">

                <div className="md:w-1/3 bg-black/20 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/5 relative">
                    <div className="relative group">
                        <div className="w-40 h-40 rounded-full p-1 bg-linear-to-tr from-purple-500 to-pink-500 mb-4 ">
                            <div className="w-full h-full rounded-full overflow-hidden bg-neutral-800 relative">
                                <img
                                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
                                    alt="avatar"
                                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                />
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                    <Camera className="w-8 h-8 text-white/80" />
                                </div>
                            </div>
                        </div>

                        {/* Status */}
                        <div className={`absolute bottom-6 right-2 w-6 h-6 border-4 border-[#1a1f2e] rounded-full 
                    ${status === 'online' ? 'bg-green-500' : status === 'away' ? 'bg-yellow-500' : 'bg-red-500'}`}>
                        </div>
                    </div>

                    <h2 className="text-xl font-bold mt-2">{first || "Your Name"} {last}</h2>
                    <p className="text-white/40 text-sm mb-6">{email || "you@example.com"}</p>

                    <button className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                        <Camera size={16} /> Change Photo
                    </button>
                    <p className="mt-4 text-[10px] text-white/30 text-center px-4">
                        Recommended: Square JPG, PNG. Max 2MB.
                    </p>
                </div>

                {/* Right Column: Form */}
                <div className="md:w-2/3 p-8 md:p-12">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-white/60">
                                Profile Settings
                            </h1>
                            <p className="text-white/40 text-sm mt-1">Manage your account info and privacy.</p>
                        </div>
                        {/* Optional decorative icon */}
                        <div className="hidden md:block p-3 bg-white/5 rounded-2xl border border-white/5">
                            <User className="text-purple-400" size={24} />
                        </div>
                    </div>

                    <form onSubmit={handleSave} className="space-y-6">

                        {/* Input Group: Name */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider ml-1">First Name</label>
                                <div className="relative">
                                    <input
                                        value={first}
                                        onChange={(e) => setFirst(e.target.value)}
                                        placeholder="John"
                                        className="w-full rounded-xl px-4 py-3 bg-white/5 text-white placeholder-white/20 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider ml-1">Last Name</label>
                                <div className="relative">
                                    <input
                                        value={last}
                                        onChange={(e) => setLast(e.target.value)}
                                        placeholder="Doe"
                                        className="w-full rounded-xl px-4 py-3 bg-white/5 text-white placeholder-white/20 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Input Group: Email */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-white/50 uppercase tracking-wider ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-purple-400 transition-colors" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="john.doe@example.com"
                                    className="w-full rounded-xl pl-12 pr-4 py-3 bg-white/5 text-white placeholder-white/20 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Input Group: Status */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-white/50 uppercase tracking-wider ml-1">Online Status</label>
                            <div className="relative">
                                <Activity className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full rounded-xl pl-12 pr-4 py-3 bg-white/5 text-white border border-white/10 focus:border-purple-500 focus:outline-none appearance-none cursor-pointer hover:bg-white/10 transition-colors"
                                >
                                    <option value="online" className="bg-neutral-800">🟢 &nbsp; Online</option>
                                    <option value="away" className="bg-neutral-800">🟡 &nbsp; Away</option>
                                    <option value="offline" className="bg-neutral-800">🔴 &nbsp; Offline</option>
                                </select>
                                {/* Custom Arrow */}
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-6 border-t border-white/5 flex items-center justify-end gap-4">
                            <button type="button" className="text-sm text-white/50 hover:text-white transition-colors px-4 py-2">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex items-center gap-2 rounded-xl px-8 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                                <Save size={18} />
                                Save Changes
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}