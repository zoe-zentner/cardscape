import React, { useEffect, useState, useRef } from "react";
import { FlatList, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { getProducts } from "../../api/api"; // Fetch products from API
import { ListHeader } from "../../components/list-header";
import { ProductListItem } from "../../components/product-list-item"; // Product rendering component
import { groupProductsByCategory } from "../../utils/productUtils"; // Group products by category

const Home = () => {
    const [products, setProducts] = useState<any[]>([]); // State to store fetched products
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const flatListRef = useRef<FlatList>(null);

    // Fetch products from the database (API)
    useEffect(() => {
        const fetchProducts = async () => {
            const token = "CuD8bDWCJxSsFtx"; // Replace with the actual token
            try {
                const data = await getProducts(token); // Fetch data from API
                setProducts(data); // Store the fetched products
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false); // Once data is fetched, set loading to false
            }
        };

        fetchProducts();
    }, []);

    // If still loading, show loading indicator
    if (loading) {
        return <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />;
    }

    // Group products by category after fetching
    const groupedProducts = groupProductsByCategory(products);

    // Function to scroll to a specific category
    const handleCategorySelect = (categorySlug: string) => {
        const categoryIndex = groupedProducts.findIndex(
            (group) => group.title.toLowerCase() === categorySlug.toLowerCase()
        );
        if (categoryIndex !== -1 && flatListRef.current) {
            flatListRef.current.scrollToIndex({
                index: categoryIndex,
                animated: true,
            });
        }
    };

    return (
        <View style={styles.screenContainer}>
            <FlatList
                ref={flatListRef}
                data={groupedProducts}
                renderItem={({ item }) => (
                    <View style={styles.categoryContainer}>
                        <Text style={styles.categoryTitle}>{item.title}</Text>
                        <FlatList
                            data={item.data}
                            renderItem={({ item }) => (
                                <ProductListItem product={item} /> // Pass each product to ProductListItem
                            )}
                            keyExtractor={(product) => product.id.toString()}
                            numColumns={4}
                            columnWrapperStyle={styles.flatListColumn}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                )}
                keyExtractor={(item) => item.title}
                ListHeaderComponent={
                    <ListHeader onCategorySelect={handleCategorySelect} />
                }
                contentContainerStyle={styles.flatListContent}
                style={{ paddingHorizontal: 10, paddingVertical: 5 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    flatListContent: {
        paddingBottom: 20,
    },
    categoryContainer: {
        marginBottom: 20,
    },
    categoryTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10,
    },
    flatListColumn: {
        justifyContent: "flex-start",
        gap: 6.5,
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Home;
