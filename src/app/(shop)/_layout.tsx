import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>["name"];
    color: string;
}) {
    return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

const tabsLayout = () => {
    return (
        <SafeAreaView style={styles.SafeArea}>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: "orange",
                    tabBarInactiveTintColor: "gray",
                    tabBarLabelStyle: { fontSize: 16 },
                    tabBarStyle: {
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        paddingTop: 10,
                        height: 70,
                        paddingBottom: 10,
                    },
                    headerShown: false,
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Shop",
                        tabBarIcon(props) {
                            return <TabBarIcon {...props} name="book" />;
                        },
                        headerTitleAlign: "center",
                    }}
                />
                <Tabs.Screen
                    name="orders"
                    options={{
                        title: "Orders",
                        tabBarIcon(props) {
                            return (
                                <TabBarIcon {...props} name="shopping-cart" />
                            );
                        },
                        headerTitleAlign: "center",
                    }}
                />
            </Tabs>
        </SafeAreaView>
    );
};

export default tabsLayout;

const styles = StyleSheet.create({
    SafeArea: {
        flex: 1,
    },
});
