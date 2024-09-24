"use client"
import { auth } from '@/firebase/firebase.auth'
import { onAuthStateChanged } from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'

type AuthContextType = {
    isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export default function AuthContextProvider({children}: {children: React.ReactNode}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                setIsAuthenticated(true)
                console.log(user);
            } else {
                setIsAuthenticated(false)
            }
        })
        console.log(isAuthenticated);
        
    }, [isAuthenticated])
    return (
        <AuthContext.Provider value={{isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)