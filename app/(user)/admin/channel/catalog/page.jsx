"use client";
import { BriefcaseBusiness } from "lucide-react";

export default function ChannelCatalog({ onConnectFacebook, onConnectLine }) {
  return (
    <div className="w-full h-[95vh] p-6">
      <div className="bg-[rgba(32,41,59,0.25)] border border-white/20 backdrop-blur-2xl rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.35)] p-10 h-full flex flex-col">
        <div className="flex items-center gap-4">
          <BriefcaseBusiness className="text-white drop-shadow-lg" size={52} />
          <div>
            <h1 className="text-2xl font-semibold text-white tracking-wide">
              Channel Catalog
            </h1>
            <p className="text-sm text-white/70 mt-1">
              Manage your messaging channels and discover new ones to help you
              acquire more customers.
            </p>
          </div>
        </div>

        <div className="border-t border-white/20 my-8"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          {/* Facebook */}
          <div className="group relative rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl p-6 shadow-xl flex justify-between items-center hover:bg-white/20 transition-all duration-300">
            <div className="flex items-center gap-4">
              <i className="fa-brands fa-facebook text-blue-600 text-4xl"></i>
              <div>
                <h2 className="text-white font-semibold text-lg">Facebook</h2>
                <p className="text-white/60 text-sm">
                  Connect your Facebook Page
                </p>
              </div>
            </div>
            <button
              onClick={onConnectFacebook}
              className="bg-white/20 border border-white/40 text-white rounded-lg px-4 py-1.5 text-sm hover:bg-white/30 transition-all cursor-pointer"
            >
              Connect
            </button>
          </div>

          {/* LINE */}
          <div className="group relative rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl p-6 shadow-xl flex justify-between items-center hover:bg-white/20 transition-all duration-300">
            <div className="flex items-center gap-4">
              <i className="fa-brands fa-line text-green-500 text-4xl"></i>
              <div>
                <h2 className="text-white font-semibold text-lg">LINE</h2>
                <p className="text-white/60 text-sm">Connect your Line OA</p>
              </div>
            </div>
            <button
              onClick={onConnectLine}
              className="bg-white/20 border border-white/40 text-white rounded-lg px-4 py-1.5 text-sm hover:bg-white/30 transition-all cursor-pointer"
            >
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
