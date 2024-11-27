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
  const [text, setText] = useState<string>();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar style="dark" />
      <View style={styles.innerContainer}>
        <ScrollView>
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
        </ScrollView>

        {/* Send Message Container Outside ScrollView */}
        <View style={styles.sendMessageContainer}>
          <TextInput
            placeholder="Type here..."
            placeholderTextColor={"#808080"}
            style={styles.sendMessageTextInput}
            onChangeText={setText}
            multiline={true}
            textAlignVertical="top"
            numberOfLines={4}
          />
          <TouchableOpacity
            style={styles.sendMessageIconContainer}
            onPress={() => setMessage(text)}
          >
            <Icon name="send" size={24} color={"#FFF"} />
          </TouchableOpacity>
        </View>
      </View>
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
    paddingVertical: "4%",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "4%",
  },
  chatContainer: {
    flexDirection: "column",
    gap: 24,
    paddingTop: "6%",
    paddingHorizontal: "4%",
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
    paddingVertical: "2%",
    paddingHorizontal: "4%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "75%",
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
    borderWidth: 2,
    overflow: "hidden",
    borderColor: "#EF2A39",
  },
  userImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  userTextContainer: {
    backgroundColor: "#EF2A39",
    borderRadius: 12,
    paddingVertical: "2%",
    paddingHorizontal: "4%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "75%",
  },
  userText: {
    color: "#FFF",
    fontSize: PixelRatio.getFontScale() * 17,
    fontWeight: "medium",
    fontFamily: "roboto",
  },
  sendMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "4%",
    paddingVertical: 8,
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  sendMessageTextInput: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
    marginRight: 12,
    minHeight: 50,
    maxHeight: 120,
  },
  sendMessageIconContainer: {
    backgroundColor: "#EF2A39",
    padding: 12,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
