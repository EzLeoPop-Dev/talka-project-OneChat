export default function DashboardStats() {
  return (
    <div className="w-full"> 
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-1">
          
            <div className="bg-[rgba(32,41,59,0.25)] border border-[rgba(254,253,253,0.5)] backdrop-blur-xl rounded-3xl shadow-2xl p-3 "> 
                <div className="flex justify-between items-center">
                    <span className="text-sm text-white/80">New Customers</span>
                    <a href="#" className="text-xs text-white/60 hover:text-white">More</a> 
                </div>
                <p className="text-3xl font-bold text-white mt-1">100</p> 
            </div>

            <div className="bg-[rgba(32,41,59,0.25)] border border-[rgba(254,253,253,0.5)] backdrop-blur-xl rounded-3xl shadow-2xl p-3 "> 
                <div className="flex justify-between items-center">
                    <span className="text-sm text-white/80">Unreplied</span>
                    <a href="#" className="text-xs text-white/60 hover:text-white">More</a>
                </div>
                <div className="flex items-baseline gap-2 mt-1"> 
                    <p className="text-3xl font-bold text-white">100</p>
                    <span className="text-sm text-white/80">0.00%</span>
                </div>
            </div>

            <div className="bg-[rgba(32,41,59,0.25)] border border-[rgba(254,253,253,0.5)] backdrop-blur-xl rounded-3xl shadow-2xl p-3 "> 
                <div className="flex justify-between items-center">
                    <span className="text-sm text-white/80">Incoming Message</span>
                </div>
                <div className="flex items-baseline gap-2 mt-1"> 
                    <p className="text-3xl font-bold text-white">100</p>
                    <span className="text-sm text-white/80">0.00%</span>
                </div>
            </div>

            <div className="bg-[rgba(32,41,59,0.25)] border border-[rgba(254,253,253,0.5)] backdrop-blur-xl rounded-3xl shadow-2xl p-3 "> 
                <span className="text-sm text-white/80">Close Chat</span>
                <p className="text-3xl font-bold text-white mt-1">0.00%</p> 
            </div>

        </div>
    </div>
  );
}