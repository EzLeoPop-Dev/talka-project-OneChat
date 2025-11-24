"use client";
import React, { useState, useEffect } from 'react';

export default function ContactDetails({ onClose, contact, onUpdateContact }) {
  
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");

  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingCountry, setIsEditingCountry] = useState(false);


  useEffect(() => {
    if (contact) {
      setPhone(contact.phone || "");
      setEmail(contact.email || "");
      setCountry(contact.country || "");
    }
    setIsEditingPhone(false);
    setIsEditingEmail(false);
    setIsEditingCountry(false);
  }, [contact]);

  if (!contact) {
    return (
      <div className="w-[320px] max-h-[85vh] mt-3 ml-3 bg-[rgba(50,61,80,0.5)] border border-[rgba(254,253,253,0.3)] backdrop-blur-2xl rounded-3xl shadow-2xl p-6 flex flex-col self-start text-white/70">
        Loading...
      </div>
    );
  }

  const isVip = contact.tags && contact.tags.includes("VIP");

  const handleSave = (field) => {
    if (typeof onUpdateContact !== 'function') {
      console.error("onUpdateContact is not a function. Check page.jsx");
      return; 
    }

    if (field === 'phone') {
      onUpdateContact(contact.id, { phone: phone }); 
      setIsEditingPhone(false); 
    }
    if (field === 'email') {
      onUpdateContact(contact.id, { email: email }); 
      setIsEditingEmail(false); 
    }
    if (field === 'country') {
      onUpdateContact(contact.id, { country: country });
      setIsEditingCountry(false);
    }
  };

  return (
    <div className="w-[320px] max-h-[85vh] mt-3 ml-3 bg-[rgba(50,61,80,0.5)] border border-[rgba(254,253,253,0.3)] backdrop-blur-2xl rounded-3xl shadow-2xl p-6 flex flex-col self-start overflow-auto">
      
      <h2 className="text-white text-2xl font-semibold mb-5">Contact details</h2>

      {/* Profile Header (เหมือนเดิม) */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-16 h-16 bg-linear-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-3xl shadow-lg shrink-0">
          {contact.avatar}
        </div>
        
        <div>
            
          <h3 className="text-white font-semibold text-lg truncate">{contact.name}</h3>
          {isVip && (
            <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full">
              VIP
            </span>
          )}
        </div>
        <i className="fa-brands fa-facebook text-blue-500"></i>
      </div>

      {/* Contact Fields */}
      <div className="space-y-4">
        <h4 className="text-white/90 font-semibold text-md mb-2">Contact fields</h4>

        {/* Phone */}
        <div>
          <label className="text-white/60 text-xs">Phone Number</label>
          {isEditingPhone ? (
            // 6. โหมดแก้ไข (แสดง Input และปุ่ม Save)
            <div className="flex gap-2 mt-1">
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 bg-white/20 text-white text-sm rounded-md px-2 py-1 outline-none focus:ring-1 focus:ring-blue-400"
                placeholder="0123456789"
              />
              <button onClick={() => handleSave('phone')} className="bg-blue-500 text-white text-xs px-3 rounded-md hover:bg-blue-600">Save</button>

              <button onClick={() => setIsEditingPhone(false)} className="text-white/50 text-xs hover:text-white">X</button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              {contact.phone ? (
                <p className="text-white text-sm">{contact.phone}</p>
              ) : (
                <p className="text-white/40 text-sm italic">Add Phone Number</p>
              )}
              <button onClick={() => setIsEditingPhone(true)} className="text-white/60 text-xs hover:text-white">(Edit)</button>
            </div>
          )}
        </div>


        {/* --- Email Address --- */}
        <div>
          <label className="text-white/60 text-xs">Email Address</label>
          {isEditingEmail ? (
            <div className="flex gap-2 mt-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/20 text-white text-sm rounded-md px-2 py-1 outline-none focus:ring-1 focus:ring-blue-400"
                placeholder="example@email.com"
              />
              <button onClick={() => handleSave('email')} className="bg-blue-500 text-white text-xs px-3 rounded-md hover:bg-blue-600">Save</button>
              <button onClick={() => setIsEditingEmail(false)} className="text-white/50 text-xs hover:text-white">X</button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              {contact.email ? (
                <p className="text-white text-sm">{contact.email}</p>
              ) : (
                <p className="text-white/40 text-sm italic">Add Email Address</p>
              )}
              <button onClick={() => setIsEditingEmail(true)} className="text-white/60 text-xs hover:text-white">(Edit)</button>
            </div>
          )}
        </div>

        {/* --- Country --- */}
        <div>
          <label className="text-white/60 text-xs">Country</label>
          {isEditingCountry ? (
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="flex-1 bg-white/20 text-white text-sm rounded-md px-2 py-1 outline-none focus:ring-1 focus:ring-blue-400"
                placeholder="e.g. Thailand"
              />
              <button onClick={() => handleSave('country')} className="bg-blue-500 text-white text-xs px-3 rounded-md hover:bg-blue-600">Save</button>
              <button onClick={() => setIsEditingCountry(false)} className="text-white/50 text-xs hover:text-white">X</button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              {contact.country ? (
                <p className="text-white text-sm">{contact.country}</p>
              ) : (
                <p className="text-white/40 text-sm italic">Add Country</p>
              )}
              <button onClick={() => setIsEditingCountry(true)} className="text-white/60 text-xs hover:text-white">(Edit)</button>
            </div>
          )}
        </div>
      </div>

      {/* ปุ่ม Done */}
      <button
        onClick={onClose}
        className="w-full bg-white/30 hover:bg-white/40 text-white font-bold py-3 rounded-xl transition-all mt-8"
      >
        Done
      </button>
    </div>
  );
}