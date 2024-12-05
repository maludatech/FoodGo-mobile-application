import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Feather";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCartContext } from "@/context/CartContext";
import { PixelRatio } from "react-native";

const Cart = () => {
  const { cart, setDeliveryFee, clearCart } = useCartContext();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const [deliveryFee, handleDeliveryFee] = useState<number>(
    cart.length > 0 ? 1.5 : 0
  );
  const [tax, setTax] = useState<number>(cart.length > 0 ? 0.3 : 0);
  const [deliveryTime, setDeliveryTime] = useState<number>(
    cart.length > 0 ? 15 : 0
  );

  const total = totalPrice + deliveryFee + tax;

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);

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
              onPress={clearCart}
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
          <View style={styles.paymentContainer}>
            <Text style={styles.paymentHeading}>Payment methods</Text>
            <View style={styles.paymentCards}>
              <TouchableOpacity
                style={styles.masterCardButtonContainer}
                onPress={() => setSelectedPaymentMethod("masterCard")}
              >
                <Image
                  source={require("../../assets/images/paymentCards/mastercardLogo.png")}
                  width={50}
                  height={50}
                  alt="master card logo"
                />
                <View style={styles.PaymentCardDetails}>
                  <Text style={styles.cardType}>Credit card</Text>
                  <Text style={styles.cardNumber}>5105 **** **** 0505</Text>
                </View>
                <View
                  style={[
                    styles.radioButton,
                    selectedPaymentMethod === "masterCard" &&
                      styles.radioButtonSelected,
                  ]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.visaCardButtonContainer}
                onPress={() => setSelectedPaymentMethod("visaCard")}
              >
                <Image
                  source={require("../../assets/images/paymentCards/visaLogo.png")}
                  width={50}
                  height={50}
                  alt="visa card logo"
                />
                <View style={styles.PaymentCardDetails}>
                  <Text style={styles.VisaCardType}>Debit card</Text>
                  <Text style={styles.VisaCardNumber}>5105 **** **** 0505</Text>
                </View>
                <View
                  style={[
                    styles.radioButton,
                    selectedPaymentMethod === "visaCard" &&
                      styles.radioButtonSelected,
                  ]}
                />
              </TouchableOpacity>
              <View style={styles.checkedSection}>
                <TouchableOpacity
                  style={[styles.checkbox, isChecked && styles.checkboxChecked]}
                  onPress={() => setIsChecked(!isChecked)}
                >
                  {isChecked && <Icon name="check" size={16} color="#FFF" />}
                </TouchableOpacity>
                <Text style={styles.checkedText}>
                  Save card details for future payments
                </Text>
              </View>
            </View>
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
                onPress={() => router.push("/checkout/PaymentSuccess")}
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
  paymentContainer: {
    flexDirection: "column",
    gap: "6%",
    paddingHorizontal: "4%",
  },
  paymentHeading: {
    fontSize: PixelRatio.getFontScale() * 20,
    fontFamily: "poppins",
    fontWeight: "semibold",
    color: "#3C2F2F",
  },
  paymentCards: {
    flexDirection: "column",
    gap: "6%",
  },
  masterCardButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#3C2F2F",
    borderRadius: 16,
    padding: "4%",
  },
  visaCardButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E2E8F0",
    borderRadius: 16,
    padding: "4%",
  },
  PaymentCardDetails: {
    flexDirection: "column",
    gap: "2%",
  },
  cardType: {
    fontFamily: "roboto",
    fontWeight: "medium",
    fontSize: PixelRatio.getFontScale() * 14,
    color: "#FFFF",
  },
  cardNumber: {
    fontFamily: "roboto",
    fontWeight: "medium",
    fontSize: PixelRatio.getFontScale() * 12,
    color: "#FFFFFF",
  },
  VisaCardType: {
    fontFamily: "roboto",
    fontWeight: "medium",
    fontSize: PixelRatio.getFontScale() * 14,
    color: "#000",
  },
  VisaCardNumber: {
    fontFamily: "roboto",
    fontWeight: "medium",
    fontSize: PixelRatio.getFontScale() * 12,
    color: "#000",
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    marginRight: 10,
  },
  radioButtonSelected: {
    backgroundColor: "#FF7F50",
  },
  checkedSection: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
    paddingLeft: "3%",
    paddingTop: "4%",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#808080",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: "#FF7F50",
    borderColor: "#FFF",
  },
  checkedText: {
    color: "#808080",
    fontSize: PixelRatio.getFontScale() * 14,
    fontFamily: "roboto",
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
