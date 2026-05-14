"use client";

import { useState } from "react";
import { Plus, ChevronDown } from "lucide-react";

export default function Header() {

    const [activeTab, setActiveTab] = useState("Full Stack");

    return (
        <div className="w-full flex items-center justify-between bg-zinc-950 px-8 py-5 border-b border-zinc-800">

            {/* Left Section */}
            <div className="flex flex-col">

                <h1 className="text-3xl font-bold text-white">
                    Analytics
                </h1>

                <div className="flex items-center gap-3 mt-3">

                    {/* Full Stack */}
                    <button
                        onClick={() => setActiveTab("Full Stack")}
                        className={`px-4 py-1 rounded-full text-sm font-medium transition
                            
                            ${
                                activeTab === "Full Stack"
                                    ? "bg-orange-500 text-white"
                                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                            }
                        `}
                    >
                        Full Stack
                    </button>

                    {/* Statistics */}
                    <button
                        onClick={() => setActiveTab("Statistics")}
                        className={`px-4 py-1 rounded-full text-sm font-medium transition
                            
                            ${
                                activeTab === "Statistics"
                                    ? "bg-orange-500 text-white"
                                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                            }
                        `}
                    >
                        Statistics
                    </button>

                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">

                {/* Add Button */}
                <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 transition px-5 py-3 rounded-xl text-white font-semibold">

                    <Plus size={18} />

                    Add
                </button>

                {/* Avatar */}
                <div className="flex items-center gap-3 bg-zinc-900 px-3 py-2 rounded-xl border border-zinc-800 cursor-pointer hover:bg-zinc-800 transition">

                    <img
                        src="https://i.pravatar.cc/150?img=12"
                        alt="avatar"
                        className="w-10 h-10 rounded-full object-cover"
                    />

                    <div className="hidden md:block">

                        <p className="text-sm font-semibold text-white">
                            Vicky
                        </p>

                        <p className="text-xs text-zinc-400">
                            Admin
                        </p>

                    </div>

                    <ChevronDown
                        size={18}
                        className="text-zinc-400"
                    />

                </div>

            </div>
        </div>
    );
}