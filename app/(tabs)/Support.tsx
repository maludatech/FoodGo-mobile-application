import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Feather";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { PixelRatio } from "react-native";

const Cart = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar style="dark" />
      <ScrollView>
        <View style={styles.innerContainer}>
          <View style={styles.headerContainer}>
            <Icon
              name="arrow-left"
              size={24}
              color={"#3C2F2F"}
              onPress={() => router.back()}
            />
            <Icon
              name="activity"
              size={24}
              color={"#3C2F2F"}
              onPress={() => router.back()}
            />
          </View>
          <View style={styles.chatContainer}>
            <View style={styles.adminContainer}>
              <View style={styles.adminImageContainer}>
                <Icon name="user" color={"#FFF"} size={24} />
              </View>
              <View style={styles.adminTextContainer}>
                <Text>Hi, how can I help you?</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flexDirection: "column",
    flex: 1,
    padding: "4%",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chatContainer: {
    flexDirection: "column",
    gap: "4%",
  },
  adminContainer: {
    flexDirection: "row",
    gap: "2%",
  },
  adminImageContainer: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: "#3C2F2F",
    justifyContent: "center",
    alignContent: "center",
  },
  adminTextContainer: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    padding: 6,
  },
  adminText: {
    color: "#3C2F2F",
    fontSize: PixelRatio.getFontScale() * 16,
    fontWeight: "medium",
    fontFamily: "roboto",
  },
});
