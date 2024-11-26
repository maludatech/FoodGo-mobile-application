import React from "react";
import { Link, Stack } from "expo-router";
import { Text, View, StyleSheet, PixelRatio } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";

export default function PaymentSuccess() {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.innerContainer}>
        <View style={styles.checkContainer}>
          <Icon name="check" size={36} color={"#FFF"} />
        </View>
        <Text style={styles.headerText}>Success !</Text>
        <Text style={styles.description}>
          Your payment was successful. A receipt for this purchase has been sent
          to your email.
        </Text>
        <Link href={"/"} style={styles.homeLink}>
          <Text style={styles.linkText}>Go Back</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#808080",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  innerContainer: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
  },
  checkContainer: {
    backgroundColor: "#EF2A39",
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10%",
  },
  headerText: {
    fontSize: PixelRatio.getFontScale() * 25,
    fontWeight: "bold",
    fontFamily: "poppins",
    color: "#EF2A39",
    paddingBottom: "4%",
  },
  description: {
    fontSize: PixelRatio.getFontScale() * 15,
    fontFamily: "roboto",
    color: "#808080",
    textAlign: "center",
    marginBottom: "12%",
  },
  homeLink: {
    backgroundColor: "#EF2A39",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
  },
  linkText: {
    color: "#fff",
    fontSize: PixelRatio.getFontScale() * 16,
    fontWeight: "600",
  },
});
