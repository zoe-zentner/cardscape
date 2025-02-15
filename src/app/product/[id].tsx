import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useLocalSearchParams, Redirect, Stack } from "expo-router";
import { getProducts } from "../../api/api"; // Your API fetching function

const ProductDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>(); // Get the product id from URL
    const [product, setProduct] = useState<any>(null); // Store the individual product
    const [relatedProducts, setRelatedProducts] = useState<any[]>([]); // Store related products
    const [loading, setLoading] = useState<boolean>(true); // Loading state

    // Fetch the product and related products
    useEffect(() => {
        const fetchProductDetails = async () => {
            const token = "CuD8bDWCJxSsFtx"; // Replace with the actual token
            try {
                // Fetch products from API
                const productsData = await getProducts(token);
                const foundProduct = productsData.find((product: any) => product.id === id); // Use id here

                if (foundProduct) {
                    setProduct(foundProduct);

                    // Find related products (products from the same category)
                    const related = productsData.filter(
                        (p: any) => p.categoryId === foundProduct.categoryId && p.id !== foundProduct.id // Use id here
                    );
                    setRelatedProducts(related);
                }
            } catch (error) {
                console.error("Error fetching product details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    // If the product is not found, redirect to 404 page
    if (!product) return <Redirect href="/404" />;

    // If still loading, show a loading indicator
    if (loading) {
        return <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            {/* Product Banner */}
            <Stack.Screen options={{ title: product.title }} />
            <Image source={{ uri: product.heroImage }} style={styles.image} />
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
                            source={{ uri: item.heroImage }}
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
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
