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
const itemWidth = (screenWidth - 40) / 4; // Subtract padding and divide by 3

export const ProductListItem = ({ product }: { product: Product }) => {
    return (
        <Link asChild href={`/product/${product.slug}`}>
            <Pressable style={[styles.item, { width: itemWidth }]}>
                <View style={[styles.itemImageContainer, { width: itemWidth }]}>
                    <Image
                        source={product.heroImage}
                        style={styles.itemImage}
                    />
                </View>
                <View style={styles.itemTextContainer}>
                    <Text style={[styles.itemTitle, { width: itemWidth - 16 }]}>
                        {product.title}
                    </Text>
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
        backgroundColor: "white",
        marginVertical: 8,
        borderRadius: 10,
        overflow: "hidden",
    },
    itemImageContainer: {
        height: 130, // Fixed height for consistent layout
        overflow: "hidden",
        borderRadius: 10,
    },
    itemImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        borderRadius: 10, // Ensures rounded corners for the image
    },
    itemTextContainer: {
        padding: 8,
        alignItems: "flex-start",
        gap: 4,
    },
    itemTitle: {
        fontSize: 13,
        color: "black",
        lineHeight: 20,
        flexWrap: "wrap", // Allows text to wrap
    },
    itemPrice: {
        fontSize: 11,
        fontWeight: "bold",
    },
});
