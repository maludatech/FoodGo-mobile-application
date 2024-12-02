import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { useAuthContext } from "@/context/AuthContext";
import { useCartContext } from "@/context/CartContext";

const OrderHistory = () => {
  const { user, dispatch } = useAuthContext();
  const { clearCart } = useCartContext();

  const email = user?.email;

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const fetchOrderHistory = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://food-go-backend.vercel.app/api/user/order-history/${email}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Data from backend:", data);
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch({ type: "LOGOUT" });
      clearCart();
    } catch (error) {
      Alert.alert(
        "Sign Out Error",
        "There was an error signing out. Please try again."
      );
      console.error("Sign Out Error:", error);
    }
  };

  const renderOrder = ({ item }: any) => (
    <TouchableOpacity style={styles.orderCard}>
      <View style={styles.orderInfo}>
        <Text style={styles.orderId}>Order #{item.id}</Text>
        <Text style={styles.orderDate}>{item.date}</Text>
      </View>
      <Text style={styles.orderStatus}>{item.status}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#EF2A39" style="light" />
      <View style={styles.header}>
        <Icon
          name="arrow-left"
          size={24}
          color="#fff"
          onPress={() => router.back()}
        />
        <Text style={styles.headerTitle}>Order History</Text>
        <Icon
          name="log-out"
          size={24}
          color="#fff"
          onPress={() => handleSignOut}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#EF2A39"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item: any) => item.id}
          renderItem={renderOrder}
          ListEmptyComponent={
            <Text style={styles.emptyMessage}>No orders found.</Text>
          }
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </SafeAreaView>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EF2A39",
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  orderCard: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  orderInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderId: {
    fontWeight: "bold",
  },
  orderDate: {
    color: "#666",
  },
  orderStatus: {
    marginTop: 8,
    color: "#EF2A39",
    fontWeight: "bold",
  },
  emptyMessage: {
    textAlign: "center",
    color: "#666",
    marginTop: 20,
  },
});
