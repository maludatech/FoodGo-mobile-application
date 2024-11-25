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
  const tax = 0.3;

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
                  <Text style={styles.orderDetailsText}>${tax}</Text>
                </View>
                <View style={styles.orderDetails}>
                  <Text style={styles.orderDetailsText}>Delivery fees</Text>
                  <Text style={styles.orderDetailsText}>{deliveryFee}</Text>
                </View>
                <View style={styles.borderTop}></View>
                <View style={styles.TotalContainer}>
                  <View style={styles.orderDetails}>
                    <Text style={styles.total}>Total</Text>
                    <Text style={styles.total}>
                      {totalPrice.toFixed(2) + deliveryFee + tax}
                    </Text>
                  </View>
                  <View style={styles.orderDetails}>
                    <Text style={styles.deliveryTime}>
                      Estimated delivery time
                    </Text>
                    <Text style={styles.deliveryTime}>15 - 30 mins</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.paymentContainer}>
              <Text style={styles.paymentHeading}>Payment methods</Text>
              <View style={styles.paymentcards}></View>
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
    gap: "6%",
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
    gap: "6%",
    paddingHorizontal: "6%",
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
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: "#d1d5db",
  },
  TotalContainer: {
    paddingTop: "4%",
    flexDirection: "column",
    gap: 16,
  },
  total: {
    color: "#3C2F2F",
    fontWeight: "semibold",
    fontFamily: "roboto",
    fontSize: PixelRatio.getFontScale() * 18,
  },
  deliveryTime: {
    color: "#3C2F2F",
    fontWeight: "semibold",
    fontFamily: "roboto",
    fontSize: PixelRatio.getFontScale() * 14,
  },
  paymentContainer: {
    flexDirection: "column",
    gap: "2%",
    paddingHorizontal: "4%",
  },
  paymentHeading: {
    fontSize: PixelRatio.getFontScale() * 20,
    fontFamily: "poppins",
    fontWeight: "semibold",
    color: "#3C2F2F",
  },
  paymentCards: {},
});
