import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useLocalSearchParams, Redirect, Stack } from "expo-router";
import { getProducts } from "../../api/api"; // Your API fetching function

const ProductDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>(); // Get the product id from URL
    const [product, setProduct] = useState<any>(null); // Store the individual product
    const [relatedProducts, setRelatedProducts] = useState<any[]>([]); // Store related products
    const [loading, setLoading] = useState<boolean>(true); // Loading state

    // Function to generate the image URL based on the server configuration and ownership
    const getImageUrl = (imageName: string, owned: number) => {
        const baseUrl = "https://cardscape.uk:2033/"; // Base URL for the server
        const folder = owned === 1 ? "visible" : "hidden"; // Folder path depending on ownership
        return `${baseUrl}${folder}/${imageName}.png`; // Construct the full URL
    };

    useEffect(() => {
        const fetchProductDetails = async () => {
            const token = "CuD8bDWCJxSsFtx"; // Replace with the actual token
            try {
                // Fetch products from API
                const productsData = await getProducts(token);

                console.log("Products Data:", productsData); // Log the data to check its structure
                console.log("Requested ID:", id); // Log the ID from URL

                // Convert both to strings for comparison (if the product.id is a string)
                const foundProduct = productsData.find(
                    (product: any) => String(product.id) === id // Convert both to string for comparison
                );

                console.log("Found Product:", foundProduct); // Log the found product

                if (foundProduct) {
                    setProduct(foundProduct);

                    // Find related products (products from the same category)
                    const related = productsData.filter(
                        (p: any) => p.categoryId === foundProduct.categoryId && String(p.id) !== id // Ensure comparison works
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

    // Log to check the state of product before redirecting
    console.log("Product before render:", product);

    // If the product is still loading, show a loading spinner
    if (loading) {
        return <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />;
    }

    // If the product is not found, redirect to 404 page
    if (!product) {
        console.log("Redirecting to 404 page..."); // Log to ensure we're redirecting as expected
        return <Redirect href="/404" />;
    }

    return (
        <View style={styles.container}>
            {product ? (
                <>
                    <Stack.Screen options={{ title: product.name ? String(product.name) : "Product" }} />
                    <Image source={{ uri: getImageUrl(product.image, product.owner) }} style={styles.image} />
                    <Text style={styles.title}>{product.name ? String(product.name) : "Product Name"}</Text>
                    <Text style={styles.rarity}>Rarity: {product.rarity ? String(product.rarity) : "Unknown"}</Text>
                    <Text style={styles.relatedTitle}>More from this category</Text>
                    <FlatList
                        data={relatedProducts}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.relatedItem}>
                                <Image source={{ uri: getImageUrl(item.image, item.owner) }} style={styles.relatedImage} />
                                <Text>{item.name ? String(item.name) : "Related Product"}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => String(item.id)}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.relatedProductsContainer}
                    />
                </>
            ) : (
                <ActivityIndicator size="large" color="#0000ff" />
            )}
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
    rarity: {
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
