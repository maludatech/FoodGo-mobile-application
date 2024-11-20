import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

const Profile = () => {
  const { user } = useUser();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#EF2A39" />
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
                <FontAwesome5Icon
                  name="arrow-left"
                  color={"#fff"}
                  size={20}
                  solid
                  onPress={() => router.back()}
                />
                <FontAwesome5Icon name="cog" color={"#fff"} size={20} solid />
              </View>
            </View>
          </View>
          <View style={styles.secondContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: user?.imageUrl }}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 16,
                  borderWidth: 4,
                  borderColor: "#EF2A39",
                  position: "absolute",
                  zIndex: 20,
                }}
              />
            </View>
            <View style={styles.formContainer}>
              <View style={styles.formContents}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  style={styles.input}
                  value={user?.fullName as string}
                  editable={false}
                />
              </View>
              <View style={styles.formContents}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={user?.emailAddresses[0]?.emailAddress as string}
                  editable={false}
                />
              </View>
              <View style={styles.formContents}>
                <Text style={styles.label}>Delivery Address</Text>
                <TextInput style={styles.input} />
              </View>
            </View>
            <View style={styles.moreInfoContainer}>
              <View style={styles.borderTop}></View>
              <TouchableOpacity style={styles.moreInfoContent}>
                <Text style={styles.moreInfoText}>Payment Details</Text>
                <Icon name="arrow-right" size={16} color={"#6B7280"} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.moreInfoContent}>
                <Text style={styles.moreInfoText}>Order History</Text>
                <Icon name="arrow-right" size={16} color={"#6B7280"} />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
                <Icon name="edit" size={18} color={"#fff"} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.logOutButton}>
                <Text style={styles.logOutButtonText}>Log out</Text>
                <Icon name="log-out" size={18} color={"#EF2A39"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

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
    height: "15%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 20,
    paddingHorizontal: "4%",
    paddingTop: "2%",
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
    backgroundColor: "#fff",
    minHeight: "100%",
    flexDirection: "column",
    gap: 32,
    position: "relative",
    paddingBottom: "5%",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    flexDirection: "column",
    gap: 20,
    paddingHorizontal: 4,
    paddingTop: 48,
  },
  formContents: {
    flexDirection: "column",
    gap: 4,
  },
  label: {
    fontSize: 16,
    color: "#6B7280",
    marginLeft: 8,
    fontWeight: "medium",
    fontFamily: "roboto",
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 16,
    borderColor: "#d1d5db",
    paddingVertical: 12,
    paddingHorizontal: 16,
    color: "#3C2F2F",
    fontWeight: "semibold",
    fontFamily: "roboto",
    fontSize: 18,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  moreInfoContainer: {
    flexDirection: "column",
    gap: 16,
    padding: 8,
  },
  borderTop: {
    borderWidth: 1,
    borderTopColor: "#E8E8E8",
  },
  moreInfoContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  moreInfoText: {
    fontSize: 18,
    color: "#6B7280",
    fontFamily: "roboto",
    fontWeight: "medium",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 8,
    width: "100%",
    paddingBottom: 10,
    paddingHorizontal: 8,
  },
  editButton: {
    backgroundColor: "#3C2F2F",
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 4,
    width: "50%",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  logOutButton: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#EF2A39",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 4,
    width: "50%",
  },
  logOutButtonText: {
    color: "#EF2A39",
    fontSize: 17,
    fontWeight: "600",
  },
});
