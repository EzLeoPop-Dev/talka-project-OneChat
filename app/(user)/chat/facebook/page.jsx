"use client";

import { useState, useEffect, useMemo, Suspense } from "react"; 
import { useSearchParams } from "next/navigation";

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

import "@/app/assets/css/other.css";
import { unifiedMockData } from '@/app/data/mockData';
import { DEFAULT_TAGS } from "@/app/data/defaultTags";
import { DEFAULT_AI_PROMPTS } from "@/app/data/defaultPrompts";

const CHANNEL_FILTER = "Facebook"; 
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
        notes: Array.isArray(chat.notes) ? chat.notes : [],
        status: chat.status || "New Chat",
        openTime: chat.time,
        messages: (chat.messages || []).filter(msg => msg.from !== 'me')
    }));
};

function FacebookChatContent() {
    const searchParams = useSearchParams();
    
    //States
    const [chats, setChats] = useState(() => processInitialData(unifiedMockData));
    const [selectedChatId, setSelectedChatId] = useState(null);
    const selectedChat = chats.find(chat => chat.id === selectedChatId);
    const [isLoaded, setIsLoaded] = useState(false); 

    // Panels 
    const [isAddTagModalOpen, setIsAddTagModalOpen] = useState(false);
    const [isContactDetailsOpen, setIsContactDetailsOpen] = useState(false);
    const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
    const [isChangeStatusOpen, setIsChangeStatusOpen] = useState(false);
    const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
    const [isActivityLogOpen, setIsActivityLogOpen] = useState(false);

    // Filters & Data 
    const [activeFilter, setActiveFilter] = useState("All");
    const [activeCompanyFilter, setActiveCompanyFilter] = useState(null);
    const [activityLogs, setActivityLogs] = useState([]); 
    const [activePrompts, setActivePrompts] = useState([]);
    const [availableAgents, setAvailableAgents] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);
    const [currentUser, setCurrentUser] = useState({ name: "Admin", role: "Admin", avatar: "A" });

    // Load User
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
        } catch (e) { console.error(e); }
    }, []);

    // Load/Save Chat Data
    useEffect(() => {
        const savedChats = localStorage.getItem("onechat_data"); 
        if (savedChats) {
            try { setChats(JSON.parse(savedChats)); } catch (e) { console.error(e); }
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

    // Load Agents
    useEffect(() => {
        const savedAgents = localStorage.getItem("onechat_ai_agents");
        if (savedAgents) setAvailableAgents(JSON.parse(savedAgents));
        else setAvailableAgents(DEFAULT_AI_AGENTS);
    }, []);

    // Load Prompts
    useEffect(() => {
        const savedPrompts = localStorage.getItem("onechat_prompts");
        let allPrompts = savedPrompts ? JSON.parse(savedPrompts) : DEFAULT_AI_PROMPTS;
        setActivePrompts(allPrompts.filter(p => p.active === true));
    }, []);

    // Load Tags
    useEffect(() => {
        const savedTags = localStorage.getItem("onechat_tags");
        if (savedTags) setAvailableTags(JSON.parse(savedTags));
        else setAvailableTags(DEFAULT_TAGS);
    }, []);

    // Load/Save Logs
    useEffect(() => {
        const savedLogs = localStorage.getItem("onechat_activity_logs");
        if (savedLogs) setActivityLogs(JSON.parse(savedLogs));
    }, []);

    useEffect(() => {
        if (isLoaded && activityLogs.length > 0) 
            localStorage.setItem("onechat_activity_logs", JSON.stringify(activityLogs));
    }, [activityLogs, isLoaded]);

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

    const addLog = (chatId, type, detail) => {
        if (!chatId) return;
        const newLog = {
            id: Date.now() + Math.random(),
            chatId, type, detail, 
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
    };

    // Open/Close Modals 
    const handleOpenTagModal = () => { if(selectedChatId) { closeAllPanels(); setIsAddTagModalOpen(true); } else alert("Select a chat first."); };
    const handleCloseTagModal = () => setIsAddTagModalOpen(false);

    const handleOpenContactDetails = () => { if(selectedChatId) { closeAllPanels(); setIsContactDetailsOpen(true); } else alert("Select a chat first."); };
    const handleCloseContactDetails = () => setIsContactDetailsOpen(false);

    const handleOpenAddNote = () => { if(selectedChatId) { closeAllPanels(); setIsAddNoteOpen(true); } else alert("Select a chat first."); };
    const handleCloseAddNote = () => setIsAddNoteOpen(false);

    const handleOpenChangeStatus = () => { if(selectedChatId) { closeAllPanels(); setIsChangeStatusOpen(true); } else alert("Select a chat first."); };
    const handleCloseChangeStatus = () => setIsChangeStatusOpen(false);

    const handleOpenActivityLog = () => { if(selectedChatId) { closeAllPanels(); setIsActivityLogOpen(true); } else alert("Select a chat first."); };
    const handleCloseActivityLog = () => setIsActivityLogOpen(false);


    //Logic Updates
    const handleToggleTag = (tagName) => {
        if (!selectedChat) return;
        setChats(prev => prev.map(chat => {
            if (chat.id === selectedChat.id) {
                const currentTags = Array.isArray(chat.tags) ? chat.tags : [];
                const isSelected = currentTags.includes(tagName);
                addLog(chat.id, 'tag', isSelected ? `Removed tag "${tagName}"` : `Changed tag to "${tagName}"`);
                const newTags = isSelected ? [] : [tagName];
                return { ...chat, tags: newTags }; 
            }
            return chat; 
        }));
    };

    const handleUpdateStatus = (newStatus) => {
        if (!selectedChat) return;
        if (selectedChat.status !== newStatus) addLog(selectedChat.id, 'status', `Changed status to "${newStatus}"`);
        setChats(prev => prev.map(c => c.id === selectedChat.id ? { ...c, status: newStatus } : c));
    };

    const handleUpdateContactInfo = (contactId, info) => {
        const key = Object.keys(info)[0];
        addLog(contactId, 'contact', `Updated ${key} to "${info[key]}"`);
        setChats(prev => prev.map(c => c.id === contactId ? { ...c, ...info } : c));
    };

    const handleAddNote = (noteData) => {
        if (!selectedChatId) return;
        addLog(selectedChatId, 'note', `Added note: "${noteData.title}"`);
        setChats(prev => prev.map(c => {
            if (c.id === selectedChatId) {
                const currentNotes = Array.isArray(c.notes) ? c.notes : [];
                return { ...c, notes: [...currentNotes, noteData] };
            }
            return c;
        }));
    };

    const handleDeleteNote = (noteId) => {
        if (!selectedChatId) return;
        addLog(selectedChatId, 'note', `Deleted a note`);
        setChats(prev => prev.map(c => 
            c.id === selectedChatId ? { ...c, notes: c.notes.filter(n => n.id !== noteId) } : c
        ));
    };

    const handleSendMessage = (chatId, text) => {
        if (!chatId || !text.trim()) return;
        addLog(chatId, 'message', `Sent message: "${text.substring(0, 20)}..."`);
        setChats(prev => prev.map(c => {
            if (c.id === chatId) {
                const newMsg = { from: "me", text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
                return { ...c, messages: [...(c.messages || []), newMsg], message: text, time: newMsg.time };
            }
            return c;
        }));
    };

    const handleSelectAiAgent = (chatId, agent) => {
        if (!chatId) return;
        setChats(prev => prev.map(c => c.id === chatId ? { ...c, activeAiAgent: agent, isAiMode: !!agent } : c));
    };

    const handleSelectChat = (chat) => {
        if (selectedChatId === chat.id) { setSelectedChatId(null); closeAllPanels(); }
        else { setSelectedChatId(chat.id); }
    };

    const availableCompanies = useMemo(() => [...new Set(chats.map(c => c.company).filter(Boolean))], [chats]);

    // Filter 
    const channelFilteredChats = chats.filter(chat => chat.channel === CHANNEL_FILTER);

    //Filter by Status & Company
    const finalFilteredChats = channelFilteredChats
        .filter(chat => {
            const statusMatch = activeFilter === "All" || chat.status === activeFilter;
            const companyMatch = !activeCompanyFilter || chat.company === activeCompanyFilter;
            return statusMatch && companyMatch; 
        })
        .sort((a, b) => {
            const statusPriority = { "New Chat": 1, "Open": 2, "Pending": 2, "Closed": 3 };
            return (statusPriority[a.status] || 2) - (statusPriority[b.status] || 2);
        });

// render
    if (!isLoaded) return <div className="text-white text-center mt-20 animate-pulse">Loading...</div>;

    return (
        <div className="container mx-auto ">
            
            <ChatFitter 
                onFilterChange={setActiveFilter} 
                availableCompanies={availableCompanies}
                onCompanyChange={setActiveCompanyFilter}
            />

            <div className="flex">
                <ChatList 
                    chats={finalFilteredChats} 
                    onSelectChat={handleSelectChat}
                    selectedId={selectedChatId} 
                    availableTags={availableTags}
                />

                <ChatMessage 
                    chat={selectedChat}
                    availableAgents={availableAgents} 
                    onSelectAiAgent={handleSelectAiAgent}
                    aiPrompts={activePrompts} 
                    currentUser={currentUser}
                    onSendMessage={handleSendMessage}
                    availableTags={availableTags}
                />
                
                {/* Panels */}
                {isAddTagModalOpen && 
                    <AddTag 
                        onClose={handleCloseTagModal} 
                        availableTags={availableTags} 
                        currentTargets={selectedChat ? selectedChat.tags : []} 
                        onToggleTag={handleToggleTag} 
                    />
                }

                {isContactDetailsOpen && 
                    <ContactDetails 
                        onClose={handleCloseContactDetails} 
                        contact={selectedChat} 
                        onUpdateContact={handleUpdateContactInfo} 
                    />
                }

                {isAddNoteOpen && 
                    <AddNote 
                        onClose={handleCloseAddNote} 
                        onSaveNote={handleAddNote} 
                        currentNotes={selectedChat ? selectedChat.notes : []} 
                        onDeleteNote={handleDeleteNote} 
                    />
                }

                {isChangeStatusOpen && 
                    <ChangeStatus 
                        onClose={handleCloseChangeStatus} 
                        availableStatus={ALL_AVAILABLE_STATUS} 
                        currentTargets={selectedChat?.status ? [selectedChat.status] : []} 
                        onToggleStatus={handleUpdateStatus} 
                    />
                }

                {isActivityLogOpen && 
                    <ActivityLogPanel 
                        onClose={handleCloseActivityLog} 
                        logs={activityLogs.filter(log => log.chatId === selectedChatId)} 
                    />
                }
                
                {selectedChatId && (
                    <ControlPanel 
                        onOpenAddTagModal={handleOpenTagModal} 
                        onOpenContactDetails={handleOpenContactDetails} 
                        onOpenAddNote={handleOpenAddNote} 
                        onOpenChangeStatus={handleOpenChangeStatus}
                        onOpenActivityLog={handleOpenActivityLog}
                    />
                )}

                {isAiAssistantOpen && <AiAssistantPanel onClose={() => setIsAiAssistantOpen(false)} availableAgents={availableAgents} />}
                <AiSuppBtn onClick={() => setIsAiAssistantOpen(!isAiAssistantOpen)} isOpen={isAiAssistantOpen} />
            </div>
        </div>
    );
}

export default function FacebookChatPage() {
    return (
        <Suspense fallback={<div className="text-white text-center mt-20 animate-pulse">Loading Chat...</div>}>
            <FacebookChatContent />
        </Suspense>
    );
}