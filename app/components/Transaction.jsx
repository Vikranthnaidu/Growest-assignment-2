"use client";

import { useContext, useEffect, useState } from "react";

import InvestorIDContext from "@/app/core/contexts/InvestorIDContext";

export default function Transactions() {
  const { id } = useContext(InvestorIDContext);

  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchTransactions = async () => {
      try {
        console.log("Investor ID:", id);

        const response = await fetch(
          `http://localhost:4000/sip/trans/${id}/transactions`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        console.log("Response:", response);

        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const result = await response.json();

        console.log("Result:", result);

        setTransactions(result.transactions || []);
      } catch (error) {
        console.log("ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [id]);

  console.log("Transactions State:", transactions);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh] bg-black">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-5"></div>

          <h1 className="text-white text-2xl font-bold">
            Loading Transactions...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen p-10">
      {/* Top Analytics Cards */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        {/* Team Payments */}
        <div className="bg-zinc-950 border border-dashed border-zinc-700 rounded-3xl p-6 hover:border-orange-500 transition">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white leading-tight">
                Team <br /> Payments
              </h1>

              <div className="flex items-center gap-2 mt-6">
                <div className="bg-blue-500 p-2 rounded-lg text-xs">📅</div>

                <p className="text-zinc-400">07 Dec approval</p>
              </div>
            </div>

            <div className="text-white text-xl">🔔</div>
          </div>

          {/* Avatars */}
          <div className="flex items-center mt-10">
            <img
              src="https://i.pravatar.cc/50?img=11"
              className="w-12 h-12 rounded-full border-2 border-black"
            />

            <img
              src="https://i.pravatar.cc/50?img=12"
              className="w-12 h-12 rounded-full border-2 border-black -ml-4"
            />

            <img
              src="https://i.pravatar.cc/50?img=13"
              className="w-12 h-12 rounded-full border-2 border-black -ml-4"
            />

            <div className="bg-zinc-900 text-white px-4 py-2 rounded-full -ml-4 border border-zinc-700">
              25+
            </div>
          </div>
        </div>

        {/* Savings */}
        <div className="bg-zinc-950 border border-dashed border-zinc-700 rounded-3xl p-6 hover:border-orange-500 transition">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-5 h-5 rounded-full bg-purple-500"></div>

            <h1 className="text-4xl font-bold text-white">Savings</h1>
          </div>

          {/* Fake Chart */}
          <div className="flex items-end gap-2 h-24 mb-8">
            <div className="bg-cyan-400 w-4 h-10 rounded-full"></div>
            <div className="bg-cyan-400 w-4 h-16 rounded-full"></div>
            <div className="bg-cyan-400 w-4 h-8 rounded-full"></div>
            <div className="bg-cyan-400 w-4 h-20 rounded-full"></div>
            <div className="bg-cyan-400 w-4 h-14 rounded-full"></div>
            <div className="bg-cyan-400 w-4 h-24 rounded-full"></div>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-5xl font-bold text-white">₹5,839</h1>

              <p className="text-red-400 mt-2">↘ -11% last week</p>
            </div>

            <button className="bg-black border border-zinc-700 hover:border-orange-500 transition w-14 h-14 rounded-full text-white text-2xl">
              →
            </button>
          </div>
        </div>

        {/* Income Statistics */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 hover:border-orange-500 transition">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white leading-tight">
              Income statistics
            </h1>

            <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
              +8%
            </div>
          </div>

          <div className="flex items-end justify-between h-52">
            <div className="flex flex-col items-center">
              <div className="bg-cyan-200 w-16 h-24 rounded-t-3xl"></div>
              <p className="text-zinc-400 mt-3">15%</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-purple-200 w-16 h-36 rounded-t-3xl"></div>
              <p className="text-zinc-400 mt-3">21%</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-orange-500 w-16 h-48 rounded-t-3xl"></div>
              <p className="text-zinc-400 mt-3">32%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">Transactions</h1>

        <p className="text-zinc-400 mt-2">Recent SIP transaction history</p>
      </div>

      {/* Table */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-zinc-800">
          <h2 className="text-2xl font-semibold text-white">
            Transaction Records
          </h2>

          <input
            type="text"
            placeholder="Search transactions..."
            className="bg-zinc-900 border border-zinc-700 focus:border-orange-500 outline-none px-5 py-3 rounded-2xl text-white w-72 transition"
          />
        </div>

        {transactions.length === 0 ? (
          <div className="p-20 text-center">
            <h1 className="text-2xl font-bold text-zinc-300">
              No Transactions Found
            </h1>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-900">
                <tr>
                  <th className="text-left px-8 py-5 text-zinc-400 font-medium">
                    Transaction ID
                  </th>

                  <th className="text-left px-8 py-5 text-zinc-400 font-medium">
                    SIP ID
                  </th>

                  <th className="text-left px-8 py-5 text-zinc-400 font-medium">
                    Amount
                  </th>

                  <th className="text-left px-8 py-5 text-zinc-400 font-medium">
                    Transaction Type
                  </th>

                  <th className="text-left px-8 py-5 text-zinc-400 font-medium">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((transaction, index) => (
                  <tr
                    key={index}
                    className="border-t border-zinc-800 hover:bg-zinc-900 transition duration-200"
                  >
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-white font-semibold">
                          #{transaction.transaction_id}
                        </span>

                        <span className="text-zinc-500 text-sm mt-1">
                          Transaction
                        </span>
                      </div>
                    </td>

                    <td className="px-8 py-6 text-zinc-300 font-medium">
                      {transaction.sip_id}
                    </td>

                    <td className="px-8 py-6">
                      <span className="text-green-400 font-bold text-lg">
                        ₹ {transaction.amount}
                      </span>
                    </td>

                    <td className="px-8 py-6">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          transaction.transaction_type === "BUY"
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-red-500/20 text-red-400 border border-red-500/30"
                        }`}
                      >
                        {transaction.transaction_type}
                      </span>
                    </td>

                    <td className="px-8 py-6 text-zinc-400">
                      {new Date(
                        transaction.transaction_date,
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
