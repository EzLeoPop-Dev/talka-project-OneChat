"use client";
import React, { useRef, useState, useEffect } from "react";
import { Tooltip } from 'react-tooltip';
import Picker from "emoji-picker-react";

export default function ChatMessage({ chat, availableAgents, onSelectAiAgent, aiPrompts = [], currentUser, availableTags = [] }) { 
    const textareaRef = useRef(null);
    const messagesEndRef = useRef(null);
    const [height, setHeight] = useState(100);
    const [showAiPrompts, setShowAiPrompts] = useState(false);
    const dropdownRef = useRef(null);
    const [showAiModelSelect, setShowAiModelSelect] = useState(false);
    const aiModelDropdownRef = useRef(null);
    const fileInputRef = useRef(null);
    const [files, setFiles] = useState([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const [displayMessages, setDisplayMessages] = useState([]);

    // Helper check platform
    const platform = (chat?.platform || chat?.channel || "").toLowerCase();
    const isLine = platform === 'line';
    const isFacebook = platform === 'facebook';

    const loadLatestMessages = () => {
        if (!chat?.id) return;
        try {
            const savedChats = JSON.parse(localStorage.getItem("app_board_chats") || "[]");
            const foundChat = savedChats.find(c => c.id == chat.id);
            
            if (foundChat && Array.isArray(foundChat.messages)) {
                setDisplayMessages(foundChat.messages);
            } else if (chat.messages) {
                setDisplayMessages(chat.messages);
            }
        } catch (error) {
            console.error("Error loading messages:", error);
        }
    };

    useEffect(() => {
        loadLatestMessages();
        if (textareaRef.current) {
            textareaRef.current.value = "";
            setHeight(100);
        }
        setFiles([]);
    }, [chat?.id]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            loadLatestMessages();
        }, 2000);
        return () => clearInterval(intervalId);
    }, [chat?.id]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [displayMessages]);

    const handleSendMessage = (text) => {
        if ((!text || !text.trim()) && files.length === 0) return;

        const newMessage = {
            from: "me",
            text: text?.trim() || "",
            files: files,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setDisplayMessages(prev => [...prev, newMessage]);
        updateLocalStorage(newMessage);

        if (!chat.isAiMode) {
            setTimeout(() => {
                const replyMessage = {
                    from: "customer",
                    text: `ได้รับข้อความ "${text}" แล้วครับ (Auto Reply)`,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                setDisplayMessages(prev => [...prev, replyMessage]);
                updateLocalStorage(replyMessage);
            }, 1500);
        }
    };

    const updateLocalStorage = (newMsg) => {
        try {
            const savedChats = JSON.parse(localStorage.getItem("app_board_chats") || "[]");
            let found = false;
            
            const updatedChats = savedChats.map(c => {
                if (c.id == chat.id) {
                    found = true;
                    const currentMessages = Array.isArray(c.messages) ? c.messages : [];
                    return { 
                        ...c, 
                        tags: chat.tags || [], // Use tags from props to ensure sync
                        messages: [...currentMessages, newMsg],
                        lastMessage: newMsg.text || "Sent an attachment" 
                    };
                }
                return c;
            });

            if (!found) {
                const currentMessages = Array.isArray(chat.messages) ? chat.messages : [];
                updatedChats.push({
                    ...chat,
                    tags: chat.tags || [],
                    messages: [...currentMessages, newMsg],
                    lastMessage: newMsg.text
                });
            }

            localStorage.setItem("app_board_chats", JSON.stringify(updatedChats));
            window.dispatchEvent(new Event("storage")); 
        } catch (error) {
            console.error("Error updating chat:", error);
        }
    };

    const handleSendClick = () => {
        const text = textareaRef.current.value;
        handleSendMessage(text); 
        textareaRef.current.value = ""; 
        textareaRef.current.focus();
        setHeight(100);
        setFiles([]);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendClick();
        }
    };

    const handleSelectPrompt = (promptObject) => {
        if (textareaRef.current) {
            textareaRef.current.value = promptObject.text || promptObject.name; 
            textareaRef.current.focus();
        }
        setShowAiPrompts(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowAiPrompts(false);
            }
            if (aiModelDropdownRef.current && !aiModelDropdownRef.current.contains(event.target)) {
                setShowAiModelSelect(false);
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

    const handleAttachClick = () => fileInputRef.current.click();
    
    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles((prev) => [...prev, ...selectedFiles]);
        event.target.value = "";
    };

    const handleRemoveFile = (index) => setFiles((prev) => prev.filter((_, i) => i !== index));

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

    if (!chat) {
        return (
            <div className="flex-1 flex justify-center items-center text-white/60 text-lg h-[85vh] bg-[rgba(32,41,59,0.25)] border border-[rgba(254,253,253,0.5)] backdrop-blur-xl rounded-3xl shadow-2xl mt-3 ml-3">
                เลือกแชททางซ้ายเพื่อดูข้อความ
            </div>
        );
    }

    return (
        <div className="flex-1 min-w-0 h-[85vh] bg-[rgba(32,41,59,0.25)] border border-[rgba(254,253,253,0.5)] backdrop-blur-xl rounded-3xl shadow-2xl p-5 mt-3 ml-3 flex flex-col">
            
            {/* Header */}
            <div className="flex flex-wrap md:flex-nowrap items-center justify-between border-b border-white/20 pb-3 mb-3 gap-3 relative">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                    
                    {/* Avatar + Platform Icon */}
                    <div className="relative w-12 h-12 shrink-0">
                         {chat.imgUrl ? (
                            <img src={chat.imgUrl} alt={chat.name} className="w-full h-full rounded-full object-cover shadow-lg" />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-2xl shadow-lg text-white">
                                {chat.avatar || chat.name?.charAt(0)}
                            </div>
                        )}
                        
                        {/* Platform Icon */}
                        <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#303030] ${isLine ? 'bg-[#06C755]' : isFacebook ? 'bg-[#1877F2]' : 'bg-gray-500'}`}>
                            {isLine ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="white" viewBox="0 0 16 16"><path d="M8 0c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zM8 2C4.686 2 2 4.686 2 8c0 1.818.813 3.444 2.098 4.604-.15.557-.536 1.623-1.146 2.237.798-.052 1.979-.29 2.778-.998a5.96 5.96 0 0 0 2.27.457c3.314 0 6-2.686 6-6S11.314 2 8 2z" /></svg>
                            ) : isFacebook ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="white" viewBox="0 0 16 16"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" /></svg>
                            ) : null}
                        </div>
                    </div>

                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-white font-semibold text-lg whitespace-nowrap truncate">{chat.name}</h2>
                            
                            {/* Status */}
                            {chat.status && (
                                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border shrink-0 ${chat.status === 'Closed' ? 'border-white/10 bg-white/5 text-white/30' : 'border-white/30 bg-white/10 text-white/90'}`}>
                                    {chat.status}
                                </span>
                            )}

                            {/* Tags */}
                            {(() => {
                                let tagsArray = [];
                                if (Array.isArray(chat.tags)) tagsArray = chat.tags;
                                else if (chat.tags) tagsArray = [chat.tags];

                                return tagsArray.map((tagName, idx) => {
                                    const tagInfo = availableTags.find(t => t.name === tagName);
                                    const color = tagInfo ? tagInfo.color : '#666';
                                    const emoji = tagInfo ? tagInfo.emoji : '';

                                    return (
                                        <span 
                                            key={idx} 
                                            className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 text-white shadow-sm border border-white/10 flex items-center gap-1"
                                            style={{ backgroundColor: color }}
                                        >
                                            {emoji && <span>{emoji}</span>}
                                            {tagName}
                                        </span>
                                    );
                                });
                            })()}
                        </div>
                        <span className="text-white/60 text-xs block mt-0.5">Open : {chat.time}</span>
                    </div>
                </div>

                {/* Select AI Button */}
                <div className="relative" ref={aiModelDropdownRef}>
                    <button 
                        onClick={() => setShowAiModelSelect(!showAiModelSelect)} 
                        className={`flex items-center gap-2 border border-white/20 rounded-lg px-3 py-1.5 transition-colors ${showAiModelSelect ? "bg-white/20" : "bg-white/5 hover:bg-white/10"}`}
                    >
                        {chat.activeAiAgent ? (
                            <>
                                <span className="text-lg">{chat.activeAiAgent.emoji}</span>
                                <span className="text-white text-xs font-medium hidden sm:inline">{chat.activeAiAgent.name}</span>
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80">
                                    <rect x="3" y="11" width="18" height="10" rx="2" />
                                    <circle cx="12" cy="5" r="2" />
                                    <path d="M12 7v4" />
                                    <line x1="8" y1="16" x2="8" y2="16" />
                                    <line x1="16" y1="16" x2="16" y2="16" />
                                </svg>
                                <span className="text-white text-xs font-medium hidden sm:inline">Select AI</span>
                            </>
                        )}
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-white/50 transition-transform ${showAiModelSelect ? "rotate-180" : ""}`}>
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </button>

                    {showAiModelSelect && (
                        <div className="absolute right-0 top-full mt-2 w-56 bg-[#1e293b] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden" onClick={(e) => e.stopPropagation()}>
                            <div className="px-4 py-2 text-[10px] font-bold text-white/40 tracking-wider uppercase border-b border-white/5">Available Models</div>
                            <div className="py-1 max-h-[300px] overflow-y-auto custom-scrollbar">
                                {availableAgents && availableAgents.map((agent) => (
                                    <button 
                                        key={agent.id} 
                                        onClick={() => { onSelectAiAgent(chat.id, agent); setShowAiModelSelect(false); }} 
                                        className={`w-full text-left px-4 py-2.5 hover:bg-white/5 flex items-center gap-3 transition-colors group ${chat.activeAiAgent?.id === agent.id ? 'bg-white/10' : ''}`}
                                    >
                                        <div className="text-xl group-hover:scale-110 transition-transform">{agent.emoji}</div>
                                        <div>
                                            <div className="text-white text-sm font-medium">{agent.name}</div>
                                            <div className="text-white/40 text-[10px]">{agent.role}</div>
                                        </div>
                                        {chat.activeAiAgent?.id === agent.id && <i className="fa-solid fa-check ml-auto text-green-400 text-xs"></i>}
                                    </button>
                                ))}
                            </div>
                            {chat.isAiMode && (
                                <button onClick={() => { onSelectAiAgent(chat.id, null); setShowAiModelSelect(false); }} className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 text-xs transition-colors font-semibold border-t border-white/10 flex items-center gap-2">
                                    <i className="fa-solid fa-power-off"></i> Stop AI
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Chat Content */}
            <div className="flex-1 overflow-auto space-y-3 text-white/90 custom-scrollbar pr-2 p-2 flex flex-col">
                {(!displayMessages || displayMessages.length === 0) && (
                     <div className="self-center text-white/30 text-sm italic mt-10">Start chatting...</div>
                )}

                {displayMessages.map((msg, idx) => {
                    const isMe = msg.from === 'me';
                    return (
                        <div key={idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} animate-fade-in-up`}>
                            <div className={`flex items-center gap-2 mb-1 text-xs ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                                {/*  แสดงชื่อจาก currentUser.username */}
                                <span className="text-white/60 font-semibold">
                                    {isMe ? (currentUser?.username || "Me") : chat.name}
                                </span>
                                {msg.timestamp && <span className="text-white/30 text-[10px]">{msg.timestamp}</span>}
                            </div>
                            <div className={`flex gap-2 max-w-[80%] ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                                {!isMe && (
                                    <div className="w-8 h-8 rounded-full overflow-hidden shadow-md shrink-0 mt-1">
                                         {chat.imgUrl ? <img src={chat.imgUrl} className="w-full h-full object-cover"/> : <div className="w-full h-full bg-gray-500 flex items-center justify-center">{chat.avatar}</div>}
                                    </div>
                                )}
                                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm break-words ${isMe ? 'bg-purple-600 text-white rounded-tr-none' : 'bg-white/10 text-white/90 rounded-tl-none border border-white/10 backdrop-blur-sm'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        </div>
                    );
                })}
                
                <div ref={messagesEndRef} />

                {chat.isAiMode && chat.activeAiAgent && (
                    <div className="flex justify-center my-4 animate-fade-in">
                        <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-4 py-1 rounded-full text-xs flex items-center gap-2 shadow-lg backdrop-blur-md">
                            <span className="text-sm">{chat.activeAiAgent.emoji}</span>
                            <span className="font-semibold">{chat.activeAiAgent.name}</span>
                            <span>is replying...</span>
                            <span className="flex gap-1 ml-1">
                                <span className="w-1 h-1 bg-green-400 rounded-full animate-bounce"></span>
                                <span className="w-1 h-1 bg-green-400 rounded-full animate-bounce delay-75"></span>
                                <span className="w-1 h-1 bg-green-400 rounded-full animate-bounce delay-150"></span>
                            </span>
                        </span>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="mt-4 bg-[rgba(32,41,59,0.25)] relative group p-4 rounded-2xl shadow-2xs">
                <div className="input-field max-h-[300px]">
                    <textarea ref={textareaRef} style={{ height }} disabled={chat.isAiMode} onKeyDown={handleKeyDown} className="w-full border rounded p-2 resize-none max-h-[300px] bg-transparent text-white border-none outline-none disabled:cursor-not-allowed placeholder-white/30" placeholder={chat.isAiMode ? "AI is replying automatically..." : "Type a message..."} />
                    <div onMouseDown={handleMouseDown} className="absolute top-1.5 left-1/2 -translate-x-1/2 w-15 h-1 bg-white/20 rounded-full cursor-ns-resize opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="function-field flex justify-between mt-2 border-t border-white/10 pt-2">
                    <div className="left-funtion flex gap-1">
                        <div className="relative" ref={dropdownRef}> 
                            <button onClick={() => setShowAiPrompts(!showAiPrompts)} data-tooltip-id="attach-tooltip" data-tooltip-content="AI Prompt" className={`text-[18px] p-2 transition rounded-lg hover:bg-white/10 ${showAiPrompts ? 'text-purple-400 bg-white/10' : 'text-white/70 hover:text-white'}`}><i className="fa-solid fa-wand-magic-sparkles"></i></button>
                            {showAiPrompts && (
                                <div className="absolute bottom-full left-0 mb-3 w-72 bg-[#1e1e2e] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 animate-fade-in-up origin-bottom-left">
                                    <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
                                        {aiPrompts.length > 0 ? aiPrompts.map((prompt) => (<button key={prompt.id} onClick={() => handleSelectPrompt(prompt)} className="w-full text-left px-4 py-3 hover:bg-white/10 transition-colors border-b border-white/5 last:border-0 group"><div className="text-white/90 text-sm font-medium group-hover:text-white">{prompt.name}</div><div className="text-white/50 text-xs truncate group-hover:text-white/70">{prompt.action}</div></button>)) : <div className="p-4 text-center text-white/40 text-xs italic">No active prompts.</div>}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="text-white/70 hover:text-white text-[18px] p-2 transition rounded-lg hover:bg-white/10"><i className="fa-solid fa-icons"></i></button>
                            {showEmojiPicker && (<div className="absolute bottom-full left-0 mb-2 z-50"><Picker onEmojiClick={onEmojiClick} /></div>)}
                        </div>
                        <button onClick={handleAttachClick} className="text-white/70 hover:text-white text-[18px] p-2 transition rounded-lg hover:bg-white/10"><i className="fa-solid fa-paperclip"></i></button>
                        <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileChange} />
                    </div>
                    <div className="right-function">
                        <button onClick={handleSendClick} data-tooltip-id="attach-tooltip" data-tooltip-content="Send" className="text-white text-[20px] px-3 py-2 transition hover:text-purple-400"><i className="fa-solid fa-paper-plane"></i></button>
                    </div>
                </div>
                {files.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                        {files.map((file, index) => (<span key={index} className="flex items-center bg-white/10 text-white px-3 py-1 rounded-lg text-xs border border-white/10"><span className="truncate max-w-[100px]">{file.name}</span><button onClick={() => handleRemoveFile(index)} className="ml-2 text-red-400 hover:text-red-300">✕</button></span>))}
                    </div>
                )}
            </div>
            <Tooltip id="attach-tooltip" place="top" className="z-50" />
        </div>
    );
}