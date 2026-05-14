"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { IndianRupee, LogOut } from "lucide-react";

import InvestorIDContext from "@/app/core/contexts/InvestorIDContext";
import ProfileContext from "@/app/core/contexts/ProfileContext";

export default function Logout() {
  const router = useRouter();

  const { storeId }      = useContext(InvestorIDContext);
  const { email }        = useContext(ProfileContext);

  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const handleLogout = async () => {
    setLoading(true);

    // Try to notify the backend — but don't let it block logout
    try {
      await fetch("http://localhost:4000/sip/invest/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email }),
      });
    } catch (err) {
      // Backend call failed — still log out on the frontend
      console.log("Backend logout failed, continuing anyway:", err);
    }

    // Always clear state and redirect
    storeId("");
    localStorage.removeItem("id");
    setLoading(false);
    router.push("/Login");
  };

  return (
    <div className="flex-1 min-h-screen bg-black flex items-center justify-center p-10">

      <div className="w-[420px] bg-zinc-950 border border-orange-500/30 rounded-3xl p-10 shadow-[0_0_40px_rgba(249,115,22,0.15)] text-center">

        {/* Icon */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-orange-500 p-4 rounded-2xl mb-5">
            <IndianRupee size={35} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Growest</h1>
          <p className="text-zinc-400 mt-2 text-sm">Investment Tracker</p>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-800 mb-8"></div>

        {/* Message */}
        <div className="mb-8">
          <div className="w-16 h-16 bg-orange-500/10 border border-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogOut size={28} className="text-orange-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Ready to leave?</h2>
          <p className="text-zinc-500 text-sm">
            You will be logged out of your account. Your data is safe and
            you can log back in anytime.
          </p>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-sm mb-4 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
            {error}
          </p>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all duration-200 rounded-2xl py-4 text-white font-bold text-lg shadow-lg shadow-orange-500/20 disabled:opacity-50 flex items-center justify-center gap-3"
        >
          <LogOut size={20} />
          {loading ? "Logging out..." : "Logout"}
        </button>

        {/* Cancel */}
        <button
          onClick={() => router.back()}
          className="w-full mt-3 py-3 text-zinc-500 hover:text-white text-sm transition-colors duration-200"
        >
          Cancel — Go back
        </button>

      </div>
    </div>
  );
}
