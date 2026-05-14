"use client";

import { useContext, useState } from "react";

import { useRouter } from "next/navigation";

import ProfileContext from "@/app/core/contexts/ProfileContext";

import InvestorIDContext from "@/app/core/contexts/InvestorIDContext";

import { IndianRupee } from "lucide-react";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const { storeDetails } = useContext(ProfileContext);

  const { storeId } = useContext(InvestorIDContext);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:4000/sip/invest/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();

      if (response.ok && result.message === "Login Success") {
        storeDetails(email, password);

        storeId(result.investor_id);

        localStorage.setItem("id", result.investor_id);

        router.push("/Dashboard");
      } else {
        alert(result.error || result.message);
      }
    } catch (err) {
      console.log(err);

      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-[420px] bg-zinc-950 border border-orange-500/30 rounded-3xl p-10 shadow-[0_0_40px_rgba(249,115,22,0.15)]">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="bg-orange-500 p-4 rounded-2xl mb-5">
            <IndianRupee size={35} className="text-white" />
          </div>

          <h1 className="text-4xl font-bold text-white">Growest</h1>

          <p className="text-zinc-400 mt-2">Investment Tracker Login</p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-5">
          {/* Email */}
          <div>
            <p className="text-zinc-300 mb-2 font-medium">Email</p>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-orange-500 outline-none rounded-2xl px-5 py-4 text-white transition"
            />
          </div>

          {/* Password */}
          <div>
            <p className="text-zinc-300 mb-2 font-medium">Password</p>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-orange-500 outline-none rounded-2xl px-5 py-4 text-white transition"
            />
          </div>

          {/* Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 transition rounded-2xl py-4 text-white font-bold text-lg mt-4 shadow-lg shadow-orange-500/20 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
