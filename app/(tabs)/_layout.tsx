import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Tabs, router } from "expo-router";
import Icon from "react-native-vector-icons/Feather";

interface Icons {
  icon: string;
  color: string;
  focused: boolean;
}

const TabIcon = ({ icon, color, focused }: Icons) => {
  return (
    <View style={styles.iconContainer}>
      <Icon name={icon} size={24} color={color} />
      {focused && <Text style={[styles.iconText, { color }]}>.</Text>}
    </View>
  );
};

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#fff",
          tabBarStyle: styles.tabBarStyle,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Index",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon="home" color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="userProfile"
          options={{
            title: "User-profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon="user" color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="addItem"
          options={{
            headerShown: false,
            tabBarButton: () => (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => router.push("/addItem")}
              >
                <Icon name="plus" size={28} color="#fff" />
              </TouchableOpacity>
            ),
          }}
        />

        <Tabs.Screen
          name="customerSupport"
          options={{
            title: "Customer-support",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon="message-circle" color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: "Cart",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon="shopping-cart" color={color} focused={focused} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    position: "absolute",
    bottom: -10,
    fontSize: 18,
    fontWeight: "bold",
  },

  tabBarStyle: {
    backgroundColor: "#EF2A39",
    height: 64,
    position: "relative",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#EF2A39",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default TabLayout;
