"use client";
import { ChevronLeft } from "lucide-react";

export default function TemplatesPage({
  onBack,
  onreceptionist,
  onsalesagent,
  onsupportagent,
  oncreatenew,
}) {
  return (
    <div className="w-full h-[94vh] p-2 md:p-4">
      <div className="bg-[rgba(32,41,59,0.25)] border border-[rgba(254,253,253,0.5)] backdrop-blur-xl rounded-3xl shadow-2xl pt-5 px-4 h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-start items-start mb-6 mt-8">
          <button
            onClick={onBack}
            className=" text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronLeft size={52} />
          </button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              AI Agent Templates
            </h1>
            <p className="text-sm text-white/60 mt-1">
              Use a template tailored for business goals like support or sales,
              or create your own AI Support.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mb-8"></div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Template: Receptionist */}
          <div className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/30 hover:bg-white/10 transition-all shadow-lg backdrop-blur-xl">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-bell-concierge text-yellow-300"></i>
            </div>
            <h2 className="text-lg font-semibold">Receptionist</h2>
            <p className="mt-2 text-xs text-white/60 leading-relaxed">
              Greets Contacts, identifies their needs, captures essential
              details, and routes them efficiently.
            </p>
            <button
              onClick={onreceptionist}
              className="w-full mt-4 bg-white text-black py-2 rounded-xl font-semibold hover:bg-gray-200 transition cursor-pointer"
            >
              Use template
            </button>
          </div>

          {/* Template: Sales Agent */}
          <div className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/30 hover:bg-white/10 transition-all shadow-lg backdrop-blur-xl">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
              <i className="fa-regular fa-face-grin-tongue-squint text-yellow-600"></i>
            </div>
            <h2 className="text-lg font-semibold">Sales Agent</h2>
            <p className="mt-2 text-xs text-white/60 leading-relaxed">
              Learns customer needs, suggests products, and connects them to the
              right team when ready.
            </p>
            <button
              onClick={onsalesagent}
              className="w-full mt-4 bg-white text-black py-2 rounded-xl font-semibold hover:bg-gray-200 transition cursor-pointer"
            >
              Use template
            </button>
          </div>

          {/* Template: Support Agent */}
          <div className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/30 hover:bg-white/10 transition-all shadow-lg backdrop-blur-xl">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-heart text-red-400"></i>
            </div>
            <h2 className="text-lg font-semibold">Support Agent</h2>
            <p className="mt-2 text-xs text-white/60 leading-relaxed">
              Answers product questions using AI Knowledge Sources and escalates
              when needed.
            </p>
            <button
              onClick={onsupportagent}
              className="w-full mt-4 bg-white text-black py-2 rounded-xl font-semibold hover:bg-gray-200 transition cursor-pointer"
            >
              Use template
            </button>
          </div>

          {/* Create New */}
          <div className="group bg-linear-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 hover:from-white/20 hover:to-white/10 transition-all shadow-lg backdrop-blur-xl flex flex-col items-center text-center">
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-plus text-purple-400"></i>
            </div>
            <h2 className="text-lg font-semibold">Create One</h2>
            <p className="mt-2 text-xs text-white/60 leading-relaxed">
              Create a custom AI Support agent.
            </p>
            <button
              onClick={oncreatenew}
              className="mt-5 bg-white text-black py-2 px-6 rounded-xl font-semibold hover:bg-gray-200 transition cursor-pointer"
            >
              Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
