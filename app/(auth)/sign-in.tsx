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
import Icon from "react-native-vector-icons/FontAwesome5";
import { useOAuth, useAuth } from "@clerk/clerk-expo";

const SignIn = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/(tabs)"} />;
  }

  const GoogleIcon = () => <Icon name="google" size={24} color="#fff" />;

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL("/(tabs)/", { scheme: "myapp" }),
      });
      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
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
                  size={20}
                  solid
                  onPress={() => router.back()}
                />
                <Icon name="cog" color={"#fff"} size={20} solid />
              </View>
            </View>
          </View>
          <View style={styles.secondContainer}>
            <Text style={styles.pageTitle}>Login</Text>
            <View style={styles.loginContainer}>
              <TouchableOpacity
                style={styles.loginButtonContainer}
                onPress={handleSignIn}
              >
                <GoogleIcon />
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
    borderRadius: 16,
    padding: 20,
  },
  loginButtonContainer: {
    backgroundColor: "#EF2A39",
    padding: 10,
    borderRadius: 16,
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  loginButtonTitle: {
    color: "#fff",
    fontWeight: "semibold",
    fontSize: 16,
    fontFamily: "roboto",
  },
});
