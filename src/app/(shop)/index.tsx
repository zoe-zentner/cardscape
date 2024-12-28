import React, { useRef } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { PRODUCTS } from "../../../assets/products";
import { ProductListItem } from "../../components/product-list-item";
import { ListHeader } from "../../components/list-header";
import { groupProductsByCategory } from "../../utils/productUtils";

const Home = () => {
    // Group products by category
    const groupedProducts = groupProductsByCategory(PRODUCTS);
    const flatListRef = useRef<FlatList>(null);

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
        <View style={{ flex: 1 }}>
            <FlatList
                ref={flatListRef}
                data={groupedProducts}
                renderItem={({ item }) => (
                    <View style={styles.categoryContainer}>
                        <Text style={styles.categoryTitle}>{item.title}</Text>
                        <FlatList
                            data={item.data}
                            renderItem={({ item }) => (
                                <ProductListItem product={item} />
                            )}
                            keyExtractor={(product) => product.id.toString()}
                            numColumns={4} // Set number of columns for the products in each category
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
        justifyContent: "space-between",
    },
});

export default Home;
