"use client";
import React, { useState, useEffect } from 'react';

export default function DashboardStats() {
    const [stats, setStats] = useState({
    newCustomers: 0,
    unreplied: 0,
    incomingMessages: 0,
    closedChatPercent: "0.00"
});

useEffect(() => {
    // ดึงข้อมูลจาก LocalStorage
    const storedData = localStorage.getItem('onechat_data');
    
    if (storedData) {
        const chats = JSON.parse(storedData);


      // New Customers (ลูกค้าใหม่ = Status "New Chat")
        const newCustCount = chats.filter(c => c.status === 'New Chat').length;

      // Unreplied (ยังไม่ตอบ = ไม่มีข้อความจาก 'me' ในประวัติ)
        const unrepliedCount = chats.filter(c => {
        return !c.messages || !c.messages.some(msg => msg.from === 'me');
    }).length;

      // Incoming Message (รวมข้อความขาเข้าทั้งหมด)
        const incomingCount = chats.reduce((total, c) => {
        const customerMsgs = c.messages ? c.messages.filter(msg => msg.from !== 'me').length : 0;
        return total + customerMsgs;
    }, 0);

      // Close Chat (เปอร์เซ็นต์ของ Status "Closed")
        const closedCount = chats.filter(c => c.status === 'Closed').length;
        const totalChats = chats.length;
        const closedPercent = totalChats > 0 ? ((closedCount / totalChats) * 100).toFixed(2) : "0.00";

      // อัปเดต State
        setStats({
            newCustomers: newCustCount,
            unreplied: unrepliedCount,
            incomingMessages: incomingCount,
            closedChatPercent: closedPercent
        });
    }
}, []);

return (
    <div className="w-full"> 
    
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-1">
<<<<<<< HEAD
          
            <div className="bg-[rgba(32,41,59,0.37)] border border-[rgba(254,253,253,0.5)] backdrop-blur-xl rounded-3xl shadow-2xl p-3 "> 
=======
        
            {/* New Customers */}
            <div className="bg-[rgba(32,41,59,0.25)] border border-[rgba(254,253,253,0.5)] backdrop-blur-xl rounded-3xl shadow-2xl p-3 "> 
>>>>>>> b14c07393c3c6b62e34935119de00688eec9ddea
                <div className="flex justify-between items-center">
                    <span className="text-sm text-white/80">New Customers</span>
                    <a href="#" className="text-xs text-white/60 hover:text-white">More</a> 
                </div>
                <p className="text-3xl font-bold text-white mt-1">{stats.newCustomers}</p> 
            </div>

<<<<<<< HEAD
            <div className="bg-[rgba(32,41,59,0.37)] border border-[rgba(254,253,253,0.5)] backdrop-blur-xl rounded-3xl shadow-2xl p-3 "> 
=======
            {/* Unreplied */}
            <div className="bg-[rgba(32,41,59,0.25)] border border-[rgba(254,253,253,0.5)] backdrop-blur-xl rounded-3xl shadow-2xl p-3 "> 
>>>>>>> b14c07393c3c6b62e34935119de00688eec9ddea
                <div className="flex justify-between items-center">
                    <span className="text-sm text-white/80">Unreplied</span>
                    <a href="#" className="text-xs text-white/60 hover:text-white">More</a>
                </div>
                <div className="flex items-baseline gap-2 mt-1"> 
                    <p className="text-3xl font-bold text-white">{stats.unreplied}</p>
                    <span className="text-sm text-white/80">Conversations</span>
                </div>
            </div>

<<<<<<< HEAD
            <div className="bg-[rgba(32,41,59,0.37)] border border-[rgba(254,253,253,0.5)] backdrop-blur-xl rounded-3xl shadow-2xl p-3 "> 
=======
            {/* Incoming Message */}
            <div className="bg-[rgba(32,41,59,0.25)] border border-[rgba(254,253,253,0.5)] backdrop-blur-xl rounded-3xl shadow-2xl p-3 "> 
>>>>>>> b14c07393c3c6b62e34935119de00688eec9ddea
                <div className="flex justify-between items-center">
                    <span className="text-sm text-white/80">Incoming Message</span>
                </div>
                <div className="flex items-baseline gap-2 mt-1"> 
                    <p className="text-3xl font-bold text-white">{stats.incomingMessages}</p>
                    <span className="text-sm text-white/80">Total msgs</span>
                </div>
            </div>

<<<<<<< HEAD
            <div className="bg-[rgba(32,41,59,0.37)] border border-[rgba(254,253,253,0.5)] backdrop-blur-xl rounded-3xl shadow-2xl p-3 "> 
=======
            {/* Close Chat */}
            <div className="bg-[rgba(32,41,59,0.25)] border border-[rgba(254,253,253,0.5)] backdrop-blur-xl rounded-3xl shadow-2xl p-3 "> 
>>>>>>> b14c07393c3c6b62e34935119de00688eec9ddea
                <span className="text-sm text-white/80">Close Chat</span>
                <p className="text-3xl font-bold text-white mt-1">{stats.closedChatPercent}%</p> 
            </div>

        </div>
    </div>
  );
}