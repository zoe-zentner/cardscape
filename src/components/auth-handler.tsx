import { useRouter } from "expo-router";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export const AuthHandler = () => {
    const router = useRouter();
    const auth = useContext(AuthContext);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true); // Ensure layout is mounted before navigating
    }, []);

    useEffect(() => {
        if (isMounted && !auth?.token) {
            router.replace("/auth"); // Redirect only after mount
        }
    }, [isMounted, auth?.token]);

    return null;
};
