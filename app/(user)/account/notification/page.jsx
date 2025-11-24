"use client";

import React, { useState } from "react";

export default function NotificationSettingsPage() {
    const [emailNoti, setEmailNoti] = useState(true);
    const [smsNoti, setSmsNoti] = useState(false);
    const [inApp, setInApp] = useState(true);

    return (
        <>
        <h1 className="text-3xl mb-5 font-bold">Notification settings</h1>
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-4">
                    <div className="rounded-lg p-6 bg-white/3 border border-white/6 backdrop-blur-md">
                        <h4 className="text-white font-medium mb-2">Notification settings</h4>
                        <p className="text-xs text-white/50">Control how you receive notifications.</p>
                    </div>
                </div>

                <div className="col-span-8">
                    <div className="rounded-lg p-6 bg-white/3 border border-white/6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h5 className="text-white font-medium">Email Notifications</h5>
                                <p className="text-xs text-white/50">Receive important updates via email.</p>
                            </div>
                            <label className="inline-flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={emailNoti}
                                    onChange={() => setEmailNoti((s) => !s)}
                                    className="w-5 h-5 accent-emerald-500"
                                />
                            </label>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h5 className="text-white font-medium">SMS Notifications</h5>
                                <p className="text-xs text-white/50">Text message alerts to your phone number.</p>
                            </div>
                            <label className="inline-flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={smsNoti}
                                    onChange={() => setSmsNoti((s) => !s)}
                                    className="w-5 h-5 accent-amber-400"
                                />
                            </label>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h5 className="text-white font-medium">In-app Notifications</h5>
                                <p className="text-xs text-white/50">Show notifications inside the app.</p>
                            </div>
                            <label className="inline-flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={inApp}
                                    onChange={() => setInApp((s) => !s)}
                                    className="w-5 h-5 accent-sky-400"
                                />
                            </label>
                        </div>

                        <div className="pt-4">
                            <button className="rounded-xl px-6 py-3 bg-linear-to-r from-sky-500 to-indigo-600 text-white font-medium">
                                Save Notification Settings
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
