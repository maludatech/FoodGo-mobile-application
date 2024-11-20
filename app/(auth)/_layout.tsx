import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import React from "react";

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/(tabs)"} />;
  }

  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
    </Stack>
  );
}
