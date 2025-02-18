import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            const response = await fetch("https://cardscape.uk:2033/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json(); // Parse response
    
            console.log("Raw response:", data); // Debugging log
    
            if (!response.ok || data.error) {  // Check for error in response
                Alert.alert("Login Failed", data.error || "Invalid email or password");
                return;
            }
    
            Alert.alert("Login Successful!", `Welcome, ${data.username}`);
            // navigation.reset({
            //     index: 0,
            //     routes: [{ name: "Home" , params: { token: data.token } }],
            // });
            // Store the auth token if needed
        } catch (error) {
            console.error("Fetch error:", error);
            Alert.alert("Error", "Something went wrong. Please try again.");
        }
    };
    

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={{
                    height: 40,
                    borderColor: "gray",
                    borderWidth: 1,
                    marginBottom: 10,
                    paddingLeft: 8,
                }}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{
                    height: 40,
                    borderColor: "gray",
                    borderWidth: 1,
                    marginBottom: 20,
                    paddingLeft: 8,
                }}
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
}
