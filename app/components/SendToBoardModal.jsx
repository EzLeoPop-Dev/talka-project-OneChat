"use client";
import { useState, useEffect } from "react";

export default function SendToBoardModal({ onClose, chat }) {
    const [columns, setColumns] = useState([]);
    const [selectedColId, setSelectedColId] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const savedColumns = localStorage.getItem("app_board_columns");
        if (savedColumns) {
            try {
                const parsed = JSON.parse(savedColumns);
                setColumns(parsed);
                if (parsed.length > 0) setSelectedColId(parsed[0].id);
            } catch (e) {
                console.error("Error loading columns", e);
            }
        } else {
            const defaultCols = [{ id: "col-1", title: "Inbox" }];
            setColumns(defaultCols);
            setSelectedColId("col-1");
        }
    }, []);

    const handleConfirm = () => {
        if (!selectedColId || !chat) return;
        setIsLoading(true);

        try {
            const savedChats = localStorage.getItem("app_board_chats");
            let boardChats = savedChats ? JSON.parse(savedChats) : [];

            // Check existing
            const existingIndex = boardChats.findIndex(c => c.id == chat.id);

            const newBoardChat = {
                ...chat,
                id: chat.id,
                columnId: selectedColId,
                platform: chat.platform || (chat.channel === 'Line' ? 'line' : 'facebook'),
                lastMessage: chat.messages && chat.messages.length > 0 
                    ? chat.messages[chat.messages.length - 1].text 
                    : (chat.message || "No messages"),
                tags: chat.tags || [],
                notes: chat.notes || [],
                messages: chat.messages || []
            };

            if (existingIndex !== -1) {
                boardChats[existingIndex] = newBoardChat;
            } else {
                boardChats.push(newBoardChat);
            }

            localStorage.setItem("app_board_chats", JSON.stringify(boardChats));

            // ✅ เพิ่มส่วนนี้: บันทึก Activity Log
            const savedLogs = localStorage.getItem("onechat_activity_logs");
            const activityLogs = savedLogs ? JSON.parse(savedLogs) : [];
            const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
            
            // หาชื่อ List ที่ส่งไป เพื่อใส่ใน Log ให้ละเอียด
            const targetCol = columns.find(c => c.id === selectedColId);
            const colName = targetCol ? targetCol.title : "Board";

            const newLog = {
                id: Date.now(),
                chatId: chat.id,
                type: 'status', // ใช้ type 'status' จะได้ขึ้นไอคอนนาฬิกาสีฟ้า หรือจะใช้ type อื่นก็ได้
                detail: `Moved chat to list: "${colName}"`,
                timestamp: new Date().toISOString(),
                by: currentUser.username || currentUser.name || "Admin" // ดึงชื่อ User
            };

            activityLogs.push(newLog);
            localStorage.setItem("onechat_activity_logs", JSON.stringify(activityLogs));

            // ส่งสัญญาณให้หน้าอื่น (และหน้า Activity Log) รีเฟรชข้อมูล
            window.dispatchEvent(new Event("storage"));
            
            setTimeout(() => {
                setIsLoading(false);
                onClose(); 
            }, 300);

        } catch (error) {
            console.error("Error sending to board:", error);
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div className="bg-[#1E1E1E] border border-white/10 rounded-2xl p-6 w-[400px] shadow-2xl flex flex-col relative" onClick={e => e.stopPropagation()}>
                
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-white">Send to Board</h3>
                    <button onClick={onClose} className="text-white/50 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                </div>

                <div className="text-white/70 text-sm mb-4">
                    Select a list to move <b>{chat.name}</b> to:
                </div>

                <div className="space-y-2 mb-6 max-h-[200px] overflow-y-auto custom-scrollbar">
                    {columns.map((col) => (
                        <button
                            key={col.id}
                            onClick={() => setSelectedColId(col.id)}
                            className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                                selectedColId === col.id 
                                ? "bg-purple-600/20 border-purple-500 text-white" 
                                : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                            }`}
                        >
                            <span className="font-medium">{col.title}</span>
                            {selectedColId === col.id && (
                                <span className="bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                <button
                    onClick={handleConfirm}
                    disabled={isLoading}
                    className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {isLoading ? "Saving..." : "Confirm"}
                </button>

            </div>
        </div>
    );
}