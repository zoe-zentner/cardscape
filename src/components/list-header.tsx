import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
// import { CATEGORIES } from "../../assets/categories";
import { getCategories } from "../api/api"; // Import the API utility

type ListHeaderProps = {
    onCategorySelect: (categorySlug: string) => void;
};

export const ListHeader = ({ onCategorySelect }: ListHeaderProps) => {
    const [categories, setCategories] = useState<any[]>([]); // State to store products
    const [loading, setLoading] = useState<boolean>(true); // Loading state

    useEffect(() => {
    const fetchCategories = async () => {
        const token = "CuD8bDWCJxSsFtx"; // Replace with the actual token
        try {
        const data = await getCategories(token); // Fetch cats from the server
        setCategories(data); // Store the fetched cats in the state
        } catch (error) {
        console.error("Error fetching category:", error); // Handle any errors
        } finally {
        setLoading(false); // Set loading to false when done
        }
    };

    fetchCategories();
    }, []);

    // If still loading, show a loading spinner
    if (loading) {
        return <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />;
    }

    return (
        <View style={[styles.headerContainer]}>
            <View style={styles.headerTop}>
                <View style={styles.headerLeft}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: "https://via.placeholder.com/40" }}
                            style={styles.avatarImage}
                        />
                        <Text style={styles.avatarText}>Hello Zoe!</Text>
                    </View>
                </View>
                <View style={styles.headerRight}>
                    <Link style={styles.cartContainer} href="/cart" asChild>
                        <Pressable>
                            {({ pressed }) => (
                                <View>
                                    <FontAwesome
                                        name="shopping-cart"
                                        size={25}
                                        color="gray"
                                        style={{
                                            marginRight: 15,
                                            opacity: pressed ? 0.5 : 1,
                                        }}
                                    />

                                    <View style={styles.badgeContainer}>
                                        <Text style={styles.badgeText}>
                                            {1}
                                        </Text>
                                    </View>
                                </View>
                            )}
                        </Pressable>
                    </Link>
                    <TouchableOpacity style={styles.signOutButton}>
                        <FontAwesome name="sign-out" size={25} color="red" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.heroContainer}>
                <Image
                    source={require("../../assets/images/hero.png")}
                    style={styles.heroImage}
                />
            </View>
            <View style={styles.categoriesContainer}>
                <Text style={styles.sectionTitle}>Categories</Text>
                <FlatList
                    data={categories || []}
                    renderItem={({ item }) => (
                        <Pressable
                            style={styles.category}
                            onPress={() => onCategorySelect(item.name.toLowerCase())} // Trigger scroll on category click
                        >
                            <Image
                                source={{
                                    uri: `https://cardscape.uk:2033/groups/${item.image}.png`, // Construct the full image URL using the filename
                                }}
                                style={styles.categoryImage}
                            />
                            <Text style={styles.categoryText}>{item.name}</Text>
                        </Pressable>
                    )}
                    keyExtractor={(item) => item.id.toString()} // Use id as the unique key
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        gap: 20,
    },
    headerTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    headerRight: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatarContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    avatarImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    avatarText: {
        fontSize: 16,
    },
    cartContainer: {
        padding: 10,
    },
    signOutButton: {
        padding: 10,
    },
    heroContainer: {
        width: "100%",
        height: 200,
    },
    heroImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        borderRadius: 20,
    },
    categoriesContainer: {},
    sectionTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    category: {
        width: 100,
        alignItems: "center",
        marginBottom: 16,
    },
    categoryImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: 8,
    },
    categoryText: {
        textAlign: "center",
        width: 70,
        flexWrap: "wrap",
    },
    badgeContainer: {
        position: "absolute",
        top: -5,
        right: 10,
        backgroundColor: "#1BC464",
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    badgeText: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
    },
});
