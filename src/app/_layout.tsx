import { Stack } from "expo-router";

export default function RootLayout() {
    return (
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
                name="series"
                options={{ headerShown: true, title: "Series" }}
            />

            <Stack.Screen
                name="product"
                options={{ headerShown: true, title: "Product" }}
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
    );
}
