import React, { useState } from "react";
import {
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { CATEGORIES } from "../../../../assets/categories"; // Array of categories
import { PRODUCTS } from "../../../../assets/products"; // Array of products

const BuyItemScreen = () => {
    const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
    const [selectedItem, setSelectedItem] = useState<
        null | (typeof PRODUCTS)[0]
    >(null);

    // Function to handle category selection
    const handleCategorySelect = (category: (typeof CATEGORIES)[0]) => {
        setSelectedCategory(category);
        setSelectedItem(null); // Clear the selected item when switching categories
    };

    // Function to handle "Buy" button click
    const handleBuy = () => {
        const itemsInCategory = PRODUCTS.filter(
            (product) => product.category.slug === selectedCategory.slug
        );
        if (itemsInCategory.length > 0) {
            const randomItem =
                itemsInCategory[
                    Math.floor(Math.random() * itemsInCategory.length)
                ];
            setSelectedItem(randomItem);
        }
    };

    // Viewability config for the FlatList
    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50, // Consider an item viewable if 50% of it is visible
    };

    // Callback to handle the viewable items change
    const onViewableItemsChanged = ({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            // Get the category slug of the center item
            const centerItem = viewableItems[0];
            const category = CATEGORIES.find(
                (cat) => cat.slug === centerItem.item.slug
            );
            if (category) {
                setSelectedCategory(category);
            }
        }
    };

    return (
        <View style={styles.container}>
            {/* Category Scroller */}
            <FlatList
                data={CATEGORIES}
                horizontal
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.categoryButton,
                            item.slug === selectedCategory.slug &&
                                styles.selectedCategory,
                        ]}
                        onPress={() => handleCategorySelect(item)}
                    >
                        <Image
                            source={{ uri: item.imageUrl }}
                            style={styles.categoryImage}
                        />
                        <Text style={styles.categoryText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.slug}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryList}
                viewabilityConfig={viewabilityConfig}
                onViewableItemsChanged={onViewableItemsChanged}
            />

            {/* Selected Category Image */}
            <View style={styles.selectedCategoryContainer}>
                <Image
                    source={{ uri: selectedCategory.imageUrl }}
                    style={styles.selectedCategoryImage}
                />
            </View>

            {/* Buy Button */}
            <TouchableOpacity style={styles.buyButton} onPress={handleBuy}>
                <Text style={styles.buyButtonText}>Buy</Text>
            </TouchableOpacity>

            {/* Display Selected Item */}
            {selectedItem && (
                <View style={styles.selectedItemContainer}>
                    <Image
                        source={selectedItem.heroImage}
                        style={styles.selectedItemImage}
                    />
                    <Text style={styles.selectedItemText}>
                        {selectedItem.title}
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f9f9f9",
    },
    categoryList: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10, // Add some padding if needed
    },
    categoryButton: {
        alignItems: "center",
        marginHorizontal: 20,
        width: 80,
        height: 130,
    },
    selectedCategory: {
        borderColor: "#1BC464",
        borderWidth: 2,
        borderRadius: 10,
    },
    categoryImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    categoryText: {
        marginTop: 5,
        fontSize: 14,
        textAlign: "center",
    },
    selectedCategoryContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    selectedCategoryImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    buyButton: {
        backgroundColor: "#1BC464",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 20,
    },
    buyButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    selectedItemContainer: {
        alignItems: "center",
        marginTop: 20,
    },
    selectedItemImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 10,
    },
    selectedItemText: {
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default BuyItemScreen;
