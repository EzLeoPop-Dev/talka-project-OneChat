"use client";
import ChatList from "@/app/components/ChatList.jsx";
import ChatMessage from '@/app/components/ChatMessage.jsx';
import ChatFitter from "@/app/components/ChatFitter";
import ControlPanel from "@/app/components/ControlPanel";
import "@/app/assets/css/other.css"
import { useState } from "react"; 

import initialChatData from "@/app/data/customerData.json";
import AddTag from "@/app/components/AddTag";
import ContactDetails from "@/app/components/ChatContactDetail"; 
import AddNote from "@/app/components/AddNote";
import AiSuppBtn from "@/app/components/AiSuppBtn";

const ALL_AVAILABLE_TAGS = ["VIP"];

const processInitialData = (data) => {
    return data.map(chat => ({
        ...chat,
        email: chat.email || null,
        country: chat.country || null,
        tags: chat.isVip ? ["VIP"] : [],
        notes: chat.notes || [] 
    }));
};

export default function ChatPage() {
    const [chats, setChats] = useState(() => processInitialData(initialChatData));
    const [selectedChatId, setSelectedChatId] = useState(null);
    const selectedChat = chats.find(chat => chat.id === selectedChatId);

    const [isAddTagModalOpen, setIsAddTagModalOpen] = useState(false);
    const [isContactDetailsOpen, setIsContactDetailsOpen] = useState(false);
    const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);

    // --- Panel Open/Close Functions ---
    const handleOpenTagModal = () => {
        if (selectedChatId) {
            setIsContactDetailsOpen(false); 
            setIsAddNoteOpen(false); 
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
            setIsAddNoteOpen(true);
        } else {
            alert("Please select a chat first.");
        }
    };
    const handleCloseAddNote = () => setIsAddNoteOpen(false);

    // --- Tag Logic ---
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

    // --- Contact Update ---
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

    // --- Note ---
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
        console.log("Note added to chat:", selectedChatId, noteData);
    };

    // ฟังก์ชันสำหรับ Delete Note
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
        console.log("Note deleted:", noteId);
    };

    return (
        <div className="container mx-auto">
            
            <ChatFitter/>

            <div className="flex ">
                <ChatList 
                    chats={chats} 
                    onSelectChat={(chat) => setSelectedChatId(chat.id)}
                    selectedId={selectedChatId} 
                />

                <ChatMessage chat={selectedChat}/>
                
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

                <ControlPanel 
                    onOpenAddTagModal={handleOpenTagModal} 
                    onOpenContactDetails={handleOpenContactDetails} 
                    onOpenAddNote={handleOpenAddNote} 
                />

                <AiSuppBtn />
            </div>
        </div>
    );
}