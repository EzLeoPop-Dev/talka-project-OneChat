"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function ChangePasswordPage() {
    const [currentPass, setCurrentPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirm, setConfirm] = useState("");
    const router = useRouter();

    const handleUpdate = (e) => {
        e.preventDefault();
        if (newPass !== confirm) {
            alert("New password and confirm do not match.");
            return;
        }

        router.push("/account/notification");
        alert("Password updated (demo). Redirecting...");
    };

    return (
        <>
        <h1 className="text-3xl mb-5 font-bold">Change Password</h1>
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-4">
                    {/* left helper card */}
                    <div className="rounded-lg p-6 bg-white/3 border border-white/6 backdrop-blur-md">
                        <h4 className="text-white font-medium mb-2">Change Password</h4>
                        <p className="text-xs text-white/50">Update your password periodically to keep your account secure.</p>
                    </div>
                </div>

                <div className="col-span-8">
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <label className="flex flex-col text-sm text-white/70">
                            <span className="mb-2">Current Password</span>
                            <input
                                type="password"
                                value={currentPass}
                                onChange={(e) => setCurrentPass(e.target.value)}
                                className="rounded-md px-3 py-2 bg-white/5 text-white placeholder-white/40 border border-white/6"
                            />
                        </label>

                        <label className="flex flex-col text-sm text-white/70">
                            <span className="mb-2">New Password</span>
                            <input
                                type="password"
                                value={newPass}
                                onChange={(e) => setNewPass(e.target.value)}
                                className="rounded-md px-3 py-2 bg-white/5 text-white placeholder-white/40 border border-white/6"
                            />
                        </label>

                        <label className="flex flex-col text-sm text-white/70">
                            <span className="mb-2">Confirm New Password</span>
                            <input
                                type="password"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                className="rounded-md px-3 py-2 bg-white/5 text-white placeholder-white/40 border border-white/6"
                            />
                        </label>

                        <div className="pt-4">
                            <button type="submit" className="rounded-xl px-6 py-3 bg-emerald-600 text-white font-medium">
                                Update Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
