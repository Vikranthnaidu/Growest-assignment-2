"use client"

import Sidebar from "@/app/components/dashboard/sidebar"
import Header from "@/app/components/dashboard/header"
import InvestorIDContext from "@/app/core/contexts/InvestorIDContext"
import ProfileContext from "@/app/core/contexts/ProfileContext"
import { useContext, useEffect, useState } from "react"
import Transactions from "@/app/components/Transaction"

export default function Dashboard() {

    

    
    return (
        <div className="flex-1 bg-gray-200 h-screen">
            <Header/>
            <Transactions/>
        </div>
    )
}