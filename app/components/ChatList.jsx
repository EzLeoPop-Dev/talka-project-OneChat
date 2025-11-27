"use client";
import React, { useEffect, useState } from "react";

export default function ChatList({ chats, onSelectChat, selectedId, availableTags = [] }) {
    const [displayChats, setDisplayChats] = useState(chats);

    // 1. Sync กับ Props
    useEffect(() => {
        const savedChatsStr = localStorage.getItem("app_board_chats");
        if (savedChatsStr) {
            try {
                const savedChats = JSON.parse(savedChatsStr);
                const mergedChats = chats.map(chat => {
                    const savedChat = savedChats.find(c => c.id == chat.id);
                    if (savedChat) {
                        return { 
                            ...savedChat, 
                            ...chat, 
                            messages: savedChat.messages || chat.messages,
                            lastMessage: savedChat.lastMessage || chat.lastMessage
                        };
                    }
                    return chat;
                });
                setDisplayChats(mergedChats);
            } catch (e) {
                console.error("Error merging chat data:", e);
                setDisplayChats(chats);
            }
        } else {
            setDisplayChats(chats);
        }
    }, [chats]);

    // 2. ฟัง Event "storage"
    useEffect(() => {
        const handleStorageUpdate = () => {
            const savedChatsStr = localStorage.getItem("app_board_chats");
            if (savedChatsStr) {
                try {
                    const parsedChats = JSON.parse(savedChatsStr);
                    setDisplayChats(prevChats => {
                        return prevChats.map(prevChat => {
                            const updatedChat = parsedChats.find(c => c.id == prevChat.id);
                            return updatedChat || prevChat;
                        });
                    });
                } catch (e) {
                    console.error("Error syncing chat list:", e);
                }
            }
        };

        window.addEventListener("storage", handleStorageUpdate);
        return () => window.removeEventListener("storage", handleStorageUpdate);
    }, []);

    return (
        <div className="w-[425px] flex items-center mt-3">
            <div className="w-[425px] max-w-md h-[85vh]">
                <div className="bg-[rgba(32,41,59,0.25)] border border-[rgba(254,253,253,0.5)] backdrop-blur-xl rounded-3xl shadow-2xl pt-5 px-4 h-full flex flex-col">
                    <h1 className="text-white text-2xl font-bold mb-6">Chat List</h1>

                    {(!displayChats || displayChats.length === 0) && (
                        <div className="flex justify-center h-full items-center text-white">
                            <p>ยังไม่มีข้อความ</p>
                        </div>
                    )}

                    <div className="space-y-3 overflow-auto p-2 flex-1 spaceList">
                        {displayChats?.map((chat) => {
                            const lastMsgObj = chat.messages && chat.messages.length > 0 
                                ? chat.messages[chat.messages.length - 1] 
                                : null;
                            
                            const isMe = lastMsgObj ? lastMsgObj.from === 'me' : false;
                            const displayMessage = lastMsgObj ? lastMsgObj.text : (chat.lastMessage || chat.message);
                            const displayTime = lastMsgObj ? (lastMsgObj.timestamp || lastMsgObj.time) : chat.time;

                            return (
                                <div
                                    key={chat.id}
                                    onClick={() => onSelectChat(chat)} 
                                    className={`bg-white/30 backdrop-blur-lg rounded-2xl p-4 hover:bg-white/40 transition-all cursor-pointer border border-white/20 ${selectedId === chat.id ? "ring-2 ring-blue-400" : ""
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        
                                        <div className="relative w-12 h-12 shrink-0">
                                            {chat.imgUrl ? (
                                                <img 
                                                    src={chat.imgUrl} 
                                                    alt={chat.name} 
                                                    className="w-full h-full rounded-full object-cover shadow-sm bg-gray-700"
                                                />
                                            ) : (
                                               <div className="w-full h-full bg-linear-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-2xl shadow-lg text-white">
                                                    {chat.avatar || chat.name.charAt(0)}
                                                </div>
                                            )}

                                            {/* Channel Badge */}
                                            {chat.channel && (
                                                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] shadow-sm ]
                                                    ${chat.channel === 'Facebook' ? 'bg-[#1877F2]' : 
                                                        chat.channel === 'Line' ? 'bg-[#06C755]' : 'bg-gray-500'}
                                                `}>
                                                    {chat.channel === 'Facebook' && <i className="fa-brands fa-facebook-f"></i>}
                                                    {chat.channel === 'Line' && <i className="fa-brands fa-line"></i>}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            {/*  ส่วนหัว: ชื่อ + Status + Tags อยู่ด้วยกันตรงนี้ */}
                                            <div className="flex items-center justify-between mb-1">
                                                <div className="flex items-center gap-2 flex-wrap overflow-hidden">
                                                    <h3 className="font-semibold truncate text-white/90 text-sm max-w-[120px]" title={chat.name}>{chat.name}</h3>
                                                    
                                                    {/* Status */}
                                                    {chat.status && (
                                                        <span className={`text-[9px] font-medium px-2 py-0.5 rounded-full border shrink-0
                                                            ${chat.status === 'Closed' ? 'border-white/10 bg-white/5 text-white/30' : 'border-white/30 bg-white/10 text-white/90'}
                                                        `}>
                                                            {chat.status}
                                                        </span>
                                                    )}

                                                    {/* Tags ถูกย้ายมาตรงนี้แล้ว */}
                                                    {(() => {
                                                        let tagsArray = [];
                                                        if (Array.isArray(chat.tags)) {
                                                            tagsArray = chat.tags; 
                                                        } else if (chat.tags) {
                                                            tagsArray = [chat.tags]; 
                                                        }

                                                        return tagsArray.map((tagName, idx) => {
                                                            const tagInfo = availableTags.find(t => t.name === tagName);
                                                            const color = tagInfo ? tagInfo.color : '#666';
                                                            const emoji = tagInfo ? tagInfo.emoji : '';

                                                            return (
                                                                <span 
                                                                    key={idx}
                                                                    className="text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 text-white shadow-sm border border-white/10 flex items-center gap-1"
                                                                    style={{ backgroundColor: color }}
                                                                >
                                                                    {emoji && <span>{emoji}</span>}
                                                                    {tagName}
                                                                </span>
                                                            );
                                                        });
                                                    })()}
                                                </div>

                                                <span className="text-white/70 text-xs shrink-0 ml-2">
                                                    {displayTime}
                                                </span>
                                            </div>

                                            {/* ข้อความล่าสุด */}
                                            <p className="text-xs text-white/70 truncate mt-0.5 flex items-center">
                                                {isMe && <span className="text-white/50 mr-1">You:</span>}
                                                {displayMessage || "Click to chat"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}