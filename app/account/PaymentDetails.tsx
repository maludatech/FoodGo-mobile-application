import React, { useEffect, useState, useCallback } from "react";
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
import { useCartContext } from "@/context/CartContext";

const PaymentDetails = () => {
  const { user } = useAuthContext();
  const { clearCart } = useCartContext();

  const userId = user?.userId;

  const [cards, setCards] = useState([]);
  const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardType] = useState("Visa");
  const [cardDate, setCardDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch Cards with useCallback
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

    return true;
  };

  // Add Card with useCallback
  const addCard = useCallback(async () => {
    if (!validateCardDetails()) return;

    try {
      setIsLoading(true);
      const response = await fetch(
        `https://your-api.com/api/user/payment-card/${userId}`,
        {
          method: "POST",
          body: JSON.stringify({ cardNumber, cardType, cardDate, cvv }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        Alert.alert("Card added successfully!");
        fetchCards();
        setCardNumber("");
        setCardDate("");
        setCvv("");
      } else {
        Alert.alert("Error adding card", "Please try again later.");
      }
    } catch (error) {
      console.error("Add card error: ", error);
      Alert.alert("Network Error", "Please check your internet connection.");
    } finally {
      setIsLoading(false);
    }
  }, [cardNumber, cardType, cardDate, cvv, fetchCards, userId]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.innerContainer}>
          <View style={styles.firstContainer}>
            {/* Left and Right background images */}
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
            <Text style={styles.title}>Payment Methods</Text>

            {/* Input Fields */}
            <Text style={styles.inputLabel}>Card Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter card number"
              keyboardType="numeric"
              value={cardNumber}
              onChangeText={setCardNumber}
              maxLength={16}
              accessible
              accessibilityLabel="Enter card number"
            />

            <Text style={styles.inputLabel}>Card Date (MM/YY)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter card date"
              keyboardType="numeric"
              value={cardDate}
              onChangeText={setCardDate}
              maxLength={5}
              accessible
              accessibilityLabel="Enter card date in MM/YY format"
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
              accessible
              accessibilityLabel="Enter 3-digit CVV"
            />

            <TouchableOpacity
              style={styles.addButton}
              onPress={addCard}
              accessible
              accessibilityLabel="Add payment card"
            >
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
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
  emptyText: {
    textAlign: "center",
    color: "#888",
    fontSize: PixelRatio.getFontScale() * 14,
    marginVertical: 20,
  },
});
