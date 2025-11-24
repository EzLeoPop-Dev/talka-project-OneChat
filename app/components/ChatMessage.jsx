"use client";
import React, { useRef, useState } from "react";
import { Tooltip } from 'react-tooltip';
import Picker from "emoji-picker-react";

export default function ChatMessage({ chat }) { 
    if (!chat) {
        return (
            <div className="flex-1 flex justify-center items-center text-white/60 text-lg">
                เลือกแชททางซ้ายเพื่อดูข้อความ
            </div>
        );
    }

    const textareaRef = useRef(null);
    const [height, setHeight] = useState(100);

    const handleMouseDown = (e) => {
        e.preventDefault();
        const startY = e.clientY;
        const startHeight = textareaRef.current.offsetHeight;

        const onMouseMove = (e) => {
            const delta = startY - e.clientY;
            const newHeight = Math.max(50, startHeight + delta);
            setHeight(newHeight);
        };

        const onMouseUp = () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    };

    const editorRef = useRef(null);
    const fileInputRef = useRef(null);
    const [files, setFiles] = useState([]);

    const handleAttachClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles((prev) => [...prev, ...selectedFiles]);
        event.target.value = "";
    };

    const handleRemoveFile = (index) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const onEmojiClick = (emojiData) => {
        const editor = textareaRef.current;
        if (!editor) return;
        const startPos = editor.selectionStart;
        const endPos = editor.selectionEnd;
        const text = editor.value;
        editor.value = text.substring(0, startPos) + emojiData.emoji + text.substring(endPos);
        editor.selectionStart = editor.selectionEnd = startPos + emojiData.emoji.length;
        editor.focus();
    };

    // --- ส่วนข้อมูล Employee (Hardcode ไว้ก่อน หรือรับ props มาก็ได้) ---
    const employeeName = "Andrew Smith";
    const employeeAvatar = " "; 

    return (
        <div className="flex-1 min-w-0 h-[85vh] bg-[rgba(32,41,59,0.25)] border border-[rgba(254,253,253,0.5)] backdrop-blur-xl rounded-3xl shadow-2xl p-5 mt-3 ml-3 flex flex-col">
            
            {/* --- Header --- */}
            <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-3">
                
                {/* ฝั่งซ้าย: ข้อมูลลูกค้า */}
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-linear-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-2xl shadow-lg">
                        {chat.avatar}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-white font-semibold text-lg">{chat.name}</h2>
                            {chat.tags && chat.tags.includes("VIP") && (
                                <span className="bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    VIP
                                </span>
                            )}
                        </div>
                        <span className="text-white/60 text-xs">Open : {chat.time}</span>
                    </div>
                </div>

                {/* ฝั่งขวา: ข้อมูลผู้ดูแล (Employee) -> เพิ่มส่วนนี้ครับ */}
                <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                    <div className="flex flex-col items-end">
                        <span className="text-white text-sm font-medium leading-tight">{employeeName}</span>
                        <span className="text-white/50 text-[10px] uppercase tracking-wider">Admin</span>
                    </div>
                    <div className="w-9 h-9 rounded-full border border-white/30 overflow-hidden">
                        <img src={employeeAvatar} alt="Admin" className="w-full h-full object-cover" />
                    </div>
                </div>

            </div>

            {/* Chat Content */}
            <div className="flex-1 overflow-auto space-y-3 text-white/90 custom-scrollbar pr-2">
                <div className="self-start bg-white/20 px-4 py-2 rounded-2xl w-fit">
                    {chat.message}
                </div>
                
            </div>

            {/* Input Area (คงเดิม) */}
            <div className="mt-4 bg-[rgba(32,41,59,0.25)] relative group p-4 rounded-2xl shadow-2xs">
                <div className="input-field max-h-[300px]">
                    <textarea
                        ref={textareaRef}
                        style={{ height }}
                        className="w-full border rounded p-2 resize-none max-h-[300px] bg-transparent text-white border-none outline-none"
                        placeholder="Type a message..."
                    />
                    <div onMouseDown={handleMouseDown} className="absolute top-1.5 left-1/2 -translate-x-1/2 w-15 h-1 bg-white/20 rounded-full cursor-ns-resize opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="function-field flex justify-between mt-2 border-t border-white/10 pt-2">
                    <div className="left-funtion flex gap-1">
                        <button data-tooltip-id="attach-tooltip" data-tooltip-content="Ai prompt" className="text-white/70 hover:text-white text-[18px] p-2 transition rounded-lg hover:bg-white/10">
                            <i className="fa-solid fa-wand-magic-sparkles"></i>
                        </button>
                        <div className="relative">
                            <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="text-white/70 hover:text-white text-[18px] p-2 transition rounded-lg hover:bg-white/10">
                                <i className="fa-solid fa-icons"></i>
                            </button>
                            {showEmojiPicker && (
                                <div className="absolute bottom-full left-0 mb-2 z-50">
                                    <Picker onEmojiClick={onEmojiClick} />
                                </div>
                            )}
                        </div>
                        <button onClick={handleAttachClick} className="text-white/70 hover:text-white text-[18px] p-2 transition rounded-lg hover:bg-white/10">
                            <i className="fa-solid fa-paperclip"></i>
                        </button>
                        <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileChange} />
                    </div>
                    <div className="right-function">
                        <button
                                data-tooltip-id="attach-tooltip"
                                data-tooltip-content="ส่งข้อความ"
                                className="text-white text-[20px] px-3 py-2 transition"
                            >
                                <i className="fa-solid fa-paper-plane"></i>
                            </button>
                    </div>
                </div>

                {files.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                        {files.map((file, index) => (
                            <span key={index} className="flex items-center bg-white/10 text-white px-3 py-1 rounded-lg text-xs border border-white/10">
                                <span className="truncate max-w-[100px]">{file.name}</span>
                                <button onClick={() => handleRemoveFile(index)} className="ml-2 text-red-400 hover:text-red-300">✕</button>
                            </span>
                        ))}
                    </div>
                )}
            </div>
            
            <Tooltip id="attach-tooltip" place="top" className="z-50" />
        </div>
    );
}