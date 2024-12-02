import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Linking from "expo-linking";
import { Redirect, router } from "expo-router";
import Icon from "react-native-vector-icons/Feather";
import { Image } from "react-native";

const SignUp = () => {
  const handleSignUp = async () => {
    try {
    } catch (error) {
      console.error("Sign up failed:", error);
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
            <Text style={styles.pageTitle}>Login</Text>
            <View style={styles.loginContainer}>
              <TouchableOpacity
                style={styles.loginButtonContainer}
                onPress={handleSignUp}
              >
                <Image
                  source={require("../../assets/images/googleIcon.png")}
                  style={{ width: 24, height: 24 }}
                  alt="google icon"
                  resizeMode="contain"
                />
                <Text style={styles.loginButtonTitle}>
                  Continue with Google
                </Text>
              </TouchableOpacity>
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
    padding: 10,
    backgroundColor: "#fff",
    height: "100%",
    flexDirection: "column",
    gap: 32,
    // justifyContent: "center",
  },
  pageTitle: {
    color: "#3C2F2F",
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "rubik",
    textAlign: "center",
  },
  loginContainer: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "#EF2A39",
    borderRadius: 10,
    padding: 30,
  },
  loginButtonContainer: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d1d5db",
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  loginButtonTitle: {
    color: "#3C2F2F",
    fontWeight: "semibold",
    fontSize: 16,
    fontFamily: "roboto",
  },
});
