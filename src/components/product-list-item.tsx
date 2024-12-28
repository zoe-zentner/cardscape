import {
    Dimensions,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { Product } from "../../assets/types/product";
import { Link } from "expo-router";

const screenWidth = Dimensions.get("window").width; // Get screen width
const itemWidth = (screenWidth - 40) / 3; // Subtract padding and divide by 3

export const ProductListItem = ({ product }: { product: Product }) => {
    return (
        <Link asChild href={`/product/${product.slug}`}>
            <Pressable style={[styles.item, { width: itemWidth }]}>
                <View style={styles.itemImageContainer}>
                    <Image
                        source={product.heroImage}
                        style={styles.itemImage}
                    />
                </View>
                <View style={styles.itemTextContainer}>
                    <Text style={styles.itemTitle}>{product.title}</Text>
                    <Text style={styles.itemPrice}>
                        ${product.price.toFixed(2)}
                    </Text>
                </View>
            </Pressable>
        </Link>
    );
};

const styles = StyleSheet.create({
    item: {
        width: "48%",
        backgroundColor: "white",
        marginVertical: 8,
        borderRadius: 10,
        overflow: "hidden",
    },
    itemImageContainer: {
        borderRadius: 10,
        width: "100%",
        height: 150,
        overflow: "hidden",
    },
    itemImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        borderRadius: 15,
    },
    itemTextContainer: {
        padding: 8,
        alignItems: "flex-start",
        gap: 4,
    },
    itemTitle: {
        fontSize: 16,
        color: "black",
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: "bold",
    },
});
