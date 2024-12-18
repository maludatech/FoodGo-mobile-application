import React from "react";
import { Link, Stack } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.headerText}>404</Text>
          <Text style={styles.description}>
            The page you're looking for doesn't exist.
          </Text>
          <Link href={"/"} style={styles.homeLink}>
            <Text style={styles.linkText}>Go back to Home</Text>
          </Link>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EF2A39",
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
  headerText: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#EF2A39",
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    color: "#808080",
    textAlign: "center",
    marginBottom: 32,
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
    fontSize: 16,
    fontWeight: "600",
  },
});
