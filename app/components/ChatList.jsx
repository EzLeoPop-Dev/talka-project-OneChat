"use client";
import React from "react";

export default function ChatList({ chats, onSelectChat, selectedId }) {
    return (
        <div className="w-[350px] flex items-center mt-3">
            <div className="w-[350px] max-w-md h-[85vh]">
                <div className="bg-[rgba(32,41,59,0.25)] border border-[rgba(254,253,253,0.5)] backdrop-blur-xl rounded-3xl shadow-2xl pt-5 px-4 h-full flex flex-col">
                    <h1 className="text-white text-2xl font-bold mb-6">Chat List</h1>

                    {/* 2. ใช้ 'chats' ที่รับมาจาก props */}
                    {/* เพิ่มการตรวจสอบ chats ก่อนเรียก .length */}
                    {(!chats || chats.length === 0) && (
                        <div className="flex justify-center h-full items-center text-white">
                            <p>ยังไม่มีข้อความ</p>
                        </div>
                    )}

                    <div className="space-y-3 overflow-auto p-2 flex-1 spaceList">
                        {/* 3. ใช้ 'chats' ที่รับมาจาก props (เพิ่มการเช็ก ? เผื่อไว้) */}
                        {chats?.map((chat) => (
                            <div
                                key={chat.id}
                                // 4. ส่ง 'chat' ทั้งหมดกลับไป (แต่ page.jsx จะใช้แค่ chat.id)
                                onClick={() => onSelectChat(chat)} 
                                className={`bg-white/30 backdrop-blur-lg rounded-2xl p-4 hover:bg-white/40 transition-all cursor-pointer border border-white/20 ${selectedId === chat.id ? "ring-2 ring-blue-400" : ""
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-linear-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-2xl shadow-lg shrink-0">
                                        {chat.avatar}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className="text-white font-semibold text-sm truncate">
                                                {chat.name}
                                            </h3>
                                            <span className="text-white/70 text-xs ml-2 shrink-0">
                                                {chat.time}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <p className="text-white/80 text-sm truncate flex-1">
                                                {chat.message}
                                            </p>
                                            {/* 5. เปลี่ยนมาเช็ก 'tags' */}
                                            {chat.tags && chat.tags.includes("VIP") && (
                                                <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full shrink-0">
                                                    VIP
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}