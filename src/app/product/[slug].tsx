import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import { PRODUCTS } from "../../../assets/products";

const ProductDetails = () => {
    const { slug } = useLocalSearchParams<{ slug: string }>();

    // Find the product by slug
    const product = PRODUCTS.find((product) => product.slug === slug);

    // Redirect if product not found
    if (!product) return <Redirect href="/404" />;

    // Get all products in the same category
    const relatedProducts = PRODUCTS.filter(
        (p) =>
            p.category.slug === product.category.slug && p.slug !== product.slug
    );

    return (
        <View style={styles.container}>
            {/* Product Banner */}
            <Stack.Screen options={{ title: product.title }} />
            <Image source={product.heroImage} style={styles.image} />
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>

            {/* Related Products Section */}
            <Text style={styles.relatedTitle}>More from this category</Text>

            {/* Horizontal Scroll View for Related Products */}
            <FlatList
                data={relatedProducts}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.relatedItem}>
                        <Image
                            source={item.heroImage}
                            style={styles.relatedImage}
                        />
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.relatedProductsContainer}
            />
        </View>
    );
};

export default ProductDetails;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "white",
    },
    image: {
        width: "100%",
        height: 300,
        resizeMode: "contain",
        marginBottom: 20,
        marginTop: "18%",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    price: {
        fontSize: 18,
        color: "gray",
        textAlign: "center",
    },
    relatedTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: "12%", // Increase the top margin to push it further down
        marginBottom: 10,
    },
    relatedProductsContainer: {
        paddingBottom: 20,
        paddingLeft: 10, // Add left padding for a more compact scroll view
    },
    relatedItem: {
        marginRight: 10, // Reduce the margin to make items closer
    },
    relatedImage: {
        width: 120, // Smaller image size for the scroll bar
        height: 120,
        resizeMode: "contain",
    },
});
