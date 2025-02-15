import React from "react";
import { StyleSheet, Text, View, Image, Pressable, Dimensions } from "react-native";
import { Link } from "expo-router";

const screenWidth = Dimensions.get("window").width;
const itemWidth = (screenWidth - 40) / 4;

export const ProductListItem = ({ product, onImageLoad }: { product: any; onImageLoad: () => void }) => {
    // Function to generate the image URL based on the server configuration and ownership
    const getImageUrl = (imageName: string, owned: number) => {
        const baseUrl = "https://cardscape.uk:2033/";
        const folder = owned === 1 ? "visible" : "hidden";
        return `${baseUrl}${folder}/${imageName}.png`;
    };

    // Function to render stars based on the rarity value
    const renderStars = (rarity: number) => {
        const stars = [];
        for (let i = 0; i < rarity; i++) {
            stars.push("★"); // Add a filled star for each rarity point
        }
        return stars.join(" "); // Join all stars with a space
    };

    return (
        <Link asChild href={`/product/${product.id}`}>
            <Pressable style={[styles.item, { width: itemWidth }]}>
                <View style={[styles.itemImageContainer, { width: itemWidth }]}>
                    <Image
                        source={{ uri: getImageUrl(product.image, product.owner) }}
                        style={styles.itemImage}
                        onLoad={onImageLoad}
                    />
                </View>
                <View style={styles.itemTextContainer}>
                    <Text style={[styles.itemTitle, { width: itemWidth - 16 }]}>
                        {product.name}
                    </Text>
                    <Text style={styles.itemRarity}>
                        {renderStars(product.rarity)} {/* Render stars based on rarity */}
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
        height: 130,
        overflow: "hidden",
        borderRadius: 10,
    },
    itemImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        borderRadius: 10,
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
        flexWrap: "wrap",
    },
    itemRarity: {
        fontSize: 13,
        fontWeight: "bold",
        color: "#808080",
    },
});
