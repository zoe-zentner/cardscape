import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image } from "react-native";
import { getProducts } from "../api/api"; // Import the API utility

const Cart = () => {
  const [products, setProducts] = useState<any[]>([]); // State to store products
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const fetchProducts = async () => {
      const token = "CuD8bDWCJxSsFtx"; // Replace with the actual token

      try {
        const data = await getProducts(token); // Fetch products from the server
        setProducts(data); // Store the fetched products in the state
      } catch (error) {
        console.error("Error fetching products:", error); // Handle any errors
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchProducts();
  }, []);

  // If still loading, show a loading spinner
  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />;
  }

  // Function to generate the image URL based on the server configuration and owned status
  const getImageUrl = (imageName: string, owned: number) => {
    const baseUrl = "https://cardscape.uk:2033/"; // Base URL for the server
    const folder = owned === 1 ? "visible" : "hidden"; // Select folder based on owned status
    return `${baseUrl}${folder}/${imageName}.png`; // Construct the full URL
  };

  // Render the list of products
  return (
    <View style={styles.container}>
      <FlatList
        data={products || []} // Ensure the data is an array
        keyExtractor={(item, index) => item.id?.toString() || index.toString()} // Use product id as key or index
        renderItem={({ item }) => (
          <View style={styles.item}>
            {/* Debugging log for product attributes */}
            <Text>Debug Info for Product:</Text>
            <Text>Name: {item.name}</Text>
            <Text>Category ID: {item.categoryId}</Text>
            <Text>Owner: {item.owner ? "Owned" : "Not Owned"}</Text>
            <Text>Rarity: {item.rarity}</Text>
            <Text>Image Name: {item.image}</Text>

            {/* Display product image */}
            <Image
              source={{ uri: getImageUrl(item.image, item.owner) }} // Dynamic image URL based on owned status
              style={styles.itemImage}
            />
          </View>
        )}
      />
    </View>
  );
};

// Styles for the Cart screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemImage: {
    width: 60, // Adjust size of the image
    height: 60, // Maintain aspect ratio
    resizeMode: "cover",
    borderRadius: 10, // Rounded corners for the image
    marginTop: 8, // Add space between text and image
  },
});

export default Cart;
