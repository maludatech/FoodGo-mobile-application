import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  PixelRatio,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import Icon from "react-native-vector-icons/Feather";
import { useAuthContext } from "@/context/AuthContext";
import Spinner from "@/components/Spinner";

const ResetPassword = () => {
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      router.push("/(tabs)");
    }
  }, [user]);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [code, setCode] = useState(Array(6).fill(""));
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  // Enable button only if all input fields are filled
  useEffect(() => {
    setIsButtonEnabled(code.every((digit) => digit !== ""));
  }, [code]);

  // Handle input changes, including backspace navigation
  const handleInputChange = (e: any, index: any) => {
    const value = e.target.value;
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      // Move focus to the next input
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    } else if (!value && index > 0) {
      // Move focus to the previous input on backspace
      const prevInput = document.getElementById(`code-input-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  // Handle pasting a 6-digit code
  const handlePaste = (e: any) => {
    const paste = e.clipboardData.getData("text").slice(0, 6).split("");
    setCode(paste);

    // Set focus to the first empty input or the last one
    const firstEmptyIndex = paste.findIndex((char: any) => char === "");
    const nextInput = document.getElementById(
      `code-input-${firstEmptyIndex >= 0 ? firstEmptyIndex : 5}`
    );
    if (nextInput) {
      nextInput.focus();
    }
  };

  // Handle submission of the 6-digit code
  const handleContinue = async () => {
    setIsLoading(true);
    if (!isButtonEnabled) return;

    const restoreCode = code.join("");
    try {
      const response = await fetch(
        "https://food-go-backend.vercel.app/api/auth/restore-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: restoreCode }),
        }
      );

      if (response.ok) {
        const { userId } = await response.json();
        router.replace(`/(auth)/reset-password?userId=${userId}`);
      } else {
        const data = await response.json();
        setErrorMessage(data.message);
        setTimeout(() => setErrorMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      setErrorMessage("Internal server error");
      setTimeout(() => setErrorMessage(""), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
            <Text style={styles.title}>Reset Password</Text>

            <Text style={styles.subTitle}>
              Enter the six-digit code sent to your email
            </Text>

            <View style={styles.inputContainer}></View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleContinue}>
                {isLoading ? (
                  <Spinner color={"#FFF"} />
                ) : (
                  <Text style={styles.buttonText}>Continue</Text>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.messageContainer}>
              {errorMessage && (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default ResetPassword;

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
    fontSize: PixelRatio.getFontScale() * 26,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: "#3C2F2F",
    fontFamily: "roboto",
  },
  subTitle: {
    color: "#3C2F2F",
    fontFamily: "roboto",
    fontWeight: "semibold",
    fontSize: PixelRatio.getFontScale() * 14,
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
});
