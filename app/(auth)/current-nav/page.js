"use client";

import { useEffect, useState } from "react";
import SideBar from "@/app/components/dashboard/sidebar";

export default function CurrentNAV() {
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [updatedNav, setUpdatedNav] = useState("");

  // Fetch all funds
  const fetchFunds = async () => {
    try {
      const response = await fetch("http://localhost:4000/sip/fund/getFunds", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("RESPONSE:", response);

      if (!response.ok) {
        throw new Error("Failed to fetch funds");
      }

      const data = await response.json();

      console.log("DATA:", data);

      setFunds(data);
    } catch (error) {
      console.error("ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFunds();
  }, []);

  // Update NAV
  const handleUpdateNAV = async (fundId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/sip/fund/${fundId}/nav`,
        {
          method: "PUT", // or PATCH based on backend route
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            current_nav: updatedNav,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update NAV");
      }

      const result = await response.json();

      console.log(result);

      // Refresh funds list
      fetchFunds();

      // Reset states
      setEditingId(null);
      setUpdatedNav("");
    } catch (error) {
      console.error("ERROR:", error);
    }
  };

  return (
    <div className="flex bg-black min-h-screen text-white">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h1 className="text-4xl font-bold mb-8">Current NAV Page</h1>

        {loading ? (
          <p>Loading funds...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-700">
              <thead className="bg-gray-900">
                <tr>
                  <th className="p-4 border border-gray-700">ID</th>
                  <th className="p-4 border border-gray-700">Fund Name</th>
                  <th className="p-4 border border-gray-700">AMC Name</th>
                  <th className="p-4 border border-gray-700">Current NAV</th>
                  <th className="p-4 border border-gray-700">Action</th>
                </tr>
              </thead>

              <tbody>
                {funds.map((fund) => (
                  <tr key={fund.id} className="text-center">
                    <td className="p-4 border border-gray-700">{fund.id}</td>

                    <td className="p-4 border border-gray-700">{fund.name}</td>

                    <td className="p-4 border border-gray-700">
                      {fund.amc_name}
                    </td>

                    <td className="p-4 border border-gray-700">
                      {editingId === fund.id ? (
                        <input
                          type="number"
                          value={updatedNav}
                          onChange={(e) => setUpdatedNav(e.target.value)}
                          className="bg-gray-800 border border-gray-600 px-3 py-2 rounded text-white"
                        />
                      ) : (
                        fund.current_nav
                      )}
                    </td>

                    <td className="p-4 border border-gray-700">
                      {editingId === fund.id ? (
                        <button
                          onClick={() => handleUpdateNAV(fund.id)}
                          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingId(fund.id);
                            setUpdatedNav(fund.current_nav);
                          }}
                          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                        >
                          Update NAV
                        </button>
                      )}
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
