import React, { useState, useRef, useEffect } from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from "react-native";
import { getProducts, getCategories } from "../../../api/api"; // API calls to fetch data

interface Category {
    id: number;
    name: string;
    image: string;
}

interface Product {
    id: number;
    name: string;
    categoryId: number;
    image: string;
    rarity: number;
    owned: boolean;
}

const BuyItemScreen = () => {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [selectedItem, setSelectedItem] = useState<Product | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const flatListRef = useRef<FlatList>(null);

    // Fetch categories and products from the API
    useEffect(() => {
        const fetchData = async () => {
            const token = "CuD8bDWCJxSsFtx"; // Use the appropriate token here
            try {
                const [categoryData, productData] = await Promise.all([
                    getCategories(token),
                    getProducts(token),
                ]);
                setCategories(categoryData); // Set fetched categories
                setProducts(productData); // Set fetched products
                setSelectedCategory(categoryData[0]); // Set the first category as the default
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); // Set loading to false once the data is fetched
            }
        };

        fetchData();
    }, []);

    // Triple the categories array for seamless scrolling
    const extendedCategories = [...categories, ...categories, ...categories];

    useEffect(() => {
        if (flatListRef.current && categories.length > 0) {
            // Start at the middle set of categories after the first render
            flatListRef.current.scrollToIndex({
                index: categories.length,
                animated: false,
            });
        }
    }, [categories]);

    const handleCategorySelect = (category: Category) => {
        setSelectedCategory(category);
        setSelectedItem(null); // Reset the selected item when category is changed
    };

    const handleBuy = () => {
        const itemsInCategory = products.filter(
            (product) => product.categoryId === selectedCategory?.id // Match category ID
        );
        if (itemsInCategory.length > 0) {
            const randomItem =
                itemsInCategory[
                    Math.floor(Math.random() * itemsInCategory.length)
                ];
            setSelectedItem(randomItem); // Select a random item from the category
        }
    };

    const onScrollEnd = (event: any) => {
        const { contentOffset, layoutMeasurement, contentSize } =
            event.nativeEvent;
        const position = contentOffset.x;
        const totalWidth = contentSize.width;
        const itemWidth = 120; // Width of each item (including margin)

        const middleOffset = categories.length * itemWidth;

        if (position <= itemWidth) {
            // If scrolled too far to the left, reset to the middle
            flatListRef.current?.scrollToOffset({
                offset: position + middleOffset,
                animated: false,
            });
        } else if (
            position + layoutMeasurement.width >= totalWidth - itemWidth
        ) {
            // If scrolled too far to the right, reset to the middle
            flatListRef.current?.scrollToOffset({
                offset: position - middleOffset,
                animated: false,
            });
        }
    };

    const getItemLayout = (_: any, index: number) => ({
        length: 120, // Width of each item (including margin)
        offset: 120 * index,
        index,
    });

    if (loading) {
        return <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            {/* Category Scroller */}
            <FlatList
                ref={flatListRef}
                data={extendedCategories}
                horizontal
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.categoryButton,
                            item.id === selectedCategory?.id && styles.selectedCategory,
                        ]}
                        onPress={() => handleCategorySelect(item)}
                    >
                        <Image
                            source={{
                                uri: `https://cardscape.uk:2033/groups/${item.image}.png`, // Full URL for category image
                            }}
                            style={styles.categoryImage}
                        />
                        <Text style={styles.categoryText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => `${item.id}-${index}`} // Unique key by combining id and index
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryList}
                onScrollEndDrag={onScrollEnd}
                onMomentumScrollEnd={onScrollEnd}
                getItemLayout={getItemLayout}
                initialScrollIndex={categories.length} // Start at the middle
            />

            {/* Selected Category Image */}
            <View style={styles.selectedCategoryContainer}>
                {selectedCategory && (
                    <Image
                        source={{
                            uri: `https://cardscape.uk:2033/groups/${selectedCategory.image}.png`, // Full URL for selected category image
                        }}
                        style={styles.selectedCategoryImage}
                    />
                )}
            </View>

            {/* Buy Button */}
            <TouchableOpacity style={styles.buyButton} onPress={handleBuy}>
                <Text style={styles.buyButtonText}>Buy</Text>
            </TouchableOpacity>

            {/* Display Selected Item */}
            {selectedItem && (
                <View style={styles.selectedItemContainer}>
                    {/* Display product image */}
                    <Image
                        source={{
                            uri: `https://cardscape.uk:2033/visible/${selectedItem.image}.png`, // Full URL for product image
                        }}
                        style={styles.selectedItemImage}
                    />
                    <Text style={styles.selectedItemText}>
                        {selectedItem.name} {/* Display product name */}
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
        paddingHorizontal: 10,
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
        borderRadius: 5,
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
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default BuyItemScreen;
