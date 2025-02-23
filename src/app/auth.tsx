import { router } from "expo-router";
import { useState, useContext } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import { UserContext } from "../context/UserContext"; // Import UserContext

export default function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUserData } = useContext(UserContext); // Get setUserData to update user info

    const handleLogin = async () => {
        try {
            const normalizedEmail = email.trim().toLowerCase(); // Convert email to lowercase
    
            const response = await fetch("https://cardscape.uk:2033/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: normalizedEmail, password }),
            });
    
            const data = await response.json(); // Parse response as JSON
            // console.log("Raw response:", data); // Debugging log
    
            if (!response.ok || !data.token) {  
                Alert.alert("Login Failed", data.error || "Invalid email or password");
                return;
            }
    
            const token = data.token; // Extract token from response
            // console.log("Login token:", token); // Debugging
    
            // Store token in AsyncStorage
            await AsyncStorage.setItem("token", token);
    
            // Fetch user details after login
            fetchUserData(token);
    
            Alert.alert("Login Successful!");
            router.replace("/"); // Redirect to home page
        } catch (error) {
            console.error("Fetch error:", error);
            Alert.alert("Error", "Something went wrong. Please try again.");
        }
    };    

    // Function to fetch user data after login
    const fetchUserData = async (token: string) => {
        try {
            const response = await fetch(`https://cardscape.uk:2033/user?token=${token}`);
            const userData = await response.json();
            setUserData(userData); // Update user data in context
            console.log("User Data:", userData); // Debugging
        } catch (error) {
            console.error("Error fetching user data:", error);
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
