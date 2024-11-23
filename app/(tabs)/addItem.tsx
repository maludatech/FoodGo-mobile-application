import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  PixelRatio,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import Icon from "react-native-vector-icons/Feather";
import Slider from "@react-native-community/slider";
import { Toppings } from "@/components/Toppings";
import { SideOptions } from "@/components/SideOptions";

const { width, height } = Dimensions.get("window");
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
          </View>
          <View style={styles.mainContainer}>
            <View style={styles.mainContent}>
              <View style={styles.imageContainer}>
                <Image
                  source={{
                    uri: "https://res.cloudinary.com/dlnvweuhv/image/upload/v1732389322/addItem-image_lca3zj.png",
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
                <View style={styles.quantityControlContainer}>
                  <Text style={styles.specificationText}>Portion</Text>
                  <View style={styles.quantityControlContent}>
                    <TouchableOpacity
                      style={styles.quantityControlButtons}
                      onPress={() =>
                        setQuantity((prevQuantity) =>
                          Math.max(1, prevQuantity - 1)
                        )
                      }
                    >
                      <Text style={styles.quantityControlButtonsText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityControlButtons}
                      onPress={() =>
                        setQuantity((prevQuantity) => prevQuantity + 1)
                      }
                    >
                      <Text style={styles.quantityControlButtonsText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.flatListContainer}>
              <View style={styles.FlatList1content}>
                <Text style={styles.flatListHeading}>Toppings</Text>
                <FlatList
                  data={Toppings}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                      <View style={styles.itemImageContainer}>
                        <Image
                          source={{ uri: item.imageUrl }}
                          alt={item.name}
                          style={styles.itemImage}
                        />
                      </View>
                      <View style={styles.itemDescription}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <View style={styles.itemQuantityContainer}>
                          <Text style={styles.itemQuantityControl}>+</Text>
                        </View>
                      </View>
                    </View>
                  )}
                />
              </View>
              <View style={styles.FlatList2content}>
                <Text style={styles.flatListHeading}>Side options</Text>
                <FlatList
                  data={SideOptions}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                      <View style={styles.itemImageContainer}>
                        <Image
                          source={{ uri: item.imageUrl }}
                          alt={item.name}
                          style={styles.itemImage}
                        />
                      </View>
                      <View style={styles.itemDescription}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <TouchableOpacity style={styles.itemQuantityContainer}>
                          <Text style={styles.itemQuantityControl}>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                />
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
    paddingTop: "4%",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "4%",
  },
  mainContainer: {
    flexDirection: "column",
    gap: 6,
    paddingHorizontal: "4%",
  },
  mainContent: {
    // flexDirection: width < 600 ? "column" : "row",
    // gap: width < 600 ? 10 : 16,
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageContainer: {
    width: "50%",
    aspectRatio: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  descriptionContainer: {
    flexDirection: "column",
    gap: "4%",
    width: "50%",
  },
  description: {
    fontFamily: "roboto",
    fontSize: PixelRatio.getFontScale() * 16,
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
    fontSize: PixelRatio.getFontScale() * 14,
    fontWeight: "700",
    fontFamily: "roboto",
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: width < 400 ? "1%" : "0.5%",
  },
  mildLabel: {
    color: "#1CC019",
    fontSize: 14,
    fontWeight: "bold",
  },
  hotLabel: {
    color: "#EF2A39",
    fontSize: PixelRatio.getFontScale() * 14,
    fontWeight: "bold",
  },
  quantityControlContainer: {
    flexDirection: "column",
    gap: 8,
    width: "100%",
  },
  quantityControlContent: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  quantityControlButtons: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: "#EF2A39",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    shadowColor: "#EF2A39",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 16,
  },
  quantityControlButtonsText: {
    color: "#fff",
    fontFamily: "roboto",
    fontWeight: "bold",
    fontSize: PixelRatio.getFontScale() * 24,
  },
  quantity: {
    fontFamily: "inter",
    color: "#3C2F2F",
    fontWeight: "bold",
    fontSize: PixelRatio.getFontScale() * 18,
  },
  flatListContainer: {
    flexDirection: "column",
    gap: "4%",
    paddingTop: "6%",
  },
  FlatList1content: {
    flexDirection: "column",
    gap: "2%",
  },
  FlatList2content: {
    flexDirection: "column",
    gap: "2%",
    paddingLeft: "4%",
  },
  flatListHeading: {
    fontFamily: "roboto",
    fontWeight: "semibold",
    fontSize: PixelRatio.getFontScale() * 18,
    color: "#3C2F2F",
  },
  itemContainer: {
    flexDirection: "column",
    padding: "2%",
    shadowColor: "#0000",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
    shadowOpacity: 0.5,
    elevation: 16,
    zIndex: 10,
    marginLeft: "2%",
  },
  itemImageContainer: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  itemDescription: {
    backgroundColor: "#3C2F2F",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  itemName: {
    color: "#ffffff",
    fontSize: PixelRatio.getFontScale() * 12,
    fontFamily: "roboto",
    fontWeight: "medium",
  },
  itemQuantityContainer: {
    backgroundColor: "#EF2A39",
    borderRadius: "50%",
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
  },
  itemQuantityControl: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});
