import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";

export default function ProductLayout() {
    const navigation = useNavigation();

    return (
        <Stack>
            <Stack.Screen
                name="[id]"
                options={{
                    headerShown: true,
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.goBack(); // Use navigation.goBack() here
                            }}
                        >
                            <Ionicons
                                name="arrow-back"
                                size={24}
                                color="black"
                            />
                        </TouchableOpacity>
                    ),
                }}
            />
        </Stack>
    );
}
