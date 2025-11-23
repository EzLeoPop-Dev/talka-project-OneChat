"use client";
import React, { useRef, useState, useEffect } from "react";
import { Tooltip } from 'react-tooltip';
import Picker from "emoji-picker-react";

export default function ChatMessage({ chat, onToggleAiMode }) { 
    if (!chat) {
        return (
            <div className="flex-1 flex justify-center items-center text-white/60 text-lg">
                เลือกแชททางซ้ายเพื่อดูข้อความ
            </div>
        );
    }

    const textareaRef = useRef(null);
    const [height, setHeight] = useState(100);

    const [showAiPrompts, setShowAiPrompts] = useState(false);
    const dropdownRef = useRef(null);

    // ตัวอย่างข้อความ Prompt
    const AI_PROMPTS = [
        "สวัสดี",
        "มีอะไรให้ช่วยไหม?",
    ];

    const handleSelectPrompt = (text) => {
        if (textareaRef.current) {
            textareaRef.current.value = text;
            textareaRef.current.focus(); 
            textareaRef.current.style.height = 'auto'; 
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
        setShowAiPrompts(false);
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.value = "";
            setHeight(100);
        }
    }, [chat?.id]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowAiPrompts(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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

    return (
        <div className="flex-1 min-w-0 h-[85vh] bg-[rgba(32,41,59,0.25)] border border-[rgba(254,253,253,0.5)] backdrop-blur-xl rounded-3xl shadow-2xl p-5 mt-3 ml-3 flex flex-col">
            
            {/* --- Header --- */}
            <div className="flex flex-wrap md:flex-nowrap items-center justify-between border-b border-white/20 pb-3 mb-3 gap-3 relative">
                
                {/* ฝั่งซ้าย: ข้อมูลลูกค้า */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-12 h-12 bg-linear-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-2xl shadow-lg shrink-0">
                        {chat.avatar}
                    </div>
                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-white font-semibold text-lg whitespace-nowrap truncate">{chat.name}</h2>

                            {chat.channel && (
                                <span className={`text-[10px] font-bold px-2 py-1 rounded-full border shrink-0 flex items-center
                                    ${chat.channel === 'Facebook' 
                                        ? 'text-blue-400 border-blue-400/30 bg-blue-500/10' 
                                        : chat.channel === 'Line' 
                                            ? 'text-green-400 border-green-400/30 bg-green-500/10' 
                                            : 'border-white/30 bg-white/10 text-white/90'
                                    }
                                `}>
                                    {chat.channel === 'Facebook' && <i className="fa-brands fa-facebook-f mr-1"></i>}
                                    {chat.channel === 'Line' && <i className="fa-brands fa-line mr-1"></i>}
                                    {chat.channel}
                                </span>
                            )}
                            
                            {/* Status */}
                            {chat.status && (
                                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border shrink-0
                                    ${chat.status === 'Closed' 
                                        ? 'border-white/10 bg-white/5 text-white/30' 
                                        : 'border-white/30 bg-white/10 text-white/90' 
                                    }
                                `}>
                                    {chat.status}
                                </span>
                            )}

                            {chat.tags && chat.tags.includes("VIP") && (
                                <span className="bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                                    VIP
                                </span>
                            )}
                        </div>
                        <span className="text-white/60 text-xs block mt-0.5">Open : {chat.time}</span>
                    </div>
                </div>

                {/* --- ฝั่งขวา: AI --- */}
                <div className="flex items-center gap-3 shrink-0 ml-auto md:ml-0" ref={dropdownRef}>
        
                    {/* --- AI Auto --- */}
                    <button 
                        onClick={() => onToggleAiMode(chat.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all shadow-lg border border-white/10 whitespace-nowrap
                            ${chat.isAiMode 
                                ? 'bg-linear-to-r from-emerald-500 to-green-600 text-white shadow-green-500/30 animate-pulse' 
                                : 'bg-[rgba(32,41,59,0.25)] border-[rgba(254,253,253,0.5)] hover:bg-white/10 hover:scale-105 text-white/80' 
                            }`}
                    >
                        <i className={`fa-solid fa-robot ${chat.isAiMode ? 'animate-bounce' : ''}`}></i>
                        <span className="text-sm font-semibold hidden sm:inline">AI Auto</span> {/* ซ่อน text ถ้าจอเล็กจัด */}
                    </button>

                    {/* --- AI Prompt --- */}
                    <div className="relative">
                        <button 
                            onClick={() => setShowAiPrompts(!showAiPrompts)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all shadow-lg border border-white/10 whitespace-nowrap
                                ${showAiPrompts 
                                    ? 'bg-white-600 text-white shadow-white-500/30' 
                                    : 'bg-[rgba(32,41,59,0.25)] border-[rgba(254,253,253,0.5)] hover:bg-white/10 hover:scale-105 text-white/80'
                                }`}
                        >
                            <i className="fa-solid fa-wand-magic-sparkles"></i>
                            <span className="text-sm font-semibold hidden sm:inline">Prompt</span> {/* ซ่อน text ถ้าจอเล็กจัด */}
                            <i className={`fa-solid fa-chevron-down text-xs ml-1 transition-transform ${showAiPrompts ? 'rotate-180' : ''}`}></i>
                        </button>

                    {/* --- Dropdown Menu --- */}
                    {showAiPrompts && (
                        <div className="absolute right-0 top-full mt-2 w-72 bg-[#1e1e2e] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 animate-fade-in-up">
                            <div className="p-2 bg-white/5 border-b border-white/5">
                                <span className="text-[10px] text-white/50 uppercase font-bold tracking-wider ml-2">Select a response</span>
                            </div>
                            <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                                {AI_PROMPTS.map((prompt, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSelectPrompt(prompt)}
                                        className="w-full text-left px-4 py-3 text-white/80 text-sm hover:bg-white/10 hover:text-white transition-colors border-b border-white/5 last:border-0"
                                    >
                                        {prompt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    </div>
                </div>

            </div>

            {/* Chat Content */}
            <div className="flex-1 overflow-auto space-y-3 text-white/90 custom-scrollbar pr-2">
                <div className="self-start bg-white/20 px-4 py-2 rounded-2xl w-fit">
                    {chat.message}
                </div>

                {/* --- AI Status --- */}
                {chat.isAiMode && (
                    <div className="flex justify-center my-4 animate-fade-in">
                        <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-4 py-1 rounded-full text-xs flex items-center gap-2">
                            <i className="fa-solid fa-robot fa-spin"></i>
                            AI กำลังดูแลแชทนี้...
                        </span>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="mt-4 bg-[rgba(32,41,59,0.25)] relative group p-4 rounded-2xl shadow-2xs">
                <div className="input-field max-h-[300px]">
                    <textarea
                        ref={textareaRef}
                        style={{ height }}
                        disabled={chat.isAiMode} // ล็อคช่องพิมพ์เมื่อ AI ทำงาน
                        className="w-full border rounded p-2 resize-none max-h-[300px] bg-transparent text-white border-none outline-none disabled:cursor-not-allowed"
                        placeholder={chat.isAiMode ? "AI is replying automatically..." : "Type a message..."}
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