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
  Dimensions,
  PixelRatio,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { router, Redirect } from "expo-router";
import { useUser, useAuth } from "@clerk/clerk-expo";
import { ProductList } from "@/components/ProductList";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const { user } = useUser();
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }

  useEffect(() => {
    const sendUserDataToBackend = async () => {
      try {
        if (user) {
          const fullName = `${user.firstName} ${user.lastName}`;
          const email = user.emailAddresses[0]?.emailAddress;
          const imageUrl = user.imageUrl;

          // Send user data to the backend
          const response = await fetch(
            "https://food-go-backend.vercel.app/api/auth/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ fullName, email, imageUrl }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to send user details to the backend");
          }

          const responseData = await response.json();
          console.log("User data sent successfully", responseData);
        } else {
          console.error("User object is undefined");
        }
      } catch (error) {
        console.error("Error sending user data:", error);
      }
    };

    sendUserDataToBackend();
  }, [user]);

  const { width: screenWidth } = Dimensions.get("window");
  const desiredColumnWidth = 150;
  const numColumns = Math.floor(screenWidth / desiredColumnWidth);

  const slide = ["All", "Sliders", "Combo", "Classic"];

  const [isActive, setIsActive] = useState<number | null>(0);
  const [query, setQuery] = useState<string>();
  const [filteredProducts, setFilteredProducts] = useState(ProductList || []);

  useEffect(() => {
    if (query) {
      const filtered = ProductList.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(ProductList);
    }
  }, [query, ProductList]);

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
            <Image
              source={{ uri: user?.imageUrl }}
              style={{
                width: 70,
                height: 70,
                borderRadius: 16,
              }}
            />
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
                onChangeText={(text) => setQuery(text)}
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
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: "15%" }}
            style={styles.slideList}
            renderItem={({ item, index }) => (
              <View style={styles.slideItem}>
                <TouchableOpacity
                  style={[
                    styles.slideButton,
                    isActive === index
                      ? styles.activeSlide
                      : styles.inactiveSlide,
                  ]}
                  onPress={() => setIsActive(index)}
                >
                  <Text
                    style={[
                      styles.slideText,
                      isActive === index
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
          {filteredProducts.length === 0 ? (
            <Text style={styles.noProductFound}>No products found</Text>
          ) : (
            <FlatList
              data={filteredProducts}
              nestedScrollEnabled={true}
              numColumns={numColumns}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.productContainer}
                  onPress={() => router.push(`/product/${item.id}`)}
                >
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: item.imageUrl }}
                      style={styles.productImage}
                      alt={item.name}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.productDetails}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productTitle}>{item.title}</Text>
                  </View>
                  <View style={styles.ratingContainer}>
                    <View style={styles.rating}>
                      <FontAwesome name="star" color={"#FF9633"} size={20} />
                      <Text style={{ fontWeight: "600" }}>{item.rating}</Text>
                    </View>
                    <Icon
                      name="heart"
                      color={"#3C2F2F"}
                      size={20}
                      style={{ fontWeight: "bold" }}
                    />
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
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
    paddingTop: "4%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "4%",
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
    paddingTop: 16,
    justifyContent: "space-between",
    gap: 8,
    alignItems: "center",
    paddingHorizontal: "4%",
  },
  searchBox: {
    position: "relative",
    width: "80%",
    alignItems: "center",
  },
  searchIcon: {
    position: "absolute",
    left: 8,
    top: 12,
    zIndex: 20,
  },
  searchInput: {
    borderRadius: 20,
    backgroundColor: "white",
    color: "#3C2F2F",
    fontSize: 18,
    fontWeight: "semibold",
    paddingLeft: 50,
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
    paddingLeft: "4%",
    paddingTop: "5%",
  },
  slideItem: {
    marginLeft: "2%",
  },
  slideButton: {
    paddingVertical: 8,
    paddingHorizontal: 26,
    borderRadius: 20,
  },
  activeSlide: {
    backgroundColor: "#EF2A39",
  },
  inactiveSlide: {
    backgroundColor: "#F3F4F6",
  },
  slideText: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "inter",
  },
  activeSlideText: {
    color: "#fff",
  },
  inactiveSlideText: {
    color: "#6A6A6A",
  },
  productList: {
    paddingHorizontal: "2%",
    paddingBottom: "5%",
  },
  noProductFound: {
    color: "#3C2F2F",
    fontSize: PixelRatio.getFontScale() * 18,
    textAlign: "center",
    marginTop: "20%",
    fontFamily: "roboto",
    fontWeight: "bold",
  },
  productContainer: {
    backgroundColor: "white",
    paddingHorizontal: "4%",
    paddingVertical: "5%",
    borderRadius: 12,
    flexDirection: "column",
    gap: 4,
    margin: "4%",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 24,
    minHeight: "2%",
    minWidth: "42%",
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
    flexWrap: "wrap",
    fontSize: 16,
    fontWeight: "bold",
    color: "#3C2F2F",
    fontFamily: "roboto",
  },
  productTitle: {
    flexWrap: "wrap",
    flexShrink: 1,
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
