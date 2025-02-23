import React, { useContext, useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { getCategories } from "../../api/api";
import { ListHeader } from "../../components/list-header";
import { ProductListItem } from "../../components/product-list-item";
import { groupProductsByCategory } from "../../utils/productUtils";
import { useProductStore } from "../../store/store";
import { UserContext } from "../../context/UserContext";

// const Home = () => {
//     return (<Auth />);
// };

// export default Home;

const Home = () => {
    const { products, fetchProducts } = useProductStore(); // ✅ Call Zustand outside useEffect
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { userData } = useContext(UserContext);
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            setLoading(true);
            try {
                if (!userData || !userData.token) return; // ✅ Ensure token exists
                await fetchProducts(userData.token); // ✅ Use dynamic token
                const categoryData = await getCategories(userData.token); // ✅ Use dynamic token
                if (isMounted) setCategories(categoryData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchData();

        return () => {
            isMounted = false; // ✅ Cleanup function
        };
    }, [fetchProducts, userData]); // ✅ Depend on userData to refetch when it changes

    if (loading) {
        return <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />;
    }

    const groupedProducts = groupProductsByCategory(products, categories);

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
                        <Text style={styles.categoryTitle}>
                            {categories.find((cat) => cat.id === item.title)?.name || item.title}
                        </Text>
                        <FlatList
                            data={item.data}
                            renderItem={({ item }) => (
                                <ProductListItem product={item} onImageLoad={() => {}} />
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
                    <ListHeader categories={categories} onCategorySelect={handleCategorySelect} />
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
