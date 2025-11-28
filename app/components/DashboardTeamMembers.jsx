"use client";
import React, { useState, useEffect } from 'react';

export default function DashboardTeamMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myTeamName, setMyTeamName] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3; 

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    const storedTeams = localStorage.getItem("teams");

    if (storedUser && storedTeams) {
      const me = JSON.parse(storedUser);
      const teams = JSON.parse(storedTeams);
      
      const myName = me.name || me.username;

      const myTeam = teams.find(t => t.members.includes(myName));

      if (myTeam) {
        setMyTeamName(myTeam.name);
        
        const teamMembersData = myTeam.members.map((memberName, index) => ({
            id: index,
            name: memberName,
            avatar: `https://ui-avatars.com/api/?name=${memberName}&background=random`,
            role: memberName === myName ? (me.role || "Member") : "Member" 
        }));

        setMembers(teamMembersData);
      } else {
        setMembers([]); 
      }
    }
    setLoading(false);
  }, []);

  //  Pagination Logic 
  const totalPages = Math.ceil(members.length / ITEMS_PER_PAGE);
  const currentItems = members.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(curr => curr + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(curr => curr - 1);
  };

  if (loading) return <div className="text-white/50 p-4 text-xs">Loading team...</div>;

  return (
    <div className="bg-[rgba(32,41,59,0.25)] border border-[rgba(254,253,253,0.5)] backdrop-blur-xl rounded-3xl shadow-2xl p-4 h-90 w-full ml-3 flex flex-col">
      
      <div className="flex justify-between items-center pb-3 mb-4 border-b border-white/20 shrink-0">
        <h2 className="text-white/90 text-sm">Team Members</h2>
        {myTeamName && <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/70">{myTeamName}</span>}
      </div>
      
      <div className="flex flex-col gap-y-4 grow overflow-y-auto custom-scrollbar pr-1">
        
        {members.length > 0 ? (
            currentItems.map((member) => ( 
                <div key={member.id} className="flex items-center justify-between w-full"> 
                
                <div className="flex items-center gap-3">
                    <div className="relative shrink-0 w-[45px] h-[45px]">
                        <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-white font-medium text-sm">{member.name}</p>
                    </div>
                </div>

                <p className="text-white/60 text-xs">{member.role}</p>

                </div>
            ))
        ) : (
            <div className="flex flex-col items-center justify-center h-full text-white/40 text-xs italic gap-2">
                <i className="fa-solid fa-users-slash text-2xl"></i>
                <p>You are not in any team.</p>
            </div>
        )}
        
      </div>

      {/* Pagination Footer */}
      {members.length > ITEMS_PER_PAGE && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20 shrink-0">
            <div className="flex items-center gap-3">
              <span 
                onClick={handlePrevPage} 
                className={`text-white/60 cursor-pointer transition-colors ${currentPage === 1 ? 'opacity-30 pointer-events-none' : 'hover:text-white'}`}
              >
                &lt;
              </span>
              <span 
                onClick={handleNextPage} 
                className={`text-white/60 cursor-pointer transition-colors ${currentPage === totalPages ? 'opacity-30 pointer-events-none' : 'hover:text-white'}`}
              >
                &gt;
              </span>
            </div>
            
            <span className="text-white/60 text-xs">
              Page {currentPage} of {totalPages}
            </span>
          </div>
      )}

    </div>
  );
}