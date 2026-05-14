"use client";

import { useContext, useEffect, useState } from "react";

import InvestorIDContext from "@/app/core/contexts/InvestorIDContext";

export default function Transactions() {

  const { id } = useContext(InvestorIDContext);

  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {

    if (!id) return;

    const fetchTransactions = async () => {

      try {

        setLoading(true);

        const response = await fetch(
          `http://localhost:4000/sip/trans/${id}/transactions`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const result = await response.json();

        console.log("Transactions API Result:", result);

        setTransactions(result.transactions || []);

      } catch (err) {

        console.log(err);

        setError("Unable to fetch transactions");

      } finally {

        setLoading(false);

      }
    };

    fetchTransactions();

  }, [id]);

  // Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">

        <h1 className="text-2xl font-bold text-white">
          Loading Transactions...
        </h1>

      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">

        <h1 className="text-2xl font-bold text-red-500">
          {error}
        </h1>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-black text-white p-10">

      {/* Heading */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Transactions
        </h1>

        <p className="text-zinc-400 mt-2">
          SIP Transaction History
        </p>

      </div>

      {/* No Transactions */}
      {transactions.length === 0 ? (

        <div className="bg-zinc-900 rounded-2xl p-10 text-center">

          <h1 className="text-2xl font-bold text-zinc-300">
            No Transactions Found
          </h1>

        </div>

      ) : (

        /* Transactions Table */
        <div className="overflow-x-auto bg-zinc-900 rounded-2xl border border-zinc-800">

          <table className="w-full">

            <thead className="bg-zinc-800">

              <tr>

                <th className="p-5 text-left">
                  Transaction ID
                </th>

                <th className="p-5 text-left">
                  Fund Name
                </th>

                <th className="p-5 text-left">
                  SIP ID
                </th>

                <th className="p-5 text-left">
                  Amount
                </th>

                <th className="p-5 text-left">
                  Type
                </th>

                <th className="p-5 text-left">
                  NAV
                </th>

                <th className="p-5 text-left">
                  Units
                </th>

                <th className="p-5 text-left">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {transactions.map((transaction, index) => (

                <tr
                  key={index}
                  className="border-t border-zinc-800 hover:bg-zinc-800 transition"
                >

                  {/* Transaction ID */}
                  <td className="p-5 font-semibold">
                    #{transaction.transaction_id}
                  </td>

                  {/* Fund Name */}
                  <td className="p-5">
                    {transaction.fund_name}
                  </td>

                  {/* SIP ID */}
                  <td className="p-5">
                    {transaction.sip_id}
                  </td>

                  {/* Amount */}
                  <td className="p-5 text-green-400 font-bold">
                    ₹ {transaction.amount}
                  </td>

                  {/* Transaction Type */}
                  <td className="p-5">

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

                  {/* NAV */}
                  <td className="p-5">
                    {transaction.nav}
                  </td>

                  {/* Units */}
                  <td className="p-5">
                    {transaction.units}
                  </td>

                  {/* Date */}
                  <td className="p-5 text-zinc-400">

                    {new Date(
                      transaction.transaction_date
                    ).toLocaleDateString()}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}