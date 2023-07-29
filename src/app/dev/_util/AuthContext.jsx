'use client'
import { createContext, useState, useEffect } from "react"
import { firebaseAuth } from "@/app/_util/Firebase"
import { onAuthStateChanged } from "firebase/auth"

export const AuthContext = createContext()

export default function AuthContextProvider({children}){
    let [currentUser, setCurrentUser] = useState("WAITING_FOR_AUTH")

    useEffect(() => {
        const AuthChanged = onAuthStateChanged(firebaseAuth, (user) => {
            setCurrentUser(user)
        })

        return () => AuthChanged()
    }, [])

    return <AuthContext.Provider value={{currentUser}}>
        {children}
    </AuthContext.Provider>
}