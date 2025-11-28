"use client";
import { useState, useEffect } from "react";
import { Bot, Plus, Edit, Trash2, X, BookOpenText } from "lucide-react";
import { DEFAULT_AI_PROMPTS } from "@/app/data/defaultPrompts";

export default function AiPromptsPage() {
  const [prompts, setPrompts] = useState([]);

  const [newPrompt, setNewPrompt] = useState({ name: "", action: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPromptId, setEditingPromptId] = useState(null);
  const [deletePrompt, setDeletePrompt] = useState(null);

  // 3. useEffect: โหลดข้อมูลเมื่อเปิดหน้าเว็บ
  useEffect(() => {
    const savedPrompts = localStorage.getItem("onechat_prompts");
    if (savedPrompts) {
      setPrompts(JSON.parse(savedPrompts));
    } else {
      setPrompts(DEFAULT_AI_PROMPTS);
    }
  }, []);

  // 4. useEffect: บันทึกข้อมูลทุกครั้งที่ prompts เปลี่ยนแปลง (Add/Edit/Delete/Toggle)
  useEffect(() => {
    if (prompts.length > 0) {
      localStorage.setItem("onechat_prompts", JSON.stringify(prompts));
    }
  }, [prompts]);

  // เปิด modal สำหรับ add หรือ edit
  const openAddModal = () => {
    setNewPrompt({ name: "", action: "" });
    setEditingPromptId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (prompt) => {
    setNewPrompt({ name: prompt.name, action: prompt.action });
    setEditingPromptId(prompt.id);
    setIsModalOpen(true);
  };

  // ฟังก์ชันบันทึก (add หรือ edit)
  const handleSavePrompt = () => {
    if (!newPrompt.name.trim()) return alert("Please enter a prompt name");

    if (editingPromptId) {
      // แก้ไข prompt เดิม
      setPrompts(
        prompts.map((p) =>
          p.id === editingPromptId ? { ...p, ...newPrompt } : p
        )
      );
    } else {
      // เพิ่ม prompt ใหม่
      setPrompts([
        ...prompts,
        { id: Date.now(), ...newPrompt, active: true, isDefault: false },
      ]);
    }

    setNewPrompt({ name: "", action: "" });
    setEditingPromptId(null);
    setIsModalOpen(false);
  };

  // เปิด modal ลบ
  const handleOpenDeleteModal = (prompt) => {
    setDeletePrompt(prompt);
  };

  // ยกเลิก modal ลบ
  const handleCloseDeleteModal = () => {
    setDeletePrompt(null);
  };

  // ยืนยันลบ
  const handleConfirmDelete = () => {
    setPrompts(prompts.filter((p) => p.id !== deletePrompt.id));
    setDeletePrompt(null);
  };

  const handleToggle = (id) => {
    setPrompts(
      prompts.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
    );
  };

  return (
    <div className="w-full h-[94vh] p-4">
      <div className="bg-[rgba(32,41,59,0.37)] border border-[rgba(254,253,253,0.5)] backdrop-blur-xl rounded-3xl shadow-2xl pt-5 px-4 h-full flex flex-col">
        {/* Header */}
        <div className="relative max-w-3xl p-8 pb-0">
          <div className="flex items-center gap-3 mb-8 ">
            <Bot className="text-white p-2 bg-white/5 rounded-xl border border-white/10" size={50} />
            <div>
              <h1 className="text-xl font-semibold text-white">AI Prompts</h1>
              <p className="text-sm text-white/70">
                Use AI Prompts to customize and improve how responses are
                written.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/28 mx-7 mb-4"></div>

        {/* Add button */}
        <button
          onClick={openAddModal}
          className="flex w-fit mx-10 items-center gap-1 text-white bg-[rgba(255,255,255,0.22)] shadow-2xl rounded-xl py-2 px-4 cursor-pointer hover:bg-[#ffffff52] transition"
        >
          <Plus /> New Prompt
        </button>

        {/* Prompt list */}
        <div className="flex-1 flex flex-col justify-start text-center overflow-y-auto mt-8 px-10 gap-3">
          {prompts.map((p) => (
            <div
              key={p.id}
              className="flex justify-between items-center bg-white/10 border border-white/20 rounded-xl p-4"
            >
              <div className="text-left">
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-sm text-white/70">{p.action}</p>
              </div>

              <div className="flex items-center gap-3">
                {!p.isDefault && (
                  <>
                    <button
                      onClick={() => handleOpenDeleteModal(p)}
                      className="flex items-center gap-1 bg-red-500/30 border border-red-400 text-red-200 rounded-lg px-3 py-1 text-sm hover:bg-red-500/50 transition cursor-pointer"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                    <button
                      onClick={() => openEditModal(p)}
                      className="flex items-center gap-1 bg-white/20 border border-white/40 text-white rounded-lg px-3 py-1 text-sm hover:bg-white/30 transition cursor-pointer"
                    >
                      <Edit size={16} />
                      Edit
                    </button>
                  </>
                )}

                {/* Toggle switch */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={p.active}
                    onChange={() => handleToggle(p.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none rounded-full peer peer-checked:bg-purple-500 transition-all"></div>
                  <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full peer-checked:translate-x-5 transition-all"></div>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit Prompt Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-[#1E1E1E] text-white rounded-2xl p-6 w-[400px] shadow-2xl border border-white/20">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {editingPromptId ? "Edit AI Prompt" : "Add AI Prompt"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <X size={22} />
              </button>
            </div>

            <label className="text-sm">Prompt Name</label>
            <input
              type="text"
              placeholder="Name"
              className="w-full bg-[#2b2b2b] text-white p-2 rounded-lg mb-4 outline-none"
              value={newPrompt.name}
              onChange={(e) =>
                setNewPrompt({ ...newPrompt, name: e.target.value })
              }
            />

            <label className="text-sm">Prompt Action</label>
            <textarea
              placeholder="Describe what this prompt does"
              className="w-full bg-[#2b2b2b] text-white p-2 rounded-lg mb-4 outline-none resize-none"
              rows={3}
              value={newPrompt.action}
              onChange={(e) =>
                setNewPrompt({ ...newPrompt, action: e.target.value })
              }
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePrompt}
                className="flex items-center gap-1 bg-white/20 border border-white/40 text-white rounded-lg px-3 py-1 text-sm hover:bg-white/30 transition cursor-pointer"
              >
                {editingPromptId ? "Save Changes" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deletePrompt && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-[#1E1E1E] border border-white/20 rounded-2xl p-6 w-[380px] text-white shadow-2xl relative">
            <button
              onClick={handleCloseDeleteModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"
            >
              <X size={22} />
            </button>
            <h2 className="text-lg font-semibold mb-2">
              Delete Prompt “{deletePrompt.name}”?
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              This action cannot be undone. Are you sure you want to delete this
              AI Prompt?
            </p>

            <div className="flex justify-end gap-3 mt-2">
              <button
                onClick={handleCloseDeleteModal}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex items-center gap-1 bg-red-500/30 border border-red-400 text-red-200 rounded-lg px-4 py-1 text-sm cursor-pointer hover:bg-red-500/50 transition"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
