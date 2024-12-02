import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  PixelRatio,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link, router } from "expo-router";
import Icon from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useAuthContext } from "@/context/AuthContext";
import Spinner from "@/components/Spinner";
import { TextInput } from "react-native";

interface User {
  userId: string;
  fullName: string;
  email: string;
  imageUrl: string;
  phoneNumber: string;
  deliveryAddress: string;
}

const SignUp = () => {
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      router.push("/(tabs)");
    }
  }, [user]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    deliveryAddress: "",
  });

  const validateForm = () => {
    const {
      email,
      password,
      confirmPassword,
      fullName,
      phoneNumber,
      deliveryAddress,
    } = formData;

    if (!email || !password || !fullName || !phoneNumber || !deliveryAddress) {
      return "All fields are required.";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    return null;
  };

  const handleSignUp = async () => {
    const error = validateForm();
    if (error) {
      setErrorMessage(error);
      setTimeout(() => setErrorMessage(""), 5000);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://foodgo.vercel.app/api/auth/sign-up",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.message || "Failed to sign up");
        setTimeout(() => setErrorMessage(""), 5000);
        return;
      }

      router.push("/(tabs)");
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage("Something went wrong. Please try again.");
      setTimeout(() => setErrorMessage(""), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#EF2A39" />
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
                  size={24}
                  onPress={() => router.back()}
                />
              </View>
            </View>
          </View>
          <View style={styles.secondContainer}>
            <Text style={styles.title}>Sign Up</Text>

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

              <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={formData.fullName}
                onChangeText={(text) =>
                  setFormData({ ...formData, fullName: text })
                }
              />

              <TextInput
                style={styles.input}
                placeholder="Delivery Address"
                value={formData.deliveryAddress}
                onChangeText={(text) =>
                  setFormData({ ...formData, deliveryAddress: text })
                }
              />

              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChangeText={(text) =>
                  setFormData({ ...formData, phoneNumber: text })
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
                  style={styles.eyeIcon}
                >
                  <FontAwesome
                    name={showPassword ? "eye-slash" : "eye"}
                    size={18}
                    color="#d1d5db"
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  secureTextEntry={!showConfirmPassword}
                  value={formData.confirmPassword}
                  onChangeText={(text) =>
                    setFormData({ ...formData, confirmPassword: text })
                  }
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeIcon}
                >
                  <FontAwesome
                    name={showConfirmPassword ? "eye-slash" : "eye"}
                    size={18}
                    color="#d1d5db"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                {isLoading ? (
                  <Spinner color={"#FFE5CF"} />
                ) : (
                  <Text style={styles.buttonText}>Sign Up with Email</Text>
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

            <View style={styles.policyContainer}>
              <Text>By creating an account, you automatically accept our</Text>
              <Text>
                <Link
                  href={"https://bitebazaer.vercel.app/terms-of-service"}
                  style={styles.link}
                >
                  Terms of Service
                </Link>
                ,
                <Link
                  href={"https://bitebazaer.vercel.app/privacy-policy"}
                  style={styles.link}
                >
                  Privacy Policy
                </Link>
                ,&
                <Link
                  href={"https://bitebazaer.vercel.app/cookie-policy"}
                  style={styles.link}
                >
                  Cookie Policy
                </Link>
                .
              </Text>
            </View>

            <View style={styles.loginPrompt}>
              <Text>
                Already have an account:{" "}
                <Link href={"/(auth)/sign-in"} style={styles.link}>
                  Login
                </Link>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SignUp;

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
    zIndex: 10,
    height: "25%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 20,
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
    minHeight: "100%",
    flexDirection: "column",
    position: "relative",
    zIndex: 20,
  },
  title: {
    fontSize: PixelRatio.getFontScale() * 26,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: "#3C2F2F",
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
    borderRadius: 25,
    fontFamily: "roboto",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  eyeIcon: {
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
    backgroundColor: "#16423C",
    padding: 16,
    width: "100%",
    borderRadius: 30,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#FFE5CF",
    textAlign: "center",
    textTransform: "uppercase",
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
  policyContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  linkContainer: {
    flexDirection: "column",
    gap: "4%",
    paddingLeft: 8,
  },
  link: {
    color: "#444444",
    textDecorationLine: "underline",
    fontSize: PixelRatio.getFontScale() * 14,
    fontFamily: "roboto",
  },
  createAccountText: {
    color: "#444444",
    fontSize: PixelRatio.getFontScale() * 14,
    fontFamily: "roboto",
  },
  loginPrompt: {
    marginTop: 20,
    textAlign: "center",
  },
});
