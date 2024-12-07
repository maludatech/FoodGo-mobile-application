import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Tabs, useRouter, usePathname } from "expo-router";
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
  const router = useRouter();
  const pathname = usePathname();

  // List of screens where the tab bar should be hidden
  const hideTabBarScreens = ["/Profile", "/AddItem", "/Support", "/Cart"];

  // Determine if the tab bar should be hidden
  const isTabBarHidden = hideTabBarScreens.includes(pathname);

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#fff",
          tabBarStyle: [
            styles.tabBarStyle,
            isTabBarHidden ? { display: "none" } : null, // Dynamically hide tab bar
          ],
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
          name="Profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon="user" color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="AddItem"
          options={{
            headerShown: false,
            tabBarButton: () => (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => router.push("/AddItem")}
              >
                <Icon name="plus" size={28} color="#fff" />
              </TouchableOpacity>
            ),
          }}
        />
        <Tabs.Screen
          name="Support"
          options={{
            title: "Support",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon="message-circle" color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="Cart"
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
    height: 60,
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
