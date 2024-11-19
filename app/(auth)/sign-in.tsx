import { useSignIn } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import {
  Text,
  TextInput,
  Button,
  View,
  ScrollView,
  ImageBackground,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Icon } from "react-native-vector-icons/Icon";

const SignIn = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.innerContainer}>
          <View style={styles.firstContainer}>
            <ImageBackground />
            <View style={styles.header}>
              <Icon name="arrow-left" color={"#fff"} size={30} />
            </View>
          </View>
          <View style={styles.secondContainer}></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flexDirection: "column",
  },
  firstContainer: {},
  header: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  secondContainer: {},
});
