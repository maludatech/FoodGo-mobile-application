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
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import * as imagePicker from "expo-image-picker";
import { useAuthContext } from "@/context/AuthContext";
import { useCartContext } from "@/context/CartContext";

const Profile = () => {
  const { user, dispatch } = useAuthContext();
  const { clearCart } = useCartContext();

  useEffect(() => {
    if (!user) {
      router.push("/(auth)/sign-in");
    } else {
      setDeliveryAddress(user.deliveryAddress || "");
      setPhoneNumber(user.phoneNumber || "");
    }
  }, [user]);

  const userId = user?.userId;

  const [image, setImage] = useState();
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const uploadImage = async () => {
    try {
      await imagePicker.requestCameraPermissionsAsync();
      let result = await imagePicker.launchCameraAsync({
        cameraType: imagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        await saveImage(result.assets[0].uri);
      }
    } catch (error) {}
  };

  const saveImage = async (image: any) => {
    try {
      setImage(image);
    } catch (error) {
      throw error;
    }
  };
  const updateUserDetails = async () => {
    if (!deliveryAddress.trim()) {
      Alert.alert("Validation Error", "Please provide a delivery address.");
      return;
    }
    if (phoneNumber.trim().length < 10) {
      Alert.alert("Validation Error", "Enter a valid phone number.");
      return;
    }
    if (password && password.length < 6) {
      Alert.alert(
        "Validation Error",
        "Password must be at least 6 characters."
      );
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `https://food-go-backend.vercel.app/api/user/profile/${userId}`,
        {
          method: "PATCH",
          body: JSON.stringify({ deliveryAddress, phoneNumber, password }),
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
    <KeyboardAvoidingView
      enabled={true}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="#EF2A39" style="light" />
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
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
                <View style={styles.imageContainer}>
                  <Image
                    source={
                      user?.imageUrl
                        ? { uri: user?.imageUrl }
                        : require("../../assets/images/userImage.jpg")
                    }
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 16,
                      borderWidth: 2,
                      borderColor: "#EF2A39",
                      position: "absolute",
                      zIndex: 20,
                    }}
                  />
                </View>
                <View style={styles.formContainer}>
                  <View style={styles.formContents}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                      style={[
                        styles.input,
                        user?.fullName && styles.inputNonEditable,
                      ]}
                      value={user?.fullName}
                      editable={false}
                    />
                  </View>
                  <View style={styles.formContents}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                      style={[
                        styles.input,
                        user?.email && styles.inputNonEditable,
                      ]}
                      value={user?.email}
                      editable={false}
                    />
                  </View>
                  <View style={styles.formContents}>
                    <Text style={styles.label}>Delivery Address</Text>
                    <TextInput
                      style={styles.input}
                      value={deliveryAddress}
                      onChangeText={(text) => setDeliveryAddress(text)}
                    />
                  </View>
                  <View style={styles.formContents}>
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                      style={styles.input}
                      value={phoneNumber}
                      onChangeText={(text) => setPhoneNumber(text)}
                    />
                  </View>
                  <View style={styles.formContents}>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.passwordContainer}>
                      <TextInput
                        style={styles.input}
                        secureTextEntry={!showPassword}
                        onChangeText={(text) => setPassword(text)}
                      />
                      <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.eyeIconContainer}
                      >
                        <FontAwesome
                          name={showPassword ? "eye-slash" : "eye"}
                          size={18}
                          color="#d1d5db"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={styles.moreInfoContainer}>
                  <View style={styles.borderTop}></View>
                  <TouchableOpacity
                    style={styles.moreInfoContent}
                    onPress={() => router.push("/account/PaymentDetails")}
                  >
                    <Text style={styles.moreInfoText}>Payment Details</Text>
                    <Icon name="arrow-right" size={16} color={"#6B7280"} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.moreInfoContent}
                    onPress={() => router.push("/account/OrderHistory")}
                  >
                    <Text style={styles.moreInfoText}>Order History</Text>
                    <Icon name="arrow-right" size={16} color={"#6B7280"} />
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.editButton, isLoading && { opacity: 0.6 }]}
                    onPress={() => updateUserDetails()}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <>
                        <Text style={styles.editButtonText}>Edit Profile</Text>
                        <Icon name="edit" size={18} color={"#fff"} />
                      </>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.logOutButton}
                    onPress={handleSignOut}
                  >
                    <Text style={styles.logOutButtonText}>Log out</Text>
                    <Icon name="log-out" size={18} color={"#EF2A39"} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EF2A39",
  },
  innerContainer: {
    flexDirection: "column",
  },
  firstContainer: {
    backgroundColor: "#EF2A39",
    position: "relative",
    overflow: "hidden",
    height: "20%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 5,
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
    flex: 1,
    flexDirection: "column",
    gap: "2%",
    position: "relative",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#EF2A39",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
    position: "relative",
  },
  formContainer: {
    flexDirection: "column",
    gap: "4%",
    paddingHorizontal: "4%",
    paddingTop: "16%",
  },
  formContents: {
    flexDirection: "column",
    gap: 4,
  },
  label: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 8,
    fontWeight: "medium",
    fontFamily: "roboto",
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 16,
    borderColor: "#d1d5db",
    paddingVertical: 12,
    paddingHorizontal: 16,
    color: "#3C2F2F",
    fontWeight: "700",
    fontFamily: "roboto",
    width: "100%",
    fontSize: 14,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  inputNonEditable: {
    backgroundColor: "#E2E8F0",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  eyeIconContainer: {
    position: "absolute",
    right: 16,
  },
  moreInfoContainer: {
    flexDirection: "column",
    gap: 16,
    paddingBottom: "10%",
    paddingHorizontal: "6%",
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: "#d1d5db",
  },
  moreInfoContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  moreInfoText: {
    fontSize: 16,
    color: "#6B7280",
    fontFamily: "roboto",
    fontWeight: "medium",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 16,
    width: "100%",
    paddingHorizontal: 8,
  },
  editButton: {
    backgroundColor: "#3C2F2F",
    padding: 12,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 4,
    width: "48%",
    shadowColor: "#EF2A39",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 24,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  logOutButton: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#EF2A39",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 4,
    width: "48%",
    shadowColor: "#EF2A39",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 24,
  },
  logOutButtonText: {
    color: "#EF2A39",
    fontSize: 17,
    fontWeight: "600",
  },
});
