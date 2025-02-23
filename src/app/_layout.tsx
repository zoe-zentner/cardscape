import { Stack } from "expo-router";
import { ToastProvider } from "react-native-toast-notifications";
import { AuthProvider } from "../context/AuthContext";
import { UserProvider } from "../context/UserContext"; // Import UserProvider
import { AuthHandler } from "../components/auth-handler"; // Import the AuthHandler

export default function RootLayout() {
    return (
        <AuthProvider>
            <UserProvider> 
                <AuthHandler /> 
                <ToastProvider>
                    <Stack>
                        <Stack.Screen name="auth" options={{ headerShown: false }} />
                        <Stack.Screen name="(shop)" options={{ headerShown: false }} />
                        <Stack.Screen name="categories" options={{ headerShown: true }} />
                        <Stack.Screen name="product" options={{ headerShown: false }} />
                        <Stack.Screen name="cart" options={{ presentation: "modal", title: "Shopping Cart" }} />
                    </Stack>
                </ToastProvider>
            </UserProvider>
        </AuthProvider>
    );
}
