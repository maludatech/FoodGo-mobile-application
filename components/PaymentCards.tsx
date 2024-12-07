import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
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

  const fetchCards = useCallback(async () => {
    if (!userId) return;

    try {
      const response = await fetch(
        `https://food-go-backend.vercel.app/api/user/payment-card/${userId}`
      );

      if (response.ok) {
        const result = await response.json();
        if (Array.isArray(result)) {
          setCards(result);
        } else {
          Alert.alert("Error", "Unexpected response format.");
        }
      } else {
        console.error("Failed response:", await response.text());
        Alert.alert("Error", "Failed to fetch cards.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      Alert.alert("Error", "Network error occurred.");
    }
  }, [userId]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  return (
    <View style={styles.paymentContainer}>
      {cards.length > 0 ? (
        cards.map((card, index) => {
          const isMasterCard = card.cardType.toLowerCase() === "mastercard";
          return (
            <TouchableOpacity
              key={index}
              style={
                isMasterCard
                  ? styles.masterCardButtonContainer
                  : styles.visaCardButtonContainer
              }
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
                <Text
                  style={isMasterCard ? styles.cardType : styles.VisaCardType}
                >
                  {card.cardType}
                </Text>
                <Text
                  style={
                    isMasterCard ? styles.cardNumber : styles.VisaCardNumber
                  }
                >
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

const styles = StyleSheet.create({
  paymentContainer: {
    flexDirection: "column",
    paddingVertical: 16,
  },
  masterCardButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3C2F2F",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  visaCardButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E2E8F0",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  PaymentCardDetails: {
    marginLeft: 16,
    flex: 1,
  },
  cardType: {
    fontSize: 14,
    color: "#FFF",
  },
  cardNumber: {
    fontSize: 12,
    color: "#FFF",
  },
  VisaCardType: {
    fontSize: 14,
    color: "#000",
  },
  VisaCardNumber: {
    fontSize: 12,
    color: "#000",
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  radioButtonSelected: {
    backgroundColor: "#FF7F50",
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    fontSize: 16,
    marginTop: 24,
  },
});

export default PaymentCards;
