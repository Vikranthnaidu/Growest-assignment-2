"use client"
import ProfileContext from "../contexts/ProfileContext";
import { useState } from "react";

export default function ProfileProvider ({children}){
    const [email, setEmail] = useState("")
    const [password,setPassword]= useState("")
    function storeDetails(email, password){
        setEmail(email)
        setPassword(password)
    }
    return (
        <ProfileContext.Provider value={{storeDetails, email}}>
            {children}
        </ProfileContext.Provider>
    )
}