import React from "react";
import { StyleSheet, Text, View, Image, Pressable, Dimensions } from "react-native";
import { Link } from "expo-router";

// Screen width to adjust the item size dynamically
const screenWidth = Dimensions.get("window").width;
const itemWidth = (screenWidth - 40) / 4; // Divide by 4 to create 4 items per row

export const ProductListItem = ({ product }: { product: any }) => {
    // Function to generate the image URL based on the server configuration and ownership
    const getImageUrl = (imageName: string, owned: number) => {
        const baseUrl = "https://cardscape.uk:2033/"; // Base URL for the server
        const folder = owned === 1 ? "visible" : "hidden"; // Folder path depending on ownership
        return `${baseUrl}${folder}/${imageName}.png`; // Construct the full URL
    };

    return (
        <Link asChild href={`/product/${product.id}`}>
            <Pressable style={[styles.item, { width: itemWidth }]}>
                <View style={[styles.itemImageContainer, { width: itemWidth }]}>
                    <Image
                        source={{ uri: getImageUrl(product.image, product.owner) }} // Get the image URL dynamically
                        style={styles.itemImage}
                    />
                </View>
                <View style={styles.itemTextContainer}>
                    <Text style={[styles.itemTitle, { width: itemWidth - 16 }]}>
                        {product.name} {/* Product name */}
                    </Text>
                    <Text style={styles.itemRarity}>
                        Rarity: {product.rarity} {/* Rarity info */}
                    </Text>
                </View>
            </Pressable>
        </Link>
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: "white",
        marginVertical: 8,
        borderRadius: 10,
        overflow: "hidden",
    },
    itemImageContainer: {
        height: 130, // Fixed height for consistent layout
        overflow: "hidden",
        borderRadius: 10,
    },
    itemImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        borderRadius: 10, // Rounded corners for the image
    },
    itemTextContainer: {
        padding: 8,
        alignItems: "flex-start",
        gap: 4,
    },
    itemTitle: {
        fontSize: 13,
        color: "black",
        lineHeight: 20,
        flexWrap: "wrap", // Allows text to wrap
    },
    itemRarity: {
        fontSize: 11,
        fontWeight: "bold",
    },
});

