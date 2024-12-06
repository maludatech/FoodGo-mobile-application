import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import Icon from "react-native-vector-icons/Feather";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCartContext } from "@/context/CartContext";
import { PixelRatio } from "react-native";
import PaymentCards from "@/components/PaymentCards";

const Cart = () => {
  const { cart, setDeliveryFee, clearCart } = useCartContext();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const [deliveryFee, handleDeliveryFee] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [deliveryTime, setDeliveryTime] = useState<number>(0);

  const total = useMemo(
    () => totalPrice + deliveryFee + tax,
    [totalPrice, deliveryFee, tax]
  );

  useEffect(() => {
    const hasItems = cart.length > 0;
    setDeliveryFee(hasItems ? 1.5 : 0);
    handleDeliveryFee(hasItems ? 1.5 : 0);
    setTax(hasItems ? 0.3 : 0);
    setDeliveryTime(hasItems ? 15 : 0);
  }, [cart]);

  const handleRemoval = () => {
    try {
      clearCart();
      setDeliveryFee(0);
      setTax(0);
      setDeliveryTime(0);
    } catch (error) {
      console.error("Error clearing cart:", error);
      Alert.alert("Error", "Failed to clear the cart.");
    }
  };

  const handlePayment = () => {
    try {
      if (total > 0) {
        router.push("/checkout/PaymentSuccess");
      }
    } catch (error) {
      console.error("Error making payment: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar style="dark" />
      <ScrollView>
        <View style={styles.innerContainer}>
          <View style={styles.headerContainer}>
            <Icon
              name="arrow-left"
              size={24}
              color={"#3C2F2F"}
              onPress={() => router.back()}
            />
            <Icon
              name="trash-2"
              size={24}
              color={"#3C2F2F"}
              onPress={handleRemoval}
            />
          </View>
          <View style={styles.summaryContainer}>
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
                <Text style={styles.orderDetailsText}>${deliveryFee}</Text>
              </View>
              <View style={styles.borderTop}></View>
              <View style={styles.TotalContainer}>
                <View style={styles.orderDetails}>
                  <Text style={styles.total}>Total</Text>
                  <Text style={styles.total}>$ {total.toFixed(2)}</Text>
                </View>
                <View style={styles.orderDetails}>
                  <Text style={styles.deliveryTime}>
                    Estimated delivery time
                  </Text>
                  <Text style={styles.deliveryTime}>{deliveryTime} mins</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.paymentCardContainer}>
            <Text style={styles.paymentHeading}>Payment methods</Text>
            <PaymentCards />
          </View>
          <View style={styles.orderContainer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalContainerHeading}>Total Price</Text>
              <Text style={styles.totalContainerText}>
                <Text style={styles.dollarSign}>$</Text>
                {total.toFixed(2)}
              </Text>
            </View>
            <View style={styles.orderButtonContainer}>
              <TouchableOpacity
                style={styles.orderButton}
                onPress={handlePayment}
              >
                <Text style={styles.orderButtonText}>Pay Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flexDirection: "column",
    flex: 1,
    paddingTop: "4%",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "4%",
  },
  summaryContainer: {
    flexDirection: "column",
    paddingTop: "6%",
    paddingHorizontal: "4%",
  },
  summaryHeading: {
    fontSize: PixelRatio.getFontScale() * 20,
    fontFamily: "poppins",
    fontWeight: "semibold",
    color: "#3C2F2F",
  },
  paymentCardContainer: {
    paddingHorizontal: "4%",
  },
  paymentHeading: {
    fontSize: PixelRatio.getFontScale() * 20,
    fontFamily: "poppins",
    fontWeight: "semibold",
    color: "#3C2F2F",
  },
  orderDetailsContainer: {
    flexDirection: "column",
    gap: "6%",
    paddingHorizontal: "6%",
    paddingTop: "2%",
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
  orderContainer: {
    paddingHorizontal: "4%",
    paddingTop: "4%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "4%",
  },
  totalContainer: {
    flexDirection: "column",
    gap: "2%",
    width: "45%",
  },
  totalContainerHeading: {
    color: "#808080",
    fontFamily: "roboto",
    fontWeight: "600",
    fontSize: PixelRatio.getFontScale() * 15,
  },
  dollarSign: {
    color: "#EF2A39",
    fontSize: PixelRatio.getFontScale() * 22,
    fontWeight: "semibold",
    fontFamily: "roboto",
  },
  totalContainerText: {
    color: "#3C2F2F",
    fontSize: PixelRatio.getFontScale() * 30,
    fontWeight: "semibold",
    fontFamily: "roboto",
  },
  orderButtonContainer: {
    width: "50%",
  },
  orderButton: {
    backgroundColor: "#3C2F2F",
    width: "100%",
    padding: 18,
    borderRadius: 14,
  },
  orderButtonText: {
    color: "#FFF",
    fontFamily: "roboto",
    fontWeight: "600",
    textAlign: "center",
    fontSize: PixelRatio.getFontScale() * 16,
  },
});
