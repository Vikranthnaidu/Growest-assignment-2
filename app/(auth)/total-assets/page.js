"use client";

import { useEffect, useState, useContext } from "react";
import InvestorIDContext from "@/app/core/contexts/InvestorIDContext";

export default function TotalAssets() {
  const { id } = useContext(InvestorIDContext);

  const [netWorth, setNetWorth]       = useState(null);
  const [investor, setInvestor]       = useState(null);
  const [holdings, setHoldings]       = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchAll = async () => {
      try {
        setLoading(true);

        // Fetch all 3 APIs in parallel
        const [networthRes, investorRes, holdingsRes, transactionsRes] =
          await Promise.all([
            fetch(`http://localhost:4000/sip/invest/${id}/networth`,        { credentials: "include" }),
            fetch(`http://localhost:4000/sip/invest/${id}`,                 { credentials: "include" }),
            fetch(`http://localhost:4000/sip/invest/${id}/holdings`,        { credentials: "include" }),
            fetch(`http://localhost:4000/sip/trans/${id}/transactions`,     { credentials: "include" }),
          ]);

        if (!networthRes.ok) throw new Error("Failed to fetch net worth");

        const [networthData, investorData, holdingsData, transData] =
          await Promise.all([
            networthRes.json(),
            investorRes.ok    ? investorRes.json()    : null,
            holdingsRes.ok    ? holdingsRes.json()    : null,
            transactionsRes.ok? transactionsRes.json(): null,
          ]);

        setNetWorth(networthData.NetWorth);
        if (investorData)   setInvestor(investorData.Data);
        if (holdingsData)   setHoldings(holdingsData.holdings || []);
        if (transData)      setTransactions(transData.transactions || []);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [id]);

  // ─── Derived Stats ───────────────────────────────────────────────
  const activeSips     = holdings.filter((h) => h.status === "ACTIVE").length;
  const inactiveSips   = holdings.filter((h) => h.status !== "ACTIVE").length;
  const totalInvested  = transactions.reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
  const totalUnits     = transactions.reduce((sum, t) => sum + parseFloat(t.units  || 0), 0);

  const fmt = (num) =>
    parseFloat(num || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  // ─── Loading ─────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex-1 min-h-screen bg-black flex items-center justify-center p-10">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-orange-500/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-orange-500 animate-spin"></div>
          </div>
          <p className="text-gray-400 text-lg font-medium">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  // ─── Error ───────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex-1 min-h-screen bg-black flex items-center justify-center p-10">
        <div className="bg-zinc-900 border border-red-500/30 rounded-2xl p-8 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  // ─── Page ────────────────────────────────────────────────────────
  return (
    <div className="flex-1 min-h-screen bg-black p-8 lg:p-12">

      {/* ── Page Header ── */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-8 bg-orange-500 rounded-full"></div>
          <h1 className="text-4xl font-bold text-white tracking-tight">Total Assets</h1>
        </div>
        <p className="text-gray-500 ml-4 mt-1">Your complete financial overview at a glance</p>
      </div>

      {/* ── Hero Card ── */}
      <div className="relative bg-zinc-900 rounded-3xl p-8 mb-6 overflow-hidden border border-zinc-800">
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-orange-500/5 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Investor Info */}
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse"></span>
              INVESTOR PROFILE
            </span>
            <h2 className="text-3xl font-bold text-white mb-1">
              {investor
                ? `${investor.first_name} ${investor.last_name ?? ""}`.trim()
                : netWorth?.first_name}
            </h2>
            <p className="text-gray-400 text-sm">
              Investor ID &nbsp;
              <span className="text-orange-400 font-mono font-semibold">#{netWorth?.investor_id}</span>
            </p>
            {investor?.occupation && (
              <p className="text-gray-500 text-sm mt-1 capitalize">{investor.occupation}</p>
            )}
          </div>

          {/* Net Worth */}
          <div className="md:text-right">
            <p className="text-gray-500 text-xs font-medium mb-1 uppercase tracking-widest">Net Worth</p>
            <p className="text-5xl font-extrabold text-white">
              ₹<span className="text-orange-400">{fmt(netWorth?.net_worth)}</span>
            </p>
            <p className="text-gray-600 text-xs mt-2">Calculated from current NAV</p>
          </div>
        </div>
      </div>

      {/* ── Primary Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        {/* Total Invested */}
        <StatCard
          icon={
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          }
          label="Total Invested"
          value={`₹${fmt(totalInvested)}`}
          highlight
        />

        {/* Net Worth */}
        <StatCard
          icon={
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          }
          label="Current Net Worth"
          value={`₹${fmt(netWorth?.net_worth)}`}
        />

        {/* Total Transactions */}
        <StatCard
          icon={
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          }
          label="Total Transactions"
          value={transactions.length}
        />

        {/* Total Units */}
        <StatCard
          icon={
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          }
          label="Total Units Held"
          value={parseFloat(totalUnits).toFixed(4)}
        />
      </div>

      {/* ── Secondary Row ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">

        {/* Active SIPs */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-green-500/30 transition-all duration-300 group">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center group-hover:bg-green-500/20 transition-colors duration-300">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-gray-500 text-sm font-medium">Active SIPs</span>
          </div>
          <p className="text-3xl font-bold text-green-400">{activeSips}</p>
          <p className="text-gray-600 text-xs mt-1">Currently running</p>
        </div>

        {/* Inactive SIPs */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-red-500/30 transition-all duration-300 group">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center group-hover:bg-red-500/20 transition-colors duration-300">
              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-gray-500 text-sm font-medium">Inactive SIPs</span>
          </div>
          <p className="text-3xl font-bold text-red-400">{inactiveSips}</p>
          <p className="text-gray-600 text-xs mt-1">Paused / stopped</p>
        </div>

        {/* Total Funds */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-orange-500/30 transition-all duration-300 group">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center group-hover:bg-orange-500/20 transition-colors duration-300">
              <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <span className="text-gray-500 text-sm font-medium">Total SIPs</span>
          </div>
          <p className="text-3xl font-bold text-white">{holdings.filter(h => h.sip_id != null).length}</p>
          <p className="text-gray-600 text-xs mt-1">Across all funds</p>
        </div>
      </div>

      {/* ── Investor Details Card ── */}
      {investor && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
            <h2 className="text-xl font-bold text-white">Investor Details</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <DetailItem label="Full Name"    value={`${investor.first_name} ${investor.middle_name ?? ""} ${investor.last_name ?? ""}`.trim()} />
            <DetailItem label="Gender"       value={investor.gender}       />
            <DetailItem label="Occupation"   value={investor.occupation}   />
            <DetailItem label="Date of Birth" value={investor.data_of_birth ? new Date(investor.data_of_birth).toLocaleDateString("en-IN") : "—"} />
            <DetailItem label="PAN"          value={investor.pan}          mono />
            <DetailItem label="Aadhar"       value={investor.aadhar ? `****  ****  ${String(investor.aadhar).slice(-4)}` : "—"} mono />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Reusable Stat Card ──────────────────────────────────────────────────────
function StatCard({ icon, label, value, highlight = false }) {
  return (
    <div
      className={`rounded-2xl p-6 border transition-all duration-300 group ${
        highlight
          ? "bg-gradient-to-br from-orange-500/20 to-orange-600/5 border-orange-500/30 hover:border-orange-500/60"
          : "bg-zinc-900 border-zinc-800 hover:border-orange-500/30"
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
            highlight
              ? "bg-orange-500/20 group-hover:bg-orange-500/30"
              : "bg-orange-500/10 group-hover:bg-orange-500/20"
          }`}
        >
          <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {icon}
          </svg>
        </div>
        <span className={`text-sm font-medium ${highlight ? "text-orange-400/80" : "text-gray-500"}`}>
          {label}
        </span>
      </div>
      <p className={`text-2xl font-bold ${highlight ? "text-orange-400" : "text-white"}`}>
        {value}
      </p>
    </div>
  );
}

// ─── Reusable Detail Row ─────────────────────────────────────────────────────
function DetailItem({ label, value, mono = false }) {
  return (
    <div>
      <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{label}</p>
      <p className={`text-white font-semibold capitalize ${mono ? "font-mono tracking-widest text-orange-300" : ""}`}>
        {value || "—"}
      </p>
    </div>
  );
}