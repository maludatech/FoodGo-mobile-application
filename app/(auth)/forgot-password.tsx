import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  PixelRatio,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router, Link } from "expo-router";
import Icon from "react-native-vector-icons/Feather";
import { useAuthContext } from "@/context/AuthContext";
import Spinner from "@/components/Spinner";

const ForgotPassword = () => {
  const { user, dispatch } = useAuthContext();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const [email, setEmail] = useState<string>();

  const handleSubmit = async () => {
    setIsLoading(true);

    if (!email) {
      setErrorMessage("Please fill in your email");
      setTimeout(() => setErrorMessage(""), 3000);
      setIsLoading(false);
      return;
    }

    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      setTimeout(() => setErrorMessage(""), 3000);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://food-go-backend.vercel.app/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        setErrorMessage(result.message || "An error occurred");
        setTimeout(() => setErrorMessage(""), 3000);
      } else {
        setSuccessMessage(result.message || "Password reset email sent!");
        setTimeout(() => setSuccessMessage(""), 3000);
        router.replace("/restore-password");
      }
    } catch (error: any) {
      setErrorMessage("An error occurred");
      setTimeout(() => setErrorMessage(""), 3000);
    } finally {
      setIsLoading(false);
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
                      size={24}
                      onPress={() => router.back()}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.secondContainer}>
                <Text style={styles.title}>Forgotten Password</Text>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                  />
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                  >
                    {isLoading ? (
                      <Spinner color={"#FFF"} />
                    ) : (
                      <Text style={styles.buttonText}>Submit</Text>
                    )}
                  </TouchableOpacity>
                </View>

                <View style={styles.messageContainer}>
                  {errorMessage && (
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                  )}
                  {successMessage && (
                    <Text style={styles.successMessage}>{successMessage}</Text>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default ForgotPassword;

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
    height: "40%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 5,
    paddingHorizontal: 20,
    paddingTop: 10,
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
    gap: "2%",
    backgroundColor: "#fff",
    flex: 1,
    minHeight: "100%",
    flexDirection: "column",
    position: "relative",
  },
  title: {
    fontSize: PixelRatio.getFontScale() * 22,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: "#3C2F2F",
    fontFamily: "roboto",
  },
  inputContainer: {
    flexDirection: "column",
    gap: 16,
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 16,
    fontFamily: "roboto",
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  button: {
    backgroundColor: "#EF2A39",
    padding: 16,
    width: "100%",
    borderRadius: 16,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#FFF",
    textTransform: "uppercase",
    textAlign: "center",
    fontFamily: "roboto",
  },
  messageContainer: {
    flexDirection: "column",
    gap: "4%",
  },
  errorMessage: {
    padding: 8,
    width: "100%",
    backgroundColor: "#FECACA",
    color: "#B91C1C",
    textAlign: "center",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#B91C1C",
    fontFamily: "roboto",
  },
  successMessage: {
    padding: 8,
    width: "100%",
    backgroundColor: "#BFDBFE",
    color: "#1D4ED8",
    textAlign: "center",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#1D4ED8",
    fontFamily: "roboto",
  },
  linkContainer: {
    flexDirection: "column",
    gap: "6",
    paddingLeft: 8,
  },
  link: {
    color: "#3C2F2F",
    textDecorationLine: "underline",
    fontSize: PixelRatio.getFontScale() * 15,
    fontFamily: "roboto",
  },
  createAccountText: {
    color: "#3C2F2F",
    fontSize: PixelRatio.getFontScale() * 15,
    fontFamily: "roboto",
  },
});
