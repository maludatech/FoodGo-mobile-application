import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Feather";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { PixelRatio } from "react-native";
import { useUser } from "@clerk/clerk-expo";

const Cart = () => {
  const { user } = useUser();
  const [message, setMessage] = useState<string>();

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
                <Text style={styles.adminText}>Hi, how can I help you?</Text>
              </View>
            </View>
            {message && (
              <View style={styles.userContainer}>
                <View style={styles.userTextContainer}>
                  <Text style={styles.userText}>{message}</Text>
                </View>
                <View style={styles.userImageContainer}>
                  <Image
                    source={{ uri: user?.imageUrl }}
                    alt="user image"
                    style={styles.userImage}
                  />
                </View>
              </View>
            )}
          </View>
          <View style={styles.sendMessageContainer}>
            <TextInput
              placeholder="Type here..."
              placeholderTextColor={"#DBDADA"}
              style={styles.sendMessageTextInput}
              value={message}
              onChangeText={setMessage}
            />
            <View style={styles.sendMessageIconContainer}>
              <Icon name="send" size={24} color={"#FFF"} />
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
    paddingTop: "6%",
  },
  adminContainer: {
    flexDirection: "row",
    gap: "2%",
    alignSelf: "flex-start",
  },
  adminImageContainer: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: "#3C2F2F",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  adminTextContainer: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    padding: 6,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  adminText: {
    color: "#3C2F2F",
    fontSize: PixelRatio.getFontScale() * 17,
    fontWeight: "medium",
    fontFamily: "roboto",
  },
  userContainer: {
    flexDirection: "row",
    gap: "2%",
    alignSelf: "flex-end",
  },
  userImageContainer: {
    height: 48,
    width: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#EF2A39",
  },
  userImage: {
    width: "100%",
    height: "100%",
  },
  userTextContainer: {
    backgroundColor: "#EF2A39",
    borderRadius: 12,
    padding: 6,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  userText: {
    color: "#FFF",
    fontSize: PixelRatio.getFontScale() * 17,
    fontWeight: "medium",
    fontFamily: "roboto",
  },
  sendMessageContainer: {
    position: "absolute",
    bottom: "5%",
    flexDirection: "row",
    alignItems: "center",
  },
  sendMessageTextInput: {
    flex: 1, // Make it occupy the remaining space
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginRight: 12,
  },
  sendMessageIconContainer: {
    backgroundColor: "#EF2A39",
    padding: 12,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
