import React, { useState, useRef, useEffect, useContext } from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
    Animated,
} from "react-native";
import { getProducts, getCategories, purchaseProduct } from "../../../api/api";
import { UserContext } from "../../../context/UserContext";
import { useProductStore } from "../../../store/store";

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
    const { updateProductOwnership } = useProductStore();
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [selectedItem, setSelectedItem] = useState<Product | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [insufficientCoins, setInsufficientCoins] = useState<boolean>(false);
    const opacity = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef<FlatList>(null);
    const { userData, setUserData } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const token = "CuD8bDWCJxSsFtx";
                const [categoryData, productData] = await Promise.all([
                    getCategories(token),
                    getProducts(token),
                ]);
                setCategories(categoryData);
                setProducts(productData);
                if (categoryData.length > 0) setSelectedCategory(categoryData[0]);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Extend the categories array for seamless scrolling
    const extendedCategories = [...categories, ...categories, ...categories];

    // Scroll to middle initially
    useEffect(() => {
        if (flatListRef.current && categories.length > 0) {
            flatListRef.current.scrollToIndex({
                index: categories.length,
                animated: false,
            });
        }
    }, [categories]);

    const handleCategorySelect = (category: Category) => {
        setSelectedCategory(category);
        setSelectedItem(null);
    };

    const handlePurchase = async (categoryId: number) => {
        const token = "CuD8bDWCJxSsFtx";
        
        if (userData.coins <= 0) {
            setInsufficientCoins(true);
            Animated.timing(opacity, {
                toValue: 1,
                duration: 0,
                useNativeDriver: true,
            }).start();

            setTimeout(() => {
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 3000,
                    useNativeDriver: true,
                }).start();
            }, 1000);
            return;
        }

        try {
            const response = await purchaseProduct(token, categoryId);
    
            if (response === "ok") {
                setUserData((prevUserData: any) => ({
                    ...prevUserData,
                    coins: prevUserData.coins - 1,
                }));
    
                const itemsInCategory = products.filter(
                    (product) => product.categoryId === categoryId
                );
                const randomItem = itemsInCategory[Math.floor(Math.random() * itemsInCategory.length)];
    
                updateProductOwnership(randomItem.id);
    
                setSelectedItem(randomItem);
                setModalVisible(true);
            }
        } catch (error) {
            console.error("Error purchasing item:", error);
        }
    };

    const onScrollEnd = (event: any) => {
        const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
        const position = contentOffset.x;
        const totalWidth = contentSize.width;
        const itemWidth = 120;

        const middleOffset = categories.length * itemWidth;

        if (position <= itemWidth) {
            flatListRef.current?.scrollToOffset({
                offset: position + middleOffset,
                animated: false,
            });
        } else if (position + layoutMeasurement.width >= totalWidth - itemWidth) {
            flatListRef.current?.scrollToOffset({
                offset: position - middleOffset,
                animated: false,
            });
        }
    };

    const getItemLayout = (_: any, index: number) => ({
        length: 120,
        offset: 120 * index,
        index,
    });

    if (loading) {
        return <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
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
                                uri: `https://cardscape.uk:2033/groups/${item.image}.png`,
                            }}
                            style={styles.categoryImage}
                        />
                        <Text style={styles.categoryText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryList}
                onScrollEndDrag={onScrollEnd}
                onMomentumScrollEnd={onScrollEnd}
                getItemLayout={getItemLayout}
                initialScrollIndex={categories.length}
            />

            <TouchableOpacity
                style={styles.buyButton}
                onPress={() => handlePurchase(selectedCategory?.id ?? 0)}
            >
                <Text style={styles.buyButtonText}>Buy</Text>
            </TouchableOpacity>

            {insufficientCoins && (
                <Animated.View style={[styles.insufficientCoinsContainer, { opacity }]}>
                    <Text style={styles.insufficientCoinsText}>Insufficient Coins</Text>
                </Animated.View>
            )}

            {selectedItem && isModalVisible && (
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
                        <Image
                            source={{
                                uri: `https://cardscape.uk:2033/visible/${selectedItem.image}.png`,
                            }}
                            style={styles.modalImage}
                        />
                        <Text style={styles.modalItemName}>{selectedItem.name}</Text>
                        <Text style={styles.modalItemRarity}>Rarity: {selectedItem.rarity}</Text>
                    </View>
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
    modalContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 40,
        borderRadius: 10,
        alignItems: "center",
        width: "80%",
    },
    closeButton: {
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "#FF0000",
        padding: 10,
        borderRadius: 15,
    },
    closeButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    modalImage: {
        width: "100%",
        height: 300,
        resizeMode: "contain",
    },
    modalItemName: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
    },
    modalItemRarity: {
        fontSize: 16,
        color: "#888",
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    insufficientCoinsContainer: {
        position: "absolute",
        top: "50%",         // Positioning vertically at the center of the screen
        left: "50%",        // Positioning horizontally at the center of the screen
        transform: [
            { translateX: -67 }, // Offset for centering based on banner's width (adjust as needed)
            { translateY: -30 },  // Offset for centering based on banner's height (adjust as needed)
        ],
        backgroundColor: "rgba(255, 0, 0, 0.8)",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        zIndex: 100,           // Ensure it's on top of other components
        alignItems: "center",  // Center text horizontally within the banner
    },
    insufficientCoinsText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default BuyItemScreen;
