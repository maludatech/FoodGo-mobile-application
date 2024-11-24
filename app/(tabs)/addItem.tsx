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
                  contentContainerStyle={{ paddingRight: "10%" }}
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
            <View style={styles.orderContainer}>
              <View style={styles.totalContainer}>
                <Text style={styles.totalContainerHeading}>Total</Text>
                <Text style={styles.totalContainerText}></Text>
              </View>
              <View style={styles.orderButtonContainer}>
                <TouchableOpacity style={styles.orderButton}>
                  <Text style={styles.orderButtonText}>Pay Now</Text>
                </TouchableOpacity>
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
    paddingVertical: "4%",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "4%",
  },
  mainContainer: {
    flexDirection: "column",
    gap: 6,
  },
  mainContent: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "4%",
  },
  imageContainer: {
    width: "60%",
    aspectRatio: 1,
    alignSelf: "flex-start",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  descriptionContainer: {
    flexDirection: "column",
    gap: "4%",
    width: "38%",
  },
  description: {
    fontFamily: "roboto",
    fontSize: PixelRatio.getFontScale() * 12,
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
    fontSize: PixelRatio.getFontScale() * 13,
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
    fontSize: PixelRatio.getFontScale() * 12,
    fontWeight: "bold",
  },
  hotLabel: {
    color: "#EF2A39",
    fontSize: PixelRatio.getFontScale() * 12,
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
    paddingHorizontal: 12,
    paddingVertical: 3,
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
    fontSize: PixelRatio.getFontScale() * 20,
  },
  quantity: {
    fontFamily: "inter",
    color: "#3C2F2F",
    fontWeight: "bold",
    fontSize: PixelRatio.getFontScale() * 16,
  },
  flatListContainer: {
    flexDirection: "column",
    gap: "4%",
    paddingTop: "6%",
  },
  FlatList1content: {
    flexDirection: "column",
    gap: "2%",
    paddingLeft: "4%",
  },
  FlatList2content: {
    flexDirection: "column",
    gap: "2%",
    paddingLeft: "4%",
  },
  flatListHeading: {
    fontFamily: "roboto",
    fontWeight: "700",
    fontSize: PixelRatio.getFontScale() * 16,
    color: "#3C2F2F",
  },
  itemContainer: {
    flexDirection: "column",
    backgroundColor: "#3C2F2F",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: "#0000",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
    shadowOpacity: 0.5,
    elevation: 24,
    zIndex: 10,
    marginLeft: "2%",
  },
  itemImageContainer: {
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  itemImage: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
  itemDescription: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "7%",
    gap: "2%",
  },
  itemName: {
    color: "#ffffff",
    fontSize: PixelRatio.getFontScale() * 12,
    fontFamily: "roboto",
    fontWeight: "medium",
  },
  itemQuantityContainer: {
    backgroundColor: "#EF2A39",
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  itemQuantityControl: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  orderContainer: {
    paddingHorizontal: "4%",
    paddingTop: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: "4%",
  },
  totalContainer: {
    flexDirection: "column",
    gap: "2%",
  },
  totalContainerHeading: {
    color: "#3C2F2F",
    fontFamily: "roboto",
    fontWeight: "700",
    fontSize: PixelRatio.getFontScale() * 17,
  },
  totalContainerText: {},
  orderButtonContainer: {},
  orderButton: {
    backgroundColor: "#EF2A39",
    padding: "2%",
    borderRadius: 16,
  },
  orderButtonText: {
    color: "#FFF",
    fontFamily: "roboto",
    fontWeight: "700",
    fontSize: PixelRatio.getFontScale() * 17,
  },
});
