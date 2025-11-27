"use client";

// -----------------------------------------------------------------------------
// 1. Imports
// -----------------------------------------------------------------------------
// React & Hooks
import { useState, useEffect, useMemo } from "react"; 
import { useSearchParams } from "next/navigation";

// Components
import ChatList from "@/app/components/ChatList.jsx";
import ChatMessage from '@/app/components/ChatMessage.jsx';
import ChatFitter from "@/app/components/ChatFitter";
import ControlPanel from "@/app/components/ControlPanel";
import AddTag from "@/app/components/AddTag";
import ContactDetails from "@/app/components/ChatContactDetail"; 
import AddNote from "@/app/components/AddNote";
import AiSuppBtn from "@/app/components/AiSuppBtn";
import ChangeStatus from "@/app/components/Changestatus"; 
import AiAssistantPanel from "@/app/components/AiAssistantPanel";
import ActivityLogPanel from "@/app/components/ActivityLogPanel";
import SendToBoardModal from "@/app/components/SendToBoardModal";

// Data & Styles
import "@/app/assets/css/other.css";
import { unifiedMockData } from '@/app/data/mockData';
import { DEFAULT_TAGS } from "@/app/data/defaultTags";
import { DEFAULT_AI_PROMPTS } from "@/app/data/defaultPrompts";

// -----------------------------------------------------------------------------
// 2. Constants & Initial Data Helper
// -----------------------------------------------------------------------------
const ALL_AVAILABLE_STATUS = ["New Chat", "Open", "Pending", "Closed"];

const DEFAULT_AI_AGENTS = [
    { id: 'receptionist', name: 'Receptionist', emoji: '🛎️', role: 'Front Desk' },
    { id: 'sales', name: 'Sales Agent', emoji: '😝', role: 'Sales' },
    { id: 'support', name: 'Support Agent', emoji: '❤️', role: 'Support' },
];

const processInitialData = (data) => {
    return data.map(chat => ({
        ...chat,
        email: chat.email || null,
        country: chat.country || null,
        tags: Array.isArray(chat.tags) ? chat.tags : (chat.tags ? [chat.tags] : []),
        notes: chat.notes || [],
        status: chat.status || "New Chat",
        openTime: chat.time,
        messages: (chat.messages || []).filter(msg => msg.from !== 'me')
    }));
};

// -----------------------------------------------------------------------------
// 3. Main Component
// -----------------------------------------------------------------------------
export default function ChatPage() {
    const searchParams = useSearchParams();
    
    // --- State: Chat Data ---
    const [chats, setChats] = useState(() => processInitialData(unifiedMockData));
    const [selectedChatId, setSelectedChatId] = useState(null);
    const selectedChat = chats.find(chat => chat.id === selectedChatId);
    const [isLoaded, setIsLoaded] = useState(false); 

    // --- State: UI / Modals ---
    const [isAddTagModalOpen, setIsAddTagModalOpen] = useState(false);
    const [isContactDetailsOpen, setIsContactDetailsOpen] = useState(false);
    const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
    const [isChangeStatusOpen, setIsChangeStatusOpen] = useState(false);
    const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
    const [isActivityLogOpen, setIsActivityLogOpen] = useState(false);
    const [isSendToBoardOpen, setIsSendToBoardOpen] = useState(false); // ✅ State สำหรับ Modal Board

    // --- State: Filters & Settings ---
    const [activeFilter, setActiveFilter] = useState("All");
    const [activeCompanyFilter, setActiveCompanyFilter] = useState(null);
    const [currentUser, setCurrentUser] = useState({ name: "Admin", role: "Admin", avatar: "A" });

    // --- State: Dynamic Data (From LocalStorage) ---
    const [activityLogs, setActivityLogs] = useState([]); 
    const [activePrompts, setActivePrompts] = useState([]);
    const [availableAgents, setAvailableAgents] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);

    // -------------------------------------------------------------------------
    // 4. Effects (Data Loading & Saving)
    // -------------------------------------------------------------------------

    // โหลดข้อมูล User
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("currentUser");
            if (storedUser) {
                const user = JSON.parse(storedUser);
                setCurrentUser({
                    name: user.username || "Admin",
                    role: user.role || "Employee",
                    avatar: (user.username || "A").charAt(0).toUpperCase()
                });
            }
        } catch (error) { console.error("Error loading user:", error); }
    }, []);

    // โหลด/เซฟ Chat Data
    useEffect(() => {
        const savedChats = localStorage.getItem("onechat_data"); 
        if (savedChats) {
            try { setChats(JSON.parse(savedChats)); } 
            catch (e) { console.error("Error loading chat data:", e); }
        } else {
            setChats(processInitialData(unifiedMockData));
            localStorage.setItem("onechat_data", JSON.stringify(processInitialData(unifiedMockData)));
        }
        setIsLoaded(true); 
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("onechat_data", JSON.stringify(chats));
            window.dispatchEvent(new Event("chat-data-updated"));
        }
    }, [chats, isLoaded]);

    // โหลด AI Agents
    useEffect(() => {
        const savedAgents = localStorage.getItem("onechat_ai_agents");
        if (savedAgents) {
            setAvailableAgents(JSON.parse(savedAgents));
        } else {
            setAvailableAgents(DEFAULT_AI_AGENTS);
            localStorage.setItem("onechat_ai_agents", JSON.stringify(DEFAULT_AI_AGENTS));
        }
    }, []);

    // โหลด AI Prompts
    useEffect(() => {
        const savedPrompts = localStorage.getItem("onechat_prompts");
        let allPrompts = [];
        if (savedPrompts) {
            allPrompts = JSON.parse(savedPrompts);
        } else {
            allPrompts = DEFAULT_AI_PROMPTS;
            localStorage.setItem("onechat_prompts", JSON.stringify(DEFAULT_AI_PROMPTS));
        }
        setActivePrompts(allPrompts.filter(p => p.active === true));
    }, []);

    // โหลด Activity Logs
    useEffect(() => {
        const savedLogs = localStorage.getItem("onechat_activity_logs");
        if (savedLogs) setActivityLogs(JSON.parse(savedLogs));
    }, []);

    useEffect(() => {
        if (isLoaded) localStorage.setItem("onechat_activity_logs", JSON.stringify(activityLogs));
    }, [activityLogs, isLoaded]);

    // โหลด Available Tags
    useEffect(() => {
        const savedTags = localStorage.getItem("onechat_tags");
        if (savedTags) {
            setAvailableTags(JSON.parse(savedTags)); 
        } else {
            setAvailableTags(DEFAULT_TAGS);
            localStorage.setItem("onechat_tags", JSON.stringify(DEFAULT_TAGS));
        }
    }, []);

    useEffect(() => {
        if (isLoaded) {
            const urlId = searchParams.get('id');
            if (urlId) {
                const idNum = parseInt(urlId);
                const targetChat = chats.find(c => c.id === idNum);
            
                if (targetChat) {
                    setSelectedChatId(idNum);

                    if (targetChat.status === 'New Chat') {
                        setChats(prev => prev.map(c => 
                            c.id === idNum ? { ...c, status: 'Open', unreadCount: 0 } : c
                        ));
                    }
                }
            }
        }
    }, [searchParams, isLoaded, chats]);

    useEffect(() => {
        if (isLoaded && selectedChatId) {
            const currentChat = chats.find(c => c.id === selectedChatId);
            
            if (currentChat && currentChat.status === "New Chat") {
                setChats(prevChats => 
                    prevChats.map(chat => 
                        chat.id === selectedChatId 
                            ? { ...chat, status: "Open", unreadCount: 0 }
                            : chat
                    )
                );
            }
        }
    }, [selectedChatId, isLoaded, chats]);

    // -------------------------------------------------------------------------
    // 5. Handlers (Logic Functions)
    // -------------------------------------------------------------------------

    // --- Helper Functions ---
    const addLog = (chatId, type, detail) => {
        if (!chatId) return;
        const newLog = {
            id: Date.now() + Math.random(), 
            chatId, 
            type,     
            detail, 
            timestamp: new Date().toISOString(),
            by: currentUser.name
        };
        setActivityLogs(prev => [...prev, newLog]);
    };

    const closeAllPanels = () => {
        setIsAddTagModalOpen(false);
        setIsContactDetailsOpen(false);
        setIsAddNoteOpen(false);
        setIsChangeStatusOpen(false);
        setIsActivityLogOpen(false); 
        setIsSendToBoardOpen(false); 
    };

    // --- Panel Open/Close ---
    const handleOpenTagModal = () => {
        if (selectedChatId) { closeAllPanels(); setIsAddTagModalOpen(true); } 
        else { alert("Please select a chat first."); }
    };
    const handleCloseTagModal = () => setIsAddTagModalOpen(false);

    const handleOpenContactDetails = () => {
        if (selectedChatId) { closeAllPanels(); setIsContactDetailsOpen(true); } 
        else { alert("Please select a chat first."); }
    };
    const handleCloseContactDetails = () => setIsContactDetailsOpen(false);

    const handleOpenAddNote = () => {
        if (selectedChatId) { closeAllPanels(); setIsAddNoteOpen(true); } 
        else { alert("Please select a chat first."); }
    };
    const handleCloseAddNote = () => setIsAddNoteOpen(false);

    const handleOpenChangeStatus = () => {
        if (selectedChatId) { closeAllPanels(); setIsChangeStatusOpen(true); } 
        else { alert("Please select a chat first."); }
    };
    const handleCloseChangeStatus = () => setIsChangeStatusOpen(false);

    const handleOpenActivityLog = () => {
        if (selectedChatId) { closeAllPanels(); setIsActivityLogOpen(true); } 
        else { alert("Please select a chat first."); }
    };
    const handleCloseActivityLog = () => setIsActivityLogOpen(false);

    // ✅ ฟังก์ชันเปิด Modal Send To Board
    const handleOpenSendToBoard = () => {
        if (selectedChatId) {
            closeAllPanels();
            setIsSendToBoardOpen(true);
        } else {
            alert("Please select a chat first.");
        }
    };

    // --- Data Updates ---
    
    // เปลี่ยน Tag (เลือกได้แค่อันเดียว)
    const handleToggleTag = (tagName) => {
        if (!selectedChat) return;
        setChats(currentChats =>
            currentChats.map(chat => {
                if (chat.id === selectedChat.id) {
                    const currentTags = Array.isArray(chat.tags) ? chat.tags : [];
                    const isSelected = currentTags.includes(tagName);
                    
                    addLog(chat.id, 'tag', isSelected ? `Removed tag "${tagName}"` : `Changed tag to "${tagName}"`);
                    
                    const newTags = isSelected ? [] : [tagName];
                    return { ...chat, tags: newTags }; 
                }
                return chat; 
            })
        );
    };

    // เปลี่ยน Status
    const handleUpdateStatus = (newStatus) => {
        if (!selectedChat) return;
        if (selectedChat.status !== newStatus) {
            addLog(selectedChat.id, 'status', `Changed status from "${selectedChat.status}" to "${newStatus}"`);
        }
        setChats(currentChats =>
            currentChats.map(chat => 
                chat.id === selectedChat.id ? { ...chat, status: newStatus } : chat
            )
        );
    };

    // แก้ไขข้อมูลติดต่อ
    const handleUpdateContactInfo = (contactId, updatedInfo) => {
        const key = Object.keys(updatedInfo)[0];
        const value = updatedInfo[key];
        addLog(contactId, 'contact', `Updated ${key} to "${value}"`);
        setChats(currentChats =>
            currentChats.map(chat => 
                chat.id === contactId ? { ...chat, ...updatedInfo } : chat
            )
        );
    };

    // เพิ่ม Note
    const handleAddNote = (noteData) => {
        if (!selectedChatId) return;
        addLog(selectedChatId, 'note', `Added note: "${noteData.title}"`);
        setChats(currentChats =>
            currentChats.map(chat => {
                if (chat.id === selectedChatId) {
                    const currentNotes = Array.isArray(chat.notes) ? chat.notes : [];
                    return { ...chat, notes: [...currentNotes, noteData] };
                }
                return chat;
            })
        );
    };

    // ลบ Note
    const handleDeleteNote = (noteId) => {
        if (!selectedChatId) return;
        addLog(selectedChatId, 'note', `Deleted a note`);
        setChats(currentChats =>
            currentChats.map(chat => {
                if (chat.id === selectedChatId) {
                    const updatedNotes = chat.notes.filter(note => note.id !== noteId);
                    return { ...chat, notes: updatedNotes };
                }
                return chat;
            })
        );
    };

    // ส่งข้อความ
    const handleSendMessage = (chatId, text) => {
        if (!chatId || !text.trim()) return;
        addLog(chatId, 'message', `Sent message: "${text.substring(0, 20)}${text.length > 20 ? '...' : ''}"`);

        setChats(currentChats =>
            currentChats.map(chat => {
                if (chat.id === chatId) {
                    const newMessage = {
                        from: "me",
                        text: text,
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    };
                    const updatedMessages = chat.messages ? [...chat.messages, newMessage] : [newMessage];
                    
                    return { 
                        ...chat, 
                        messages: updatedMessages,
                        message: text, 
                        time: newMessage.time 
                    };
                }
                return chat;
            })
        );
    };

    // เลือก AI Agent
    const handleSelectAiAgent = (chatId, agent) => {
        if (!chatId) return;
        setChats(currentChats =>
            currentChats.map(chat => 
                chat.id === chatId ? { ...chat, activeAiAgent: agent, isAiMode: !!agent } : chat
            )
        );
    };

    // -------------------------------------------------------------------------
    // 6. Data Processing (Filter & Sort)
    // -------------------------------------------------------------------------
    const handleFilterChange = (filterValue) => setActiveFilter(filterValue);

    const availableCompanies = useMemo(() => {
        return [...new Set(chats.map(c => c.company).filter(Boolean))];
    }, [chats]);

    const statusPriority = { "New Chat": 1, "Open": 2, "Pending": 2, "Closed": 3 };
    
    const filteredChats = chats
        .filter(chat => {
            const statusMatch = activeFilter === "All" || chat.status === activeFilter;
            const companyMatch = !activeCompanyFilter || chat.company === activeCompanyFilter;
            return statusMatch && companyMatch; 
        })
        .sort((a, b) => {
            const priorityA = statusPriority[a.status] || 2;
            const priorityB = statusPriority[b.status] || 2;
            return priorityA - priorityB;
        });

    // -------------------------------------------------------------------------
    // 7. Render UI
    // -------------------------------------------------------------------------

    // Loading Check
    if (!isLoaded) {
        return <div className="text-white text-center mt-20 animate-pulse">Loading Chat Data...</div>;
    }

    return (
        <div className="container mx-auto">
            
            {/* Top Bar Filter */}
            <ChatFitter 
                onFilterChange={handleFilterChange} 
                availableCompanies={availableCompanies}
                onCompanyChange={setActiveCompanyFilter}
            />

            <div className="flex">
                {/* Left: Chat List */}
                <ChatList 
                    chats={filteredChats} 
                    onSelectChat={(chat) => setSelectedChatId(chat.id)}
                    selectedId={selectedChatId} 
                    availableTags={availableTags}
                />

                {/* Center: Chat Message Area */}
                <ChatMessage 
                    chat={selectedChat}
                    availableAgents={availableAgents} 
                    onSelectAiAgent={handleSelectAiAgent}
                    aiPrompts={activePrompts} 
                    currentUser={currentUser}
                    onSendMessage={handleSendMessage}
                    availableTags={availableTags}
                />
                
                {/* Right: Dynamic Panels */}
                {isAddTagModalOpen && (
                    <AddTag 
                        onClose={handleCloseTagModal}
                        availableTags={availableTags} 
                        currentTargets={selectedChat ? selectedChat.tags : []}
                        onToggleTag={handleToggleTag}
                    />
                )}

                {isContactDetailsOpen && (
                    <ContactDetails
                        onClose={handleCloseContactDetails}
                        contact={selectedChat}
                        onUpdateContact={handleUpdateContactInfo} 
                    />
                )}

                {isAddNoteOpen && (
                    <AddNote
                        onClose={handleCloseAddNote}
                        onSaveNote={handleAddNote}
                        currentNotes={selectedChat ? selectedChat.notes : []}
                        onDeleteNote={handleDeleteNote}
                    />
                )}

                {isChangeStatusOpen && (
                    <ChangeStatus
                        onClose={handleCloseChangeStatus}
                        availableStatus={ALL_AVAILABLE_STATUS}
                        currentTargets={selectedChat?.status ? [selectedChat.status] : []} 
                        onToggleStatus={handleUpdateStatus}
                    />
                )}

                {isActivityLogOpen && (
                    <ActivityLogPanel 
                        onClose={handleCloseActivityLog}
                        logs={activityLogs.filter(log => log.chatId === selectedChatId)}
                    />
                )}
                
                {/* Control Panel (Right Side) */}
                {selectedChatId && (
                    <ControlPanel 
                        onOpenAddTagModal={handleOpenTagModal} 
                        onOpenContactDetails={handleOpenContactDetails} 
                        onOpenAddNote={handleOpenAddNote} 
                        onOpenChangeStatus={handleOpenChangeStatus}
                        onOpenActivityLog={handleOpenActivityLog}
                        onOpenSendToBoard={handleOpenSendToBoard} // ✅ ส่งฟังก์ชันนี้ไป
                    />
                )}

                {/* AI Assistant (Bottom Right) */}
                {isAiAssistantOpen && (
                    <AiAssistantPanel 
                        onClose={() => setIsAiAssistantOpen(false)}
                        availableAgents={availableAgents} 
                    />
                )}

                {/* AI Toggle Button */}
                <AiSuppBtn 
                    onClick={() => setIsAiAssistantOpen(!isAiAssistantOpen)} 
                    isOpen={isAiAssistantOpen} 
                />
            </div>


            {isSendToBoardOpen && selectedChat && (
                <SendToBoardModal 
                    onClose={() => setIsSendToBoardOpen(false)} 
                    chat={selectedChat} 
                />
            )}
            
        </div>
    );
}