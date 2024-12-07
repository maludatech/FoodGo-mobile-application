import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  PixelRatio,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Icon from "react-native-vector-icons/Feather";
import { useAuthContext } from "@/context/AuthContext";
import { Image } from "react-native";

interface Card {
  cardNumber: string;
  cardType: string;
  cardId: string;
}

const PaymentDetails = () => {
  const { user } = useAuthContext();

  const userId = user?.userId;

  const [cards, setCards] = useState<Card[]>([]);
  const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardType] = useState("Visa");
  const [cardDate, setCardDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
  }, [userId]);

  // Detect Card Type
  const detectCardType = (number: any) => {
    const visaRegex = /^4/;
    const masterCardRegex = /^5[1-5]/;
    if (visaRegex.test(number)) return "Visa";
    if (masterCardRegex.test(number)) return "MasterCard";
    return "Unknown";
  };

  // Validate Card Details
  const validateCardDetails = () => {
    const cardNumberRegex = /^[0-9]{16}$/; // 16-digit card number
    const cardDateRegex = /^(0[1-9]|1[0-2])\/[0-9]{2}$/; // MM/YY format
    const cvvRegex = /^[0-9]{3}$/; // 3-digit CVV

    if (!cardNumberRegex.test(cardNumber)) {
      Alert.alert(
        "Validation Error",
        "Invalid card number. Must be 16 digits."
      );
      return false;
    }

    const detectedType = detectCardType(cardNumber);
    if (detectedType === "Unknown") {
      Alert.alert("Validation Error", "We only accept Visa or MasterCard.");
      return false;
    }

    if (!cardDateRegex.test(cardDate)) {
      Alert.alert(
        "Validation Error",
        "Invalid card date. Use MM/YY format (e.g., 12/25)."
      );
      return false;
    }

    if (!cvvRegex.test(cvv)) {
      Alert.alert("Validation Error", "Invalid CVV. Must be 3 digits.");
      return false;
    }

    setCardType(detectedType);
    return true;
  };

  // Add Card
  const addCard = useCallback(async () => {
    if (!validateCardDetails()) return;

    try {
      setIsLoading(true);
      const response = await fetch(
        `https://food-go-backend.vercel.app/api/user/payment-card/${userId}`,
        {
          method: "POST",
          body: JSON.stringify({
            cardNumber,
            cardExpiryDate: cardDate,
            cardCVV: cvv,
            cardType,
            cardDate,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        Alert.alert("Card added successfully!");
        setCardNumber("");
        setCardDate("");
        setCvv("");
        fetchCards();
      } else {
        const { message } = await response.json();
        Alert.alert(message || "Error adding card", "Please try again later.");
      }
    } catch (error) {
      console.error("Add card error: ", error);
      Alert.alert("Network Error", "Please check your internet connection.");
    } finally {
      setIsLoading(false);
    }
  }, [cardNumber, cardType, cardDate, cvv, userId]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.innerContainer}>
          <View style={styles.firstContainer}>
            {/* Background images */}
            <ImageBackground
              source={require("../../assets/images/left-side.png")}
              style={[styles.backgroundImage, styles.leftImage]}
              resizeMode="contain"
            />
            <ImageBackground
              source={require("../../assets/images/right-side.png")}
              style={[styles.backgroundImage, styles.rightImage]}
              resizeMode="contain"
            />
            <View style={styles.overlay}>
              <View style={styles.header}>
                <Icon
                  name="arrow-left"
                  color={"#fff"}
                  size={20}
                  onPress={() => router.back()}
                />
              </View>
            </View>
          </View>

          <View style={styles.secondContainer}>
            <View style={styles.paymentCardContainer}>
              <Text style={styles.title}>Payment Methods</Text>
              <View style={styles.paymentContainer}>
                {/* Display Cards */}
                {cards.length > 0 ? (
                  cards.map((card, index) => {
                    const isMasterCard =
                      card.cardType.toLowerCase() === "mastercard";
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
                      <View key={index} style={containerStyle}>
                        <Image
                          source={
                            isMasterCard
                              ? require("../../assets/images/paymentCards/mastercardLogo.png")
                              : require("../../assets/images/paymentCards/visaLogo.png")
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
                        <Icon
                          name="trash-2"
                          size={24}
                          color={"#3C2F2F"}
                          onPress={() => console.log(card.cardId)}
                        />
                      </View>
                    );
                  })
                ) : (
                  <Text style={styles.emptyText}>No saved cards</Text>
                )}
              </View>
            </View>
            {/* Input Fields */}
            <Text style={styles.inputLabel}>Card Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter card number"
              keyboardType="numeric"
              value={cardNumber}
              onChangeText={(value) => {
                setCardNumber(value);
                setCardType(detectCardType(value));
              }}
              maxLength={16}
            />

            <Text style={styles.inputLabel}>Card Date (MM/YY)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter card date"
              keyboardType="default"
              value={cardDate}
              onChangeText={setCardDate}
              maxLength={5}
            />

            <Text style={styles.inputLabel}>CVV</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter CVV"
              keyboardType="numeric"
              value={cvv}
              onChangeText={setCvv}
              maxLength={3}
              secureTextEntry
            />

            <TouchableOpacity style={styles.addButton} onPress={addCard}>
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.addButtonText}>Add Card</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentDetails;

// Updated styles remain the same

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EF2A39",
  },
  innerContainer: {
    flex: 1,
    flexDirection: "column",
  },
  firstContainer: {
    backgroundColor: "#EF2A39",
    position: "relative",
    overflow: "hidden",
    zIndex: 10,
    height: "20%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 20,
    paddingHorizontal: "4%",
    paddingTop: "2%",
  },
  backgroundImage: {
    position: "absolute",
    width: 200,
    height: 200,
  },
  leftImage: {
    top: 15,
    left: "-13%",
  },
  rightImage: {
    top: 15,
    right: "-13%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(239, 42, 57, 0.6)",
    zIndex: 5,
  },
  secondContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    flex: 1,
  },
  paymentCardContainer: {
    paddingBottom: "1%",
  },
  title: {
    fontSize: PixelRatio.getFontScale() * 20,
    fontWeight: "bold",
    color: "#3C2F2F",
    marginBottom: "2%",
  },
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
    textAlign: "center",
    color: "#888",
    fontSize: PixelRatio.getFontScale() * 16,
    marginVertical: 24,
    fontWeight: "semibold",
  },
  cardItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#f5f5f5",
    marginBottom: 10,
    borderRadius: 8,
  },
  cardText: {
    fontSize: 16,
  },
  inputLabel: {
    fontSize: 16,
    marginTop: 20,
  },
  input: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
  },
  cardTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  cardTypeButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: " #E2E8F0",
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  selectedCardType: {
    backgroundColor: "#3C2F2F",
  },
  cardTypeText: {
    color: "#fff",
  },
  addButton: {
    backgroundColor: "#3C2F2F",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
