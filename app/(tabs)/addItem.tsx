import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import Icon from "react-native-vector-icons/Feather";
import Slider from "@react-native-community/slider";

const AddItem = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [spicyLevel, setSpicyLevel] = useState(0);
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.innerContainer}>
          <View style={styles.headerContainer}>
            <Icon
              name="arrow-left"
              size={24}
              color={"#3C2F2F"}
              onPress={() => router.back()}
            />
            <Icon
              name="search"
              size={24}
              color={"#3C2F2F"}
              onPress={() => router.back()}
            />
          </View>
          <View style={styles.mainContainer}>
            <View style={styles.mainContent}>
              <View style={styles.imageContainer}>
                <Image
                  source={{
                    uri: "https://res.cloudinary.com/dlnvweuhv/image/upload/v1732382937/addItem-image_yavv1u.png",
                  }}
                  alt="hamburger_image"
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.descriptionContainer}>
                <Text style={styles.description}>
                  <Text style={styles.customizeText}>Customize</Text> Your
                  Burger to Your Tastes. Ultimate Experience
                </Text>
                <View style={styles.spicyContainer}>
                  <Text style={styles.specificationText}>Spicy</Text>
                  <View style={styles.sliderContainer}>
                    <Text style={styles.mildLabel}>Mild</Text>
                    <Slider
                      style={styles.slider}
                      minimumValue={0}
                      maximumValue={100}
                      value={spicyLevel}
                      onValueChange={(value) => setSpicyLevel(value)}
                      minimumTrackTintColor="#EF2A39"
                      maximumTrackTintColor="#6A6A6A"
                      thumbTintColor="#EF2A39"
                    />
                    <Text style={styles.hotLabel}>Hot</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddItem;

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
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainContainer: {
    flexDirection: "column",
    gap: 6,
  },
  mainContent: {
    flexDirection: "row",
    gap: 8,
  },
  imageContainer: {
    width: "50%",
    aspectRatio: 1.8,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  descriptionContainer: {
    width: "50%",
    flexDirection: "column",
    gap: 8,
  },
  description: {
    fontFamily: "roboto",
    fontSize: 14,
    color: "#3C2F2F",
  },
  customizeText: {
    fontWeight: "bold",
  },
  spicyContainer: {
    flexDirection: "column",
    gap: 2,
  },
  specificationText: {
    color: "#3C2F2F",
    fontSize: 14,
    fontWeight: "medium",
    fontFamily: "roboto",
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "65%",
  },
  slider: {
    flex: 1,
    marginHorizontal: "0.5%",
    height: 40,
  },
  mildLabel: {
    color: "#1CC019",
    fontSize: 14,
    fontWeight: "bold",
  },
  hotLabel: {
    color: "#EF2A39",
    fontSize: 14,
    fontWeight: "bold",
  },
});
