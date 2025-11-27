"use client";
import ChatList from "@/app/components/ChatList.jsx";
import ChatMessage from "@/app/components/ChatMessage.jsx";
import ChatFitter from "@/app/components/ChatFitter";
import ControlPanel from "@/app/components/ControlPanel";
import "@/app/assets/css/other.css";
import { useState, useEffect } from "react";

import initialChatData from "@/app/data/mockData.js";
import AddTag from "@/app/components/AddTag";
import ContactDetails from "@/app/components/ChatContactDetail";
import AddNote from "@/app/components/AddNote";
import AiSuppBtn from "@/app/components/AiSuppBtn";
import ChangeStatus from "@/app/components/Changestatus";
import AiAssistantPanel from "@/app/components/AiAssistantPanel";
import ActivityLogPanel from "@/app/components/ActivityLogPanel";
import SendToBoardModal from "@/app/components/SendToBoardModal";

import { DEFAULT_AI_PROMPTS } from "@/app/data/defaultPrompts";

const ALL_AVAILABLE_STATUS = ["New Chat", "Open", "Pending", "Closed"];
const DEFAULT_AI_AGENTS = [
  { id: "receptionist", name: "Receptionist", emoji: "🛎️", role: "Front Desk" },
  { id: "sales", name: "Sales Agent", emoji: "😝", role: "Sales" },
  { id: "support", name: "Support Agent", emoji: "❤️", role: "Support" },
];

const processInitialData = (data) =>
  data.map((chat) => ({
    ...chat,
    email: chat.email || null,
    country: chat.country || null,
    tags: Array.isArray(chat.tags) ? chat.tags : chat.tags ? [chat.tags] : [],
    notes: chat.notes || [],
    status: chat.status || "New Chat",
    columnId: chat.columnId || "col-1",
    company: chat.company || "Talka Co., Ltd.", 
    messages:
      chat.messages ||
      (chat.message
        ? [{ from: "customer", text: chat.message, timestamp: chat.time }]
        : []),
  }));

export default function ChatPage() {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const selectedChat = chats.find((chat) => chat.id == selectedChatId);

  // Modal / Panel states
  const [isAddTagModalOpen, setIsAddTagModalOpen] = useState(false);
  const [isContactDetailsOpen, setIsContactDetailsOpen] = useState(false);
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [isChangeStatusOpen, setIsChangeStatusOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [isActivityLogOpen, setIsActivityLogOpen] = useState(false);
  const [isSendToBoardOpen, setIsSendToBoardOpen] = useState(false);

  const [activityLogs, setActivityLogs] = useState([]);

  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const [activePrompts, setActivePrompts] = useState([]);
  const [availableAgents, setAvailableAgents] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [availableTags, setAvailableTags] = useState([]);

  // ✅ เพิ่ม company states
  const [availableCompanies, setAvailableCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const closeAllPanels = () => {
    setIsAddTagModalOpen(false);
    setIsContactDetailsOpen(false);
    setIsAddNoteOpen(false);
    setIsChangeStatusOpen(false);
    setIsAiAssistantOpen(false);
    setIsActivityLogOpen(false);
    setIsSendToBoardOpen(false);
  };

  // โหลดรายชื่อบริษัท
const loadCompanies = () => {
    const savedCompanies = localStorage.getItem("onechat_companies");
    if (savedCompanies) {
      try {
        setAvailableCompanies(JSON.parse(savedCompanies));
      } catch (e) {
        console.error("Error parsing companies:", e);
      }
    } else {
      const defaultCompanies = [
        "Global Corp",
        "Siam Trading Co., Ltd.",
        "TechHub Solutions",
        "Sakura Design",
        "Cyberdyne Systems",
        "Seoul Food Co., Ltd.",
        "Freelance",
        "Metaverse",
        "Private Detective"
      ];
      setAvailableCompanies(defaultCompanies);
      localStorage.setItem("onechat_companies", JSON.stringify(defaultCompanies));
    }
};


  // โหลด tags
  const loadTags = () => {
    const savedTags = localStorage.getItem("onechat_tags");
    if (savedTags) {
      try {
        setAvailableTags(JSON.parse(savedTags));
      } catch (e) {
        console.error(e);
      }
    } else {
      const defaultTags = [
        { id: "vip", name: "VIP", color: "#EAB308", emoji: "👑" },
        { id: "urgent", name: "Urgent", color: "#EF4444", emoji: "🔥" },
        { id: "new", name: "New", color: "#3B82F6", emoji: "🆕" },
      ];
      setAvailableTags(defaultTags);
      localStorage.setItem("onechat_tags", JSON.stringify(defaultTags));
    }
  };

  useEffect(() => {
    loadTags();
  }, []);

  useEffect(() => {
    const savedLogs = localStorage.getItem("onechat_activity_logs");
    if (savedLogs) setActivityLogs(JSON.parse(savedLogs));
  }, []);

  useEffect(() => {
    const savedPrompts = localStorage.getItem("onechat_prompts");
    let allPrompts = [];
    if (savedPrompts) {
      allPrompts = JSON.parse(savedPrompts);
    } else {
      allPrompts = DEFAULT_AI_PROMPTS;
      localStorage.setItem("onechat_prompts", JSON.stringify(DEFAULT_AI_PROMPTS));
    }
    const filtered = allPrompts.filter((p) => p.active === true);
    setActivePrompts(filtered);
  }, []);

  useEffect(() => {
    const savedAgents = localStorage.getItem("onechat_ai_agents");
    if (savedAgents) {
      setAvailableAgents(JSON.parse(savedAgents));
    } else {
      setAvailableAgents(DEFAULT_AI_AGENTS);
      localStorage.setItem("onechat_ai_agents", JSON.stringify(DEFAULT_AI_AGENTS));
    }
  }, []);

  const loadUser = () => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user", e);
      }
    }
  };

  const loadChats = () => {
    const savedChats = localStorage.getItem("app_board_chats");
    if (savedChats) {
      try {
        const parsedChats = JSON.parse(savedChats);
        const sanitizedChats = parsedChats.map((chat) => ({
          ...chat,
          tags: Array.isArray(chat.tags) ? chat.tags : [],
          notes: Array.isArray(chat.notes) ? chat.notes : [],
          status: chat.status || "New Chat",
          columnId: chat.columnId || "col-1",
          company: chat.company || "Talka Co., Ltd.",
          messages: Array.isArray(chat.messages)
            ? chat.messages
            : chat.message
            ? [{ from: "customer", text: chat.message, timestamp: chat.time }]
            : [],
        }));
        setChats(processInitialData(sanitizedChats));
      } catch (error) {
        console.error("Error loading data:", error);
        setChats(processInitialData(initialChatData));
      }
    } else {
      setChats(processInitialData(initialChatData));
    }
    setIsLoaded(true);
  };

  useEffect(() => {
    loadUser();
    loadCompanies(); 
    loadChats();
    loadTags();

    const handleStorageChange = (e) => {
      if (
        !e.key ||
        ["currentUser", "app_board_chats", "onechat_tags", "onechat_companies"].includes(e.key)
      ) {
        loadUser();
        loadCompanies();
        loadChats();
        loadTags();

        const updatedLogs = localStorage.getItem("onechat_activity_logs");
        if (updatedLogs) setActivityLogs(JSON.parse(updatedLogs));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("app_board_chats", JSON.stringify(chats));
      window.dispatchEvent(new Event("storage"));
    }
  }, [chats, isLoaded]);

  // 🔍 filter chat
  const filteredChats = chats.filter((chat) => {
    const matchesStatus = activeFilter === "All" || chat.status === activeFilter;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      chat.name?.toLowerCase().includes(query) ||
      chat.message?.toLowerCase().includes(query) ||
      (chat.messages && chat.messages.some((m) => m.text?.toLowerCase().includes(query)));

    const matchesCompany = !selectedCompany || chat.company === selectedCompany; // ✅ กรองบริษัท

    return matchesStatus && matchesSearch && matchesCompany;
  });

  const handleFilterChange = (filterValue) => setActiveFilter(filterValue);
  const handleSearchChange = (query) => setSearchQuery(query);
  const handleCompanyChange = (comp) => setSelectedCompany(comp); // ✅ อัปเดตบริษัท

  if (!isLoaded) return <div className="text-white p-10">Loading Chats...</div>;

  return (
    <div className="container mx-auto">
      {/* ✅ ส่ง companies ไป ChatFitter */}
      <ChatFitter
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
        availableCompanies={availableCompanies}
        onCompanyChange={handleCompanyChange}
      />

      <div className="flex">
        <ChatList
          chats={filteredChats}
          onSelectChat={(chat) => {
            setSelectedChatId(chat.id);
            closeAllPanels();
          }}
          selectedId={selectedChatId}
          availableTags={availableTags}
        />

        {selectedChatId ? (
          <ChatMessage
            chat={selectedChat}
            availableAgents={availableAgents}
            onSelectAiAgent={(agent) => {}}
            aiPrompts={activePrompts}
            currentUser={currentUser}
            availableTags={availableTags}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-[rgba(32,41,59,0.25)] backdrop-blur-xl rounded-3xl shadow-2xl mt-3 ml-3 border border-[rgba(254,253,253,0.5)] h-[85vh] text-white/50">
            <p className="text-xl">Select a chat to start messaging</p>
          </div>
        )}

        {/* Panels */}
        {isAddTagModalOpen && (
          <AddTag
            onClose={() => setIsAddTagModalOpen(false)}
            availableTags={availableTags}
            currentTargets={selectedChat ? selectedChat.tags || [] : []}
            onToggleTag={() => {}}
          />
        )}
        {isContactDetailsOpen && (
          <ContactDetails
            onClose={() => setIsContactDetailsOpen(false)}
            contact={selectedChat}
            onUpdateContact={() => {}}
          />
        )}
        {isAddNoteOpen && (
          <AddNote
            onClose={() => setIsAddNoteOpen(false)}
            onSaveNote={() => {}}
            currentNotes={selectedChat ? selectedChat.notes || [] : []}
          />
        )}
        {isChangeStatusOpen && (
          <ChangeStatus
            onClose={() => setIsChangeStatusOpen(false)}
            availableStatus={ALL_AVAILABLE_STATUS}
            currentTargets={[selectedChat?.status || "New Chat"]}
            onToggleStatus={() => {}}
          />
        )}
        {isActivityLogOpen && (
          <ActivityLogPanel
            onClose={() => setIsActivityLogOpen(false)}
            logs={activityLogs.filter((log) => log.chatId === selectedChatId)}
          />
        )}
        {isSendToBoardOpen && selectedChat && (
          <SendToBoardModal onClose={() => setIsSendToBoardOpen(false)} chat={selectedChat} />
        )}

        {selectedChatId && (
          <ControlPanel
            onOpenAddTagModal={() => setIsAddTagModalOpen(true)}
            onOpenContactDetails={() => setIsContactDetailsOpen(true)}
            onOpenAddNote={() => setIsAddNoteOpen(true)}
            onOpenChangeStatus={() => setIsChangeStatusOpen(true)}
            onOpenActivityLog={() => setIsActivityLogOpen(true)}
            onOpenSendToBoard={() => setIsSendToBoardOpen(true)}
          />
        )}

        {isAiAssistantOpen && (
          <AiAssistantPanel
            onClose={() => setIsAiAssistantOpen(false)}
            availableAgents={availableAgents}
          />
        )}
        <AiSuppBtn
          onClick={() => {
            closeAllPanels();
            setIsAiAssistantOpen(!isAiAssistantOpen);
          }}
          isOpen={isAiAssistantOpen}
        />
      </div>
    </div>
  );
}
