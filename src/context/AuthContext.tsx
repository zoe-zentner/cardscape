import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Load token and user data on mount
    useEffect(() => {
        const fetchAuthData = async () => {
            const savedToken = localStorage.getItem("token"); // Can be AsyncStorage for React Native
            if (savedToken) {
                setToken(savedToken);
                await fetchUserData(savedToken); // Fetch user data based on token
            }
            setLoading(false); // Data loading done
        };

        fetchAuthData();
    }, []);

    // Fetch user data based on the token
    const fetchUserData = async (token: string) => {
        try {
            const response = await fetch(`https://cardscape.uk:2033/user?token=${token}`);
            const data = await response.json();
            setUserData(data);

            // Log user data after it's fetched successfully
            console.log("User data retrieved: ", data); // Logs all the user details
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    // Function to handle login - called from Auth component
    const login = async (newToken: string, userInfo: any) => {
        setToken(newToken);
        setUserData(userInfo); // Set user data immediately upon login
        localStorage.setItem("token", newToken); // Persist token (AsyncStorage in React Native)
        
        // Log the user info after login
        console.log("User logged in: ", userInfo); // Logs the user details
    };

    // Function to log out user and clear session
    const logout = () => {
        setToken(null);
        setUserData(null);
        localStorage.removeItem("token"); // Clear token from storage (AsyncStorage in React Native)
        console.log("User logged out");
    };

    return (
        <AuthContext.Provider value={{ token, userData, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
