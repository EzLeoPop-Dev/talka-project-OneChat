"use client";
import ChatList from "@/app/components/ChatList.jsx";
import ChatMessage from '@/app/components/ChatMessage.jsx';
import ChatFitter from "@/app/components/ChatFitter";
import ControlPanel from "@/app/components/ControlPanel";
import "@/app/assets/css/other.css"
import { useState, useEffect } from "react"; 

import initialChatData from "@/app/data/customerData.json";
import AddTag from "@/app/components/AddTag";
import ContactDetails from "@/app/components/ChatContactDetail"; 
import AddNote from "@/app/components/AddNote";
import AiSuppBtn from "@/app/components/AiSuppBtn";
import ChangeStatus from "@/app/components/Changestatus"; 

const ALL_AVAILABLE_TAGS = ["VIP"];
const ALL_AVAILABLE_STATUS = ["New Chat", "Open", "Pending", "Closed"];
const CHANNEL_FILTER = "Line";

const processInitialData = (data) => {
    return data.map(chat => ({
        ...chat,
        email: chat.email || null,
        country: chat.country || null,
        tags: chat.isVip ? ["VIP"] : [],
        notes: chat.notes || [],
        status: chat.status || "New Chat" // กำหนดค่าเริ่มต้นถ้าไม่มี
    }));
};

export default function ChatPage() {
    const [chats, setChats] = useState(() => processInitialData(initialChatData));
    const [selectedChatId, setSelectedChatId] = useState(null);
    const selectedChat = chats.find(chat => chat.id === selectedChatId);

    const [isAddTagModalOpen, setIsAddTagModalOpen] = useState(false);
    const [isContactDetailsOpen, setIsContactDetailsOpen] = useState(false);
    const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
    const [isChangeStatusOpen, setIsChangeStatusOpen] = useState(false);

    const [activeFilter, setActiveFilter] = useState("All");

    const [isLoaded, setIsLoaded] = useState(false); 

    {/* Load Data */}
    useEffect(() => {
        const savedChats = localStorage.getItem("onechat_data"); 
        if (savedChats) {
            try {
                setChats(JSON.parse(savedChats)); 
            } catch (error) {
                console.error("Error loading data:", error);
            }
        }
        setIsLoaded(true); 
    }, []);

    {/* Save Data */}
    useEffect(() => {
        if (isLoaded) { 
            localStorage.setItem("onechat_data", JSON.stringify(chats));
        }
    }, [chats, isLoaded]);

    const handleFilterChange = (filterValue) => {
        setActiveFilter(filterValue);
    };

    // --- Panel Open/Close Functions ---
    const handleOpenTagModal = () => {
        if (selectedChatId) {
            setIsContactDetailsOpen(false); 
            setIsAddNoteOpen(false); 
            setIsChangeStatusOpen(false); 
            setIsAddTagModalOpen(true);
        } else {
            alert("Please select a chat first.");
        }
    };
    const handleCloseTagModal = () => setIsAddTagModalOpen(false);

    const handleOpenContactDetails = () => {
        if (selectedChatId) {
            setIsAddTagModalOpen(false); 
            setIsAddNoteOpen(false); 
            setIsChangeStatusOpen(false); 
            setIsContactDetailsOpen(true);
        } else {
            alert("Please select a chat first.");
        }
    };
    const handleCloseContactDetails = () => setIsContactDetailsOpen(false);

    const handleOpenAddNote = () => {
        if (selectedChatId) {
            setIsAddTagModalOpen(false); 
            setIsContactDetailsOpen(false); 
            setIsChangeStatusOpen(false); 
            setIsAddNoteOpen(true);
        } else {
            alert("Please select a chat first.");
        }
    };
    const handleCloseAddNote = () => setIsAddNoteOpen(false);

    const handleOpenChangeStatus = () => {
        if (selectedChatId) {
            setIsAddTagModalOpen(false); 
            setIsContactDetailsOpen(false); 
            setIsAddNoteOpen(false);
            setIsChangeStatusOpen(true);
        } else {
            alert("Please select a chat first.");
        }
    };
    const handleCloseChangeStatus = () => setIsChangeStatusOpen(false);

    const handleToggleTag = (tagName) => {
        if (!selectedChat) return;
        setChats(currentChats =>
            currentChats.map(chat => {
                if (chat.id === selectedChat.id) {
                    const hasTag = chat.tags.includes(tagName);
                    const newTags = hasTag ? chat.tags.filter(t => t !== tagName) : [...chat.tags, tagName];
                    return { ...chat, tags: newTags }; 
                }
                return chat; 
            })
        );
    };

    const handleUpdateStatus = (newStatus) => {
        if (!selectedChat) return;
        setChats(currentChats =>
            currentChats.map(chat => {
                if (chat.id === selectedChat.id) {
                    return { ...chat, status: newStatus };
                }
                return chat; 
            })
        );
    };

    const handleUpdateContactInfo = (contactId, updatedInfo) => {
        setChats(currentChats =>
            currentChats.map(chat => {
                if (chat.id === contactId) {
                    return { ...chat, ...updatedInfo };
                }
                return chat;
            })
        );
    };

    const handleAddNote = (noteData) => {
        if (!selectedChatId) return;
        setChats(currentChats =>
            currentChats.map(chat => {
                if (chat.id === selectedChatId) {
                    const newNotes = [...chat.notes, noteData];
                    return { ...chat, notes: newNotes };
                }
                return chat;
            })
        );
    };

    const handleDeleteNote = (noteId) => {
        if (!selectedChatId) return;
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

    const channelFilteredChats = chats.filter(chat => chat.channel === CHANNEL_FILTER);

    const finalFilteredChats = channelFilteredChats.filter(chat => {
        if (activeFilter === "All") {
            return true; 
        }
        return chat.status === activeFilter; 
    });

    const handleToggleAiMode = (chatId) => {
        if (!chatId) return;
        setChats(currentChats =>
            currentChats.map(chat => {
                if (chat.id === chatId) {
                    return { ...chat, isAiMode: !chat.isAiMode };
                }
                return chat;
            })
        );
    };
    
    return (
            <div className="container mx-auto">
                
                <ChatFitter onFilterChange={handleFilterChange} />
    
                <div className="flex ">
                    <ChatList 
                        chats={finalFilteredChats} 
                        onSelectChat={(chat) => setSelectedChatId(chat.id)}
                        selectedId={selectedChatId} 
                    />
    
                    <ChatMessage 
                        chat={selectedChat}
                        onToggleAiMode={handleToggleAiMode}
                    />
                    
                    {isAddTagModalOpen && (
                        <AddTag 
                            onClose={handleCloseTagModal}
                            availableTags={ALL_AVAILABLE_TAGS}
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
                    
                    {selectedChatId && (
                        <ControlPanel 
                            onOpenAddTagModal={handleOpenTagModal} 
                            onOpenContactDetails={handleOpenContactDetails} 
                            onOpenAddNote={handleOpenAddNote} 
                            onOpenChangeStatus={handleOpenChangeStatus}
                        />
                    )}
    
                    <AiSuppBtn />
                </div>
            </div>
        );
    }