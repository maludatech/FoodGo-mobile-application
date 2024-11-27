import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router, Redirect } from "expo-router";
import { useUser, useAuth } from "@clerk/clerk-expo";
import { useCartContext } from "@/context/CartContext";

const PaymentDetails = () => {
  const { user } = useUser();
  const { signOut, isSignedIn } = useAuth();
  const { clearCart } = useCartContext();

  if (!isSignedIn) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }

  const email = user?.emailAddresses[0].emailAddress;
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(
        `https://food-go-backend.vercel.app/api/user/profile/${email}`
      );
      if (response.ok) {
        const result = await response.json();
        setDeliveryAddress(result.deliveryAddress);
      }
    } catch (error) {
      console.error("Fetch User details error: ", error);
    }
  };

  const updateUserDetails = async () => {
    if (!deliveryAddress.trim()) {
      // Validate that deliveryAddress is not empty
      Alert.alert(
        "Validation Error",
        "Delivery address cannot be empty. Please provide a valid address."
      );
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `https://food-go-backend.vercel.app/api/user/profile/${email}`,
        {
          method: "PATCH",
          body: JSON.stringify({ deliveryAddress }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert(
          "Error updating profile",
          errorData.message || "Please try again later."
        );
        return;
      }

      Alert.alert("Profile updated successfully!");
    } catch (error) {
      console.error("Fetch User details error: ", error);
      Alert.alert(
        "Network Error",
        "Unable to connect to the server. Please check your internet connection."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (email) fetchUserDetails();
  }, [email]);

  const handleSignOut = async () => {
    try {
      await signOut();
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
          <View style={styles.secondContainer}></View>
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
    borderTopRightRadius: 48,
    borderTopLeftRadius: 48,
    padding: "4%",
    backgroundColor: "#fff",
    minHeight: "100%",
    flexDirection: "column",
    gap: 32,
    position: "relative",
    zIndex: 40,
  },
});
