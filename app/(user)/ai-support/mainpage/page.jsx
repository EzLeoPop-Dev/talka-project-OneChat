"use client";
import {
  SmilePlus,
  BookOpenText,
  MessageCircle,
  Users,
  Database,
} from "lucide-react";

export default function AiSupport({onNext}) {


  return (
    <>  
      {/* Main UI */}
      <div className="w-full h-[94vh] p-2 md:p-4">
        {/* Main Card */}
        <div className="bg-[rgba(32,41,59,0.25)] border border-[rgba(254,253,253,0.5)] backdrop-blur-xl rounded-3xl shadow-2xl pt-5 px-4 h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-start p-8">
            <div className="flex items-center gap-3">
              <SmilePlus className="text-white" size={48} />
              <div>
                <h1 className="text-xl font-semibold text-white">AI Support</h1>
                <p className="text-sm text-white/70">
                  Handle more conversations with less effort using AI Support.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-white/80 py-2 px-4 cursor-pointer transition">
                <BookOpenText size={24} />
                <span className="text-sm">Learn more</span>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 mx-7 mb-6"></div>

          {/* Main Section */}
          <div className="flex flex-col md:flex-row justify-center items-center flex-1 px-10 gap-6">
            {/* Left Content */}
            <div className="max-w-md">
              <h1 className="text-3xl md:text-3xl font-semibold text-white text-left">
                Grow your team with AI Support
              </h1>
              <p className="text-white/70 text-left mt-4">
                Built to handle hundreds of conversations at a time.
              </p>

              {/* Features List */}
              <div className="mt-8 space-y-5 text-left">
                <div className="flex items-center gap-3 text-white/50">
                  <MessageCircle className="text-white/90" />
                  <span>Replies to messages instantly, 24/7</span>
                </div>

                <div className="flex items-center gap-3 text-white/50">
                  <Database className="text-white/90" />
                  <span>
                    Updates Lifecycle Stages and contact fields automatically
                  </span>
                </div>

                <div className="flex items-center gap-3 text-white/50">
                  <Users className="text-white/90" />
                  <span>
                    Assigns conversations to other agents, teams and AI Support
                  </span>
                </div>
              </div>

              <button
                onClick={onNext}
                className="mt-3 ml-26 px-12 py-2.5 rounded-lg bg-purple-500 hover:bg-purple-600 text-white transition-all cursor-pointer"
              >
                Get started
              </button>
            </div>

            {/* Right Video Mock */}
            <div className="bg-white/10 rounded-2xl border border-white/20 backdrop-blur-xl w-full aspect-video max-w-2xl mb-10 flex items-center justify-center">
              <span className="text-white/50 text-lg">Video Preview Area</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
