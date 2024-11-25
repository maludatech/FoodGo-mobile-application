import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router, Redirect } from "expo-router";
import { useUser, useAuth } from "@clerk/clerk-expo";

const Profile = () => {
  const { user } = useUser();
  const { signOut, isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }

  const email = user?.emailAddresses[0].emailAddress;
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(
        `https://food-go-backend.vercel.app/api/user/profile/${email}`
      );
      if (response.ok) {
        const result = await response.json();
        setDeliveryAddress(result.deliveryAddress);
      }
    } catch (error) {
      console.error("Fetch User details error: ", error);
    }
  };

  const updateUserDetails = async () => {
    if (!deliveryAddress.trim()) {
      // Validate that deliveryAddress is not empty
      Alert.alert(
        "Validation Error",
        "Delivery address cannot be empty. Please provide a valid address."
      );
      return; // Stop further execution if validation fails
    }
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://food-go-backend.vercel.app/api/user/profile/${email}`,
        {
          method: "PATCH",
          body: JSON.stringify({ deliveryAddress }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        Alert.alert("Profile updated successfully!!");
      }
    } catch (error) {
      console.error("Fetch User details error: ", error);
      Alert.alert(
        "Error updating profile",
        "There was an error updating your profile. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (email) fetchUserDetails();
  }, [email]);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      Alert.alert(
        "Sign Out Error",
        "There was an error signing out. Please try again."
      );
      console.error("Sign Out Error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#EF2A39" style="light" />
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
                  onPress={() => router.back()}
                />
                <Icon
                  name="log-out"
                  color={"#fff"}
                  size={20}
                  onPress={handleSignOut}
                />
              </View>
            </View>
          </View>
          <View style={styles.secondContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: user?.imageUrl }}
                style={{
                  width: 100,
                  height: 100,
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
                <TextInput
                  style={styles.input}
                  value={deliveryAddress}
                  onChangeText={(text) => setDeliveryAddress(text)}
                />
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
              <TouchableOpacity
                style={[styles.editButton, isLoading && { opacity: 0.6 }]}
                onPress={() => updateUserDetails()}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <>
                    <Text style={styles.editButtonText}>Edit Profile</Text>
                    <Icon name="edit" size={18} color={"#fff"} />
                  </>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.logOutButton}
                onPress={handleSignOut}
              >
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
    flex: 1,
    flexDirection: "column",
  },
  firstContainer: {
    backgroundColor: "#EF2A39",
    position: "relative",
    overflow: "hidden",
    zIndex: 10,
    height: "20%",
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
    zIndex: 40,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#EF2A39",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 24,
  },
  formContainer: {
    flexDirection: "column",
    gap: 20,
    paddingHorizontal: "4%",
    paddingTop: "10%",
  },
  formContents: {
    flexDirection: "column",
    gap: 4,
  },
  label: {
    fontSize: 14,
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
    fontWeight: "700",
    fontFamily: "roboto",
    fontSize: 14,
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
    paddingBottom: "2%",
    paddingHorizontal: "6%",
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: "#d1d5db",
  },
  moreInfoContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  moreInfoText: {
    fontSize: 16,
    color: "#6B7280",
    fontFamily: "roboto",
    fontWeight: "medium",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 16,
    width: "100%",
    paddingHorizontal: 8,
  },
  editButton: {
    backgroundColor: "#3C2F2F",
    padding: 12,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 4,
    width: "48%",
    shadowColor: "#EF2A39",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 24,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  logOutButton: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#EF2A39",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 4,
    width: "48%",
    shadowColor: "#EF2A39",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 24,
  },
  logOutButtonText: {
    color: "#EF2A39",
    fontSize: 17,
    fontWeight: "600",
  },
});
