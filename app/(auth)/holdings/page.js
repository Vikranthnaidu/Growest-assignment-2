"use client"

import Header from "@/app/components/dashboard/header";
import InvestorIDContext from "@/app/core/contexts/InvestorIDContext";
import { useContext, useEffect, useState } from "react"

export default function Holdings() {

    const [holdings, setHoldings] = useState([])

    const { id } = useContext(InvestorIDContext);

    useEffect(() => {

        if (!id) return;

        const fetchHoldings = async () => {

            try {

                const response = await fetch(
                    `http://localhost:4000/sip/invest/${id}/holdings`,
                    {
                        method: "GET",
                        credentials: "include"
                    }
                )

                console.log("Holdings API Response:", response)

                if (!response.ok) {
                    throw new Error(`Failed to fetch holdings: ${response.status} ${response.statusText}`);
                }

                const result = await response.json()

                console.log("Holdings Data:", result)

                // Filter out any empty rows caused by LEFT JOIN if the user has no SIPs
                const validHoldings = (result.holdings || []).filter(item => item.sip_id != null);
                setHoldings(validHoldings)

            } catch (err) {
                console.error("Holdings Fetch Error:", err)
            }
        }

        fetchHoldings()

    }, [id])

    return (
        
    <div className="flex-1 min-h-screen w-full bg-black p-10">
        <div className="flex justify-between items-center mb-10">

            <div>
                <h1 className="text-4xl font-bold text-white-800">
                    Holdings
                </h1>

                <p className="text-gray-500 mt-2">
                    View all investor mutual fund holdings
                </p>
            </div>

        </div>

        <div className="overflow-x-auto bg-black rounded-2xl shadow-lg">

            <table className="min-w-full">

                <thead className="bg-orange-500 text-black">

                    <tr>

                        <th className="px-6 py-4 text-left">
                            SIP ID
                        </th>

                        <th className="px-6 py-4 text-left">
                            Fund Name
                        </th>

                        <th className="px-6 py-4 text-left">
                            AMC
                        </th>

                        <th className="px-6 py-4 text-left">
                            Amount
                        </th>


                        <th className="px-6 py-4 text-left">
                            Current NAV
                        </th>

                        <th className="px-6 py-4 text-left">
                            Purchase Date
                        </th>

                        <th className="px-6 py-4 text-left">
                            Status
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {
                        holdings?.map((item, index) => (

                            <tr
                                key={index}
                                className="border-b hover:bg-gray-50 transition-all duration-200"
                            >

                                <td className="px-6 py-4">
                                    {item.sip_id}
                                </td>

                                <td className="px-6 py-4 font-semibold text-gray-700">
                                    {item.fund_name}
                                </td>

                                <td className="px-6 py-4">
                                    {item.amc_name}
                                </td>

                                <td className="px-6 py-4">
                                    ₹ {item.amount}
                                </td>

                                <td className="px-6 py-4 text-green-600 font-semibold">
                                    ₹ {item.current_nav}
                                </td>

                                <td className="px-6 py-4">
                                    {
                                        new Date(item.purchase_date)
                                            .toLocaleDateString()
                                    }
                                </td>

                                <td className="px-6 py-4">

                                    <span
                                        className={`
                                            px-3 py-1 rounded-full text-sm font-semibold
                                            ${
                                                item.status === "ACTIVE"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }
                                        `}
                                    >
                                        {item.status}
                                    </span>

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>

    </div>
)
}