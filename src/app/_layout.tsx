import { Stack } from "expo-router";
import { ToastProvider } from "react-native-toast-notifications";
import { UserProvider } from "../context/UserContext"; // Import UserContext

export default function RootLayout() {
    return (
        <UserProvider>
            <ToastProvider>
                <Stack>
                    <Stack.Screen
                        name="(shop)"
                        options={{
                            headerShown: false,
                            title: "Shop",
                            headerTitleAlign: "center",
                        }}
                    />
                    <Stack.Screen
                        name="categories"
                        options={{ headerShown: true, title: "Categories" }}
                    />
                    <Stack.Screen
                        name="product"
                        options={{ headerShown: false, title: "Product" }}
                    />
                    <Stack.Screen
                        name="cart"
                        options={{
                            presentation: "modal",
                            title: "Shopping Cart",
                            headerTitleAlign: "center",
                        }}
                    />
                    <Stack.Screen name="auth" options={{ headerShown: true }} />
                </Stack>
            </ToastProvider>
        </UserProvider>
    );
}
