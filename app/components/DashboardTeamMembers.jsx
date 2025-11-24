"use client";
import Image from "next/image";
import React, { useState } from 'react';

const teamMembers = [
  {
    id: 1,
    name: "Andrew Smith",
    avatar: "/Manager.jpg",
    isOnline: true,
    role: "Manager",
  },
  {
    id: 2,
    name: "Tomas Papaya",
    avatar: "/Employee.jpg",
    isOnline: true,
    role: "Employee",
  },
];

// --- Constants for Pagination ---
const TOTAL_PAGES = 10;


export default function DashboardTeamMembers() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isChanging, setIsChanging] = useState(false); 

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= TOTAL_PAGES && newPage !== currentPage) {
      
      setIsChanging(true); 

      setTimeout(() => {
        setCurrentPage(newPage);
        setIsChanging(false); 
      }, 150);
    }
  };

  const handleNextPage = () => handlePageChange(currentPage + 1);
  const handlePrevPage = () => handlePageChange(currentPage - 1);

  const currentItems = currentPage === 1 ? teamMembers : [];
  
  const isDataPage = currentItems.length > 0;

  return (
    <div className="bg-[rgba(32,41,59,0.25)] border border-[rgba(254,253,253,0.5)] backdrop-blur-xl rounded-3xl shadow-2xl p-4 h-90 w-193 ml-3 flex flex-col">
      
      <h2 className="text-white/90 text-sm pb-3 mb-4 border-b border-white/20 flex-shrink-0">
        Team Members
      </h2>
      
      <div className="flex flex-col gap-y-4 flex-grow">
        
        <div className={`transition-opacity duration-150 ${isChanging ? 'opacity-0' : 'opacity-100'}`}>
          
          {currentItems.map((member) => ( 
            <div key={member.id} className="flex items-center justify-between w-full py-4"> 
              
              <div className="flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    width={45} 
                    height={45}
                    className="rounded-full"
                  />
                  {member.isOnline && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-[rgba(32,41,59,0.5)] rounded-full"></span>
                  )}
                </div>
                <p className="text-white font-medium text-sm">{member.name}</p>
              </div>

              <p className="text-white/60 text-sm">{member.role}</p>

            </div>
          ))}
          
          {!isDataPage && currentPage !== 1 && (
            <div className="text-center py-8 text-white/50">
              [Page {currentPage} is empty]
            </div>
          )}
        </div>
        
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20 flex-shrink-0 ">
        <div className="flex items-center gap-3">
          
          <span 
            onClick={handlePrevPage} 
            className={`text-white/60 cursor-pointer transition-colors ${currentPage === 1 ? 'opacity-40 pointer-events-none' : 'hover:text-white'}`}
          >
            &lt;
          </span>
          
          <span 
            onClick={handleNextPage} 
            className={`text-white/60 cursor-pointer transition-colors ${currentPage === TOTAL_PAGES ? 'opacity-40 pointer-events-none' : 'hover:text-white'}`}
          >
            &gt;
          </span>
        </div>
        
        <span className="text-white/60 text-xs">
          Page {currentPage} of {TOTAL_PAGES}
        </span>
      </div>

    </div>
  );
}