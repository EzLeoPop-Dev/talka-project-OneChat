"use client";

export default function AddTag({ onClose, availableTags = [], currentTargets = [], onToggleTag }) {
  return (
    <div className="w-[320px] max-h-[85vh] mt-3 ml-3 bg-[rgba(32,41,59,0.25)] border border-[rgba(254,253,253,0.5)] backdrop-blur-xl rounded-3xl shadow-2xl p-6 flex flex-col self-start">
      
      <h2 className="text-white text-2xl font-semibold mb-5">Add Tag</h2>

      <div className="flex flex-wrap gap-3 mb-6 overflow-auto custom-scrollbar content-start">
        {availableTags.map((tag) => {
          // รองรับทั้งแบบ Object (มีสี/รูป) และแบบ String เดิม
          const tagName = typeof tag === 'object' ? tag.name : tag;
          const tagColor = typeof tag === 'object' ? tag.color : '#fbbf24'; // default สีเหลือง
          const tagEmoji = typeof tag === 'object' ? tag.emoji : '';

          const safeTargets = Array.isArray(currentTargets) ? currentTargets : [];
          const isActive = safeTargets.includes(tagName);

          return (
            <button
              key={tagName}
              onClick={() => onToggleTag(tagName)}
              className={`rounded-full px-4 py-2 text-sm transition-all h-fit flex items-center gap-2 border border-transparent
                ${isActive ? 'shadow-lg scale-105 font-bold text-white' : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'}
              `}
              style={{
                // ถ้าเลือกอยู่: ใช้สีพื้นหลังตามที่ตั้งไว้
                backgroundColor: isActive ? tagColor : undefined,
                // ถ้าไม่ได้เลือก: ให้มีขอบสีจางๆ (Optional)
                borderColor: isActive ? 'transparent' : 'rgba(255,255,255,0.1)' 
              }}
            >
              {/* แสดง Emoji ถ้ามี */}
              {tagEmoji && <span className="text-base">{tagEmoji}</span>}
              
              {/* ชื่อ Tag */}
              <span>{tagName}</span>

              {/* ไอคอนติ๊กถูกถ้าเลือกอยู่ */}
              {isActive && <i className="fa-solid fa-check text-xs ml-1"></i>}
            </button>
          );
        })}
        
        {/* กรณีไม่มี Tag เลย */}
        {availableTags.length === 0 && (
            <p className="text-white/40 text-sm italic w-full text-center py-4">No tags available. Create one in Admin Panel.</p>
        )}
      </div>

      <button
        onClick={onClose}
        className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-3 rounded-xl transition-all mt-auto"
      >
        Done
      </button>
    </div>
  );
}