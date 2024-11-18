import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/Feather";
import { ProductList } from "@/components/ProductList";

export default function HomeScreen() {
  const slide = ["All", "Sliders", "Combo", "Classic"];
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.innerContainer}>
          <View style={styles.header}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.title}>Foodgo</Text>
              <Text style={styles.subtitle}>Order your favourite food!</Text>
            </View>
            <Image source={require("../assets/images/userIcon.png")} />
          </View>
          <View style={styles.searchContainer}>
            <View style={styles.searchBox}>
              <Icon
                name="search"
                color="#3C2F2F"
                size={25}
                style={styles.searchIcon}
              />
              <TextInput
                placeholder="Search"
                placeholderTextColor={"#3C2F2F"}
                style={styles.searchInput}
              />
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Icon name="sliders" color="#fff" size={25} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={slide}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            style={styles.slideList}
            renderItem={({ item, index }) => (
              <View style={styles.slideItem}>
                <TouchableOpacity
                  style={[
                    styles.slideButton,
                    index === 0 ? styles.activeSlide : styles.inactiveSlide,
                  ]}
                >
                  <Text
                    style={[
                      styles.slideText,
                      index === 0
                        ? styles.activeSlideText
                        : styles.inactiveSlideText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <FlatList
            data={ProductList}
            nestedScrollEnabled={true}
            numColumns={2} // Grid with 2 columns
            keyExtractor={(item) => item.id.toString()}
            style={styles.productList}
            renderItem={({ item }) => (
              <View style={styles.productContainer}>
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.productImage}
                    alt={item.name}
                  />
                </View>
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productTitle}>{item.title}</Text>
                </View>
                <View style={styles.ratingContainer}>
                  <View style={styles.rating}>
                    <Text>{item.rating}</Text>
                    <Icon name="star" color={"#FF9633"} size={20} />
                  </View>
                  <Icon name="heart" color={"#3C2F2F"} size={20} />
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  innerContainer: {
    flexDirection: "column",
    gap: 8,
    paddingTop: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  headerTextContainer: {
    flexDirection: "column",
  },
  title: {
    color: "#3C2F2F",
    fontSize: 40,
    fontFamily: "lobster",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "semibold",
    fontFamily: "poppins",
    color: "#6A6A6A",
  },
  searchContainer: {
    flexDirection: "row",
    paddingTop: 2,
    justifyContent: "space-between",
    gap: 8,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  searchBox: {
    position: "relative",
    width: "80%",
    alignItems: "center",
  },
  searchIcon: {
    position: "absolute",
    left: 8,
    top: 10,
    zIndex: 20,
  },
  searchInput: {
    borderRadius: 20,
    backgroundColor: "white",
    color: "#3C2F2F",
    fontSize: 18,
    fontWeight: "semibold",
    paddingLeft: 54,
    paddingVertical: 12,
    fontFamily: "roboto",
    zIndex: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 24,
  },
  filterButton: {
    backgroundColor: "#EF2A39",
    borderRadius: 20,
    padding: 12,
  },
  slideList: {
    paddingLeft: 5,
  },
  slideItem: {
    marginLeft: 8,
  },
  slideButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  activeSlide: {
    backgroundColor: "#EF2A39",
  },
  inactiveSlide: {
    backgroundColor: "#F3F4F6",
  },
  slideText: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "inter",
  },
  activeSlideText: {
    color: "#fff",
  },
  inactiveSlideText: {
    color: "#6A6A6A",
  },
  productList: {
    paddingHorizontal: 5,
  },
  productContainer: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 12,
    flexDirection: "column",
    gap: 16,
    margin: 16,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 24,
    minHeight: 100,
    minWidth: 100,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  productImage: {
    width: 100,
    height: 100,
  },
  productDetails: {
    flexDirection: "column",
    gap: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3C2F2F",
    fontFamily: "roboto",
  },
  productTitle: {
    fontSize: 14,
    color: "#3C2F2F",
    fontFamily: "roboto",
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
