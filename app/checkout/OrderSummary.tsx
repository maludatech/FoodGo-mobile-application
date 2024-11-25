import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Feather";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCartContext } from "@/context/CartContext";
import { PixelRatio } from "react-native";

const OrderSummary = () => {
  const { cart, setDeliveryFee } = useCartContext();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryFee = 1.5;

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={{ paddingBottom: "50%" }}>
        <View style={styles.innerContainer}>
          <View style={styles.headerContainer}>
            <Icon
              name="arrow-left"
              size={24}
              color={"#3C2F2F"}
              onPress={() => router.back()}
            />
            <Icon
              name="search"
              size={24}
              color={"#3C2F2F"}
              onPress={() => router.back()}
            />
          </View>
          <View style={styles.mainContainer}>
            <View style={styles.summary}>
              <Text style={styles.summaryHeading}>Order summary</Text>
              <View style={styles.orderDetailsContainer}>
                <View style={styles.orderDetails}>
                  <Text style={styles.orderDetailsText}>Order</Text>
                  <Text style={styles.orderDetailsText}>
                    ${totalPrice.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.orderDetails}>
                  <Text style={styles.orderDetailsText}>Taxes</Text>
                  <Text style={styles.orderDetailsText}>$0.3</Text>
                </View>
                <View style={styles.orderDetails}>
                  <Text style={styles.orderDetailsText}>Delivery fees</Text>
                  <Text style={styles.orderDetailsText}>{deliveryFee}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderSummary;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flexDirection: "column",
    flex: 1,
    paddingVertical: "4%",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "4%",
  },
  mainContainer: {
    flexDirection: "column",
    gap: "2%",
    paddingHorizontal: "4%",
  },
  summary: {
    flexDirection: "column",
    gap: "7%",
    paddingVertical: "6%",
  },
  summaryHeading: {
    fontSize: PixelRatio.getFontScale() * 20,
    fontFamily: "poppins",
    fontWeight: "semibold",
    color: "#3C2F2F",
  },
  orderDetailsContainer: {
    flexDirection: "column",
    gap: "4%",
  },
  orderDetails: {
    flexDirection: "row",
    gap: "2%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderDetailsText: {
    fontFamily: "roboto",
    fontSize: PixelRatio.getFontScale() * 16,
    color: "#7D7D7D",
  },
});
