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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useAuthContext } from "@/context/AuthContext";
import Spinner from "@/components/Spinner";

interface User {
  userId: string;
  fullName: string;
  email: string;
  imageUrl: string;
  phoneNumber: string;
  deliveryAddress: string;
}
interface CustomJwtPayload extends JwtPayload {
  userId: string;
  fullName: string;
  email: string;
  imageUrl: string;
  phoneNumber: string;
  deliveryAddress: string;
}
const SignIn = () => {
  const { user, dispatch } = useAuthContext();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const decodeJwtToken = (token: string): CustomJwtPayload | null => {
    try {
      const decoded: CustomJwtPayload = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.error("Error decoding token: ", error);
      return null;
    }
  };

  const handleSignIn = async () => {
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      setErrorMessage("Please fill in both email and password.");
      setTimeout(() => setErrorMessage(""), 3000);
      setIsLoading(false);
      return;
    }

    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      setTimeout(() => setErrorMessage(""), 3000);
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      setTimeout(() => setErrorMessage(""), 3000);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://food-go-backend.vercel.app/api/auth/sign-in",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        setErrorMessage(result.message || "Failed to sign in");
        setTimeout(() => setErrorMessage(""), 5000);
        return;
      }

      const { token } = result;
      const decodedToken: CustomJwtPayload | null = decodeJwtToken(token);
      const user: User = {
        userId: decodedToken?.userId || "",
        fullName: decodedToken?.fullName || "",
        email: decodedToken?.email || "",
        imageUrl: decodedToken?.imageUrl || "",
        phoneNumber: decodedToken?.phoneNumber || "",
        deliveryAddress: decodedToken?.deliveryAddress || "",
      };

      dispatch({ type: "LOGIN", payload: user });
      router.push("/(tabs)");
    } catch (error: any) {
      setErrorMessage("Something went wrong. Please try again.");
      console.error("Error during sign-in:", error);
      setTimeout(() => setErrorMessage(""), 5000);
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
                <Text style={styles.title}>Login</Text>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={formData.email}
                    onChangeText={(text) =>
                      setFormData({ ...formData, email: text })
                    }
                  />

                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Password"
                      secureTextEntry={!showPassword}
                      value={formData.password}
                      onChangeText={(text) =>
                        setFormData({ ...formData, password: text })
                      }
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

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleSignIn}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Spinner color={"#FFF"} />
                    ) : (
                      <Text style={styles.loginButtonText}>
                        Login with Email
                      </Text>
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

                <View style={styles.linkContainer}>
                  <Link href={"/forgot-password"} style={styles.link}>
                    Forgotten Password
                  </Link>
                  <Text style={styles.createAccountText}>
                    Don't have an account:{" "}
                    <Link href={"/sign-up"} style={styles.link}>
                      Create Account
                    </Link>
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default SignIn;

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
  loginButton: {
    backgroundColor: "#EF2A39",
    padding: 16,
    width: "100%",
    borderRadius: 16,
  },
  loginButtonText: {
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
