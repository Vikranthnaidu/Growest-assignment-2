"use client";

import { useEffect, useState, useContext } from "react";
import InvestorIDContext from "@/app/core/contexts/InvestorIDContext";

export default function TotalAssets() {
  const { id } = useContext(InvestorIDContext);
  const [netWorth, setNetWorth] = useState(null);

  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/sip/invest/${id}/networth`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        console.log("Response:", response);

        if (!response.ok) {
          throw new Error("Unauthorized or API Failed");
        }

        const data = await response.json();

        console.log(data);

        setNetWorth(data.NetWorth);
      } catch (err) {
        console.log(err);

        setError(err.message);
      }
    };

    fetchData();
  }, [id]);

  if (error) {
    return (
      <div className="bg-black text-red-500 min-h-screen p-10">
        {error}
      </div>
    );
  }

  if (!netWorth) {
    return (
      <div className="bg-black text-white min-h-screen p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen p-10">
      <h1 className="text-5xl font-bold mb-10">
        Total Assets
      </h1>

      <div className="bg-zinc-900 p-10 rounded-3xl">
        <h1 className="text-3xl mb-5 text-white">
          Investor ID: {netWorth.investor_id}
        </h1>

        <h1 className="text-3xl mb-5 text-white ">
          Investor Name: {netWorth.first_name}
        </h1>

        <h1 className="text-3xl">
          Net Worth: ₹{netWorth.net_worth}
        </h1>
      </div>
    </div>
  );
}