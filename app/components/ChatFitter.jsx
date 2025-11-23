// components/ChatFitter.jsx
"use client"
import { useState } from "react";

export default function ChatFitter({ onFilterChange }) {
    const [selected, setSelected] = useState("radio1");

    const handleRadioChange = (id, value) => {
        setSelected(id);
        if (onFilterChange) {
            onFilterChange(value);
        }
    };

    return (
        <div className="menubar flex flex-col md:flex-row bg-[rgba(32,41,59,0.25)] border border-[rgba(254,253,253,0.5)] rounded-2xl p-4 md:p-5 gap-4 md:gap-7">

                <div className="search flex items-center text-white bg-[rgba(32,41,59,0.25)] rounded-2xl py-2 px-4 w-full md:w-auto">
                    <i className="fa-solid fa-magnifying-glass mr-3"></i>
                    <input
                        type="text"
                        className="text-white outline-0 bg-transparent w-full"
                        placeholder="Search"
                    />
                </div>

                <div className="flex flex-wrap md:flex-nowrap gap-3 md:gap-5 text-white overflow-x-auto md:overflow-visible">
                    {[
                        { id: "radio1", label: "All Chat", value: "All" },
                        { id: "radio2", label: "New Chat", value: "New Chat" },
                        { id: "radio3", label: "Open", value: "Open" }, 
                        { id: "radio4", label: "Closed", value: "Closed" },
                        { id: "radio5", label: "Pending", value: "Pending" },
                    ].map((item) => (
                        <div key={item.id} className="flex items-center">
                            <input
                                type="radio"
                                name="chatFilter"
                                checked={selected === item.id}
                                onChange={() => handleRadioChange(item.id, item.value)}
                                className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-full checked:bg-[rgb(185,40,243)] checked:border-[rgb(185,40,243)]"
                            />
                            <label className="ms-2 text-sm font-medium text-gray-300">
                                {item.label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
    )
}