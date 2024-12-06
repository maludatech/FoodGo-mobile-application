import {
  Alert,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Feather";
import { useAuthContext } from "@/context/AuthContext";

interface Card {
  cardNumber: string;
  cardType: string;
}

const PaymentCards = () => {
  const { user } = useAuthContext();

  const userId = user?.userId;

  const [cards, setCards] = useState<Card[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");

  // Fetch Cards
  const fetchCards = useCallback(async () => {
    try {
      const response = await fetch(
        `https://food-go-backend.vercel.app/api/user/payment-card/${userId}`
      );
      if (response.ok) {
        const result = await response.json();
        if (result && Array.isArray(result)) {
          setCards(result);
        } else {
          Alert.alert("Unexpected Response", "Failed to fetch cards.");
        }
      } else {
        Alert.alert("Fetch Error", "Unable to fetch payment cards.");
      }
    } catch (error) {
      console.error("Error fetching cards: ", error);
      Alert.alert("Network Error", "Please try again later.");
    }
  }, [userId]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  return (
    <View style={styles.paymentContainer}>
      {/* Display Cards */}
      {cards.length > 0 ? (
        cards.map((card, index) => {
          const isMasterCard = card.cardType.toLowerCase() === "mastercard";
          const containerStyle = isMasterCard
            ? styles.masterCardButtonContainer
            : styles.visaCardButtonContainer;
          const cardTypeStyle = isMasterCard
            ? styles.cardType
            : styles.VisaCardType;
          const cardNumberStyle = isMasterCard
            ? styles.cardNumber
            : styles.VisaCardNumber;

          return (
            <TouchableOpacity
              key={index}
              style={containerStyle}
              onPress={() => setSelectedPaymentMethod(card.cardType)}
            >
              <Image
                source={
                  isMasterCard
                    ? require("../assets/images/paymentCards/mastercardLogo.png")
                    : require("../assets/images/paymentCards/visaLogo.png")
                }
                width={50}
                height={50}
                alt={`${card.cardType} logo`}
              />
              <View style={styles.PaymentCardDetails}>
                <Text style={cardTypeStyle}>{card.cardType}</Text>
                <Text style={cardNumberStyle}>
                  •••• {card.cardNumber.slice(-4)}
                </Text>
              </View>
              <View
                style={[
                  styles.radioButton,
                  selectedPaymentMethod === card.cardType &&
                    styles.radioButtonSelected,
                ]}
              />
            </TouchableOpacity>
          );
        })
      ) : (
        <Text style={styles.emptyText}>No saved cards</Text>
      )}
    </View>
  );
};

export default PaymentCards;

const styles = StyleSheet.create({
  paymentContainer: {
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
  emptyText: {
    color: "#808080",
    textAlign: "center",
    fontSize: PixelRatio.getFontScale() * 14,
    fontFamily: "roboto",
  },
});
