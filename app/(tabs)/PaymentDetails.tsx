import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { useAuthContext } from "@/context/AuthContext";
import { useCartContext } from "@/context/CartContext";

const PaymentDetails = () => {
  const { user, dispatch } = useAuthContext();
  const email = user?.email;
  const { clearCart } = useCartContext();

  const [cards, setCards] = useState([]);
  const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardType] = useState("Visa");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (email) fetchCards();
  }, [email]);

  const fetchCards = async () => {
    try {
      const response = await fetch(
        `https://your-api.com/api/user/cards/${email}`
      );
      if (response.ok) {
        const result = await response.json();
        setCards(result.cards);
      }
    } catch (error) {
      console.error("Fetch cards error: ", error);
    }
  };

  const addCard = async () => {
    if (!cardNumber.trim()) {
      Alert.alert("Validation Error", "Card number cannot be empty.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `https://your-api.com/api/user/cards/${email}`,
        {
          method: "POST",
          body: JSON.stringify({ cardNumber, cardType }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        Alert.alert("Card added successfully!");
        fetchCards();
        setCardNumber("");
      } else {
        Alert.alert("Error adding card", "Please try again later.");
      }
    } catch (error) {
      console.error("Add card error: ", error);
      Alert.alert("Network Error", "Please check your internet connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCard = async (cardId: any) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://your-api.com/api/user/cards/${email}/${cardId}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        Alert.alert("Card deleted successfully!");
        fetchCards();
      } else {
        Alert.alert("Error deleting card", "Please try again later.");
      }
    } catch (error) {
      console.error("Delete card error: ", error);
      Alert.alert("Network Error", "Please check your internet connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch({ type: "LOGOUT" });
      clearCart();
    } catch (error) {
      Alert.alert(
        "Sign Out Error",
        "There was an error signing out. Please try again."
      );
      console.error("Sign Out Error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#EF2A39" style="light" />
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
                <Icon
                  name="log-out"
                  color={"#fff"}
                  size={20}
                  onPress={handleSignOut}
                />
              </View>
            </View>
          </View>
          <View style={styles.secondContainer}>
            <Text style={styles.title}>Payment Methods</Text>
            <FlatList
              data={cards}
              keyExtractor={(item: any) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.cardItem}>
                  <Text style={styles.cardText}>
                    {item.cardType} - {item.cardNumber.slice(-4)}
                  </Text>
                  <TouchableOpacity
                    onPress={() => deleteCard(item.id)}
                    style={styles.deleteButton}
                  >
                    <Icon name="trash" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              )}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No cards added yet.</Text>
              }
            />

            <Text style={styles.inputLabel}>Card Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter card number"
              keyboardType="numeric"
              value={cardNumber}
              onChangeText={setCardNumber}
            />
            <View style={styles.cardTypeContainer}>
              <TouchableOpacity
                style={[
                  styles.cardTypeButton,
                  cardType === "Visa" && styles.selectedCardType,
                ]}
                onPress={() => setCardType("Visa")}
              >
                <Text style={styles.cardTypeText}>Visa</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.cardTypeButton,
                  cardType === "MasterCard" && styles.selectedCardType,
                ]}
                onPress={() => setCardType("MasterCard")}
              >
                <Text style={styles.cardTypeText}>MasterCard</Text>
              </TouchableOpacity>
            </View>

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
  deleteButton: {
    backgroundColor: "#EF2A39",
    padding: 8,
    borderRadius: 5,
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
    backgroundColor: "#ddd",
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  selectedCardType: {
    backgroundColor: "#EF2A39",
  },
  cardTypeText: {
    color: "#fff",
  },
  addButton: {
    backgroundColor: "#EF2A39",
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
    marginVertical: 20,
  },
});
