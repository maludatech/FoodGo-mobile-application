import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/Feather";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import { ProductList } from "@/components/ProductList";

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

  const [quantity, setQuantity] = useState<number>(0);
  const [spicyLevel, setSpicyLevel] = useState(0);

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
                  <View style={styles.orderSpecificationControl}>
                    <View style={styles.spicyContainer}>
                      <Text style={styles.specificationText}>Spicy</Text>
                      <View style={styles.sliderContainer}>
                        <Text style={styles.mildLabel}>Mild</Text>
                        <Slider
                          style={styles.slider}
                          minimumValue={0}
                          maximumValue={100}
                          value={spicyLevel}
                          onValueChange={(value) => setSpicyLevel(value)}
                          minimumTrackTintColor="#EF2A39"
                          maximumTrackTintColor="#EDEDED"
                          thumbTintColor="#EF2A39"
                        />
                        <Text style={styles.hotLabel}>Hot</Text>
                      </View>
                    </View>
                    <View style={styles.quantityControlContainer}>
                      <Text style={styles.specificationText}>Portion</Text>
                      <View style={styles.quantityControlContent}>
                        <TouchableOpacity
                          style={styles.quantityControlButtons}
                          onPress={() =>
                            setQuantity((prevQuantity) =>
                              Math.max(0, prevQuantity - 1)
                            )
                          }
                        >
                          <Text style={styles.quantityControlButtonsText}>
                            -
                          </Text>
                        </TouchableOpacity>
                        <Text style={styles.quantity}>{quantity}</Text>
                        <TouchableOpacity
                          style={styles.quantityControlButtons}
                          onPress={() =>
                            setQuantity((prevQuantity) => prevQuantity + 1)
                          }
                        >
                          <Text style={styles.quantityControlButtonsText}>
                            +
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
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
    padding: "2%",
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
    gap: 12,
    paddingTop: "4%",
  },
  orderSpecificationControl: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  spicyContainer: {
    flexDirection: "column",
    gap: 8,
  },
  specificationText: {
    color: "#3C2F2F",
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "roboto",
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "70%",
  },
  slider: {
    flex: 1,
    marginHorizontal: "2%",
  },
  mildLabel: {
    color: "#1CC019",
    fontSize: 14,
    fontWeight: "bold",
  },
  hotLabel: {
    color: "#EF2A39",
    fontSize: 14,
    fontWeight: "bold",
  },
  quantityControlContainer: {
    flexDirection: "column",
    gap: 8,
  },
  quantityControlContent: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  quantityControlButtons: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: "#EF2A39",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    shadowColor: "#EF2A39",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 16,
  },
  quantityControlButtonsText: {
    color: "#fff",
    fontFamily: "roboto",
    fontWeight: "bold",
    fontSize: 24,
  },
  quantity: {
    fontFamily: "inter",
    color: "#3C2F2F",
    fontWeight: "bold",
    fontSize: 18,
  },
  noProductsText: {
    fontFamily: "roboto",
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 32,
  },
});
