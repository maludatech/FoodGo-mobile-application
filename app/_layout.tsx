import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Slot, Stack } from "expo-router";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { CartProvider } from "@/context/CartContext";
import { AuthContextProvider } from "@/context/AuthContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    lobster: require("../assets/fonts/Lobster-Regular.ttf"),
    rubik: require("../assets/fonts/Rubik-Regular.ttf"),
    pacifico: require("../assets/fonts/Pacifico-Regular.ttf"),
    roboto: require("../assets/fonts/Roboto-Regular.ttf"),
    poppins: require("../assets/fonts/Poppins-Regular.ttf"),
    inter: require("../assets/fonts/Inter-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthContextProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <CartProvider>
          <StatusBar style="light" />
          <Stack screenOptions={{ headerShown: false }}>
            <Slot />
          </Stack>
        </CartProvider>
      </ThemeProvider>
    </AuthContextProvider>
  );
}
