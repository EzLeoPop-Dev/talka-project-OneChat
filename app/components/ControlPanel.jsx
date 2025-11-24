"use client";

// 1. รับ prop 'onOpenContactDetails' เพิ่ม
export default function ControlPanel({ onOpenAddTagModal, onOpenContactDetails, onOpenAddNote }) {

    return (
        <div className="w-[55px] mt-3 ml-3">
            <div className="w-full">
                <div className="bg-[rgba(32,41,59,0.4)] border border-[rgba(254,253,253,0.3)] backdrop-blur-xl rounded-full shadow-2xl py-6 flex flex-col items-center gap-6">
                    
                    {/* ปุ่มที่ 1: Tags */}
                    <button 
                        onClick={onOpenAddTagModal} 
                        className="group w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition-all duration-200 active:scale-90"
                        title="Tags"
                    >
                        <i className="fa-solid fa-tags text-white/70 group-hover:text-white text-lg transition-colors"></i>
                    </button>

                    {/* ปุ่มที่ 2: User (Profile) */}
                    <button 
                        onClick={onOpenContactDetails} 
                        className="group w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition-all duration-200 active:scale-90"
                        title="User Profile"
                    >
                        <i className="fa-solid fa-info text-white/70 group-hover:text-white text-lg transition-colors"></i>
                    </button>

                    {/* ปุ่มที่ 3: Book (Notes) */}
                    <button 
                        onClick={onOpenAddNote}
                        className="group w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition-all duration-200 active:scale-90"
                        title="Notes"
                    >
                        <i className="fa-solid fa-book text-white/70 group-hover:text-white text-lg transition-colors"></i>
                    </button>
                    
                </div>
            </div>
        </div>
    );
}