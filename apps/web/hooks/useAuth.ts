"use client"


import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface User {
    id: string;
    username:string;
    name:string

}

export default function useAuth() {
    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check for token in localStorage on mount
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            // You could also fetch user data here if needed
        }
        setLoading(false);
    }, []);

    const login = async (newToken: string) => {
        try {
            localStorage.setItem('token', newToken);
            setToken(newToken);
            router.push('/canvas');
        } catch (error) {
            console.error('Login error:', error);
            logout();
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        router.push('/');
    };
    if(!token){
        const isAuthenticated = false
    }

    return {
        token,
        user,
        loading,
        isAuthenticated:Boolean,
        login,
        logout
    };

}