import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/Feather";
import { ProductList } from "@/components/ProductList";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

const Query = () => {
  const query = useLocalSearchParams();

  // Check if query.query is an array or a single string, and handle both cases
  const queryIds = Array.isArray(query.query)
    ? query.query
    : query.query?.split(",") || [];

  // Convert the queryIds array to numbers
  const parsedIds = queryIds
    .map((id) => parseInt(id, 10))
    .filter((id) => !isNaN(id));

  // Filter ProductList based on parsedIds
  const filteredProduct = ProductList.filter((product) =>
    parsedIds.includes(product.id)
  );

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar backgroundColor="#FFF" style="dark" />
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
        <View style={styles.innerContainer}>
          <View style={styles.headerContainer}>
            <Icon
              name="arrow-left"
              size={24}
              color={"#3C2F2F"}
              onPress={() => router.back()}
            />
          </View>
          {filteredProduct.length > 0 ? (
            filteredProduct.map((product) => (
              <View key={product.id} style={styles.productCard}>
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: product.imageUrl }}
                    style={styles.image}
                    resizeMode="contain"
                    alt={`${product.name} image`}
                  />
                </View>
                <Text style={styles.productName}>{product.nameTitle}</Text>
                <View style={styles.ratingContainer}>
                  <FontAwesome5Icon name="star" color={"#FF9633"} size={16} />
                  <Text style={styles.rating}>
                    {product.rating} - {product.min} mins
                  </Text>
                </View>
                <Text style={styles.productDescription}>
                  {product.description}
                </Text>
                <View style={styles.orderSpecificationContainer}>
                  <View style={styles.orderSpecificationControl}></View>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noProductsText}>
              No products found for the query.
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Query;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flexDirection: "column",
    paddingVertical: "4%",
    paddingHorizontal: "2%",
  },
  headerContainer: {
    flexDirection: "row",
  },

  productCard: {
    flexDirection: "column",
    gap: 8,
  },
  imageContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "50%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  productName: {
    fontSize: 25,
    fontFamily: "roboto",
    fontWeight: "semibold",
    color: "#3C2F2F",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rating: {
    color: "#808080",
    fontSize: 15,
    fontWeight: "medium",
    fontFamily: "roboto",
  },
  productDescription: {
    fontSize: 16,
    color: "#6A6A6A",
    fontFamily: "roboto",
    paddingTop: "3%",
  },
  orderSpecificationContainer: {
    flexDirection: "column",
    paddingTop: "4%",
  },
  orderSpecificationControl: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  noProductsText: {
    fontFamily: "roboto",
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 32,
  },
});
