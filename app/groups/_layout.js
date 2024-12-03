import React from "react";
import { Stack } from "expo-router"; // Import Stack component from Expo Router

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Theme.colors.backgroundPrimary,
        },
        headerTitleStyle: {
          color: Theme.colors.textPrimary,
          fontFamily: "PTSansCaption-Bold",
        },
        headerTitleAlign: "center",
      }}
    >
      {/* Define your stack screens here */}
      <Stack.Screen name="index" /> {/* GroupPage will be the index screen */}
      <Stack.Screen name="GroupEvents" />
      <Stack.Screen name="GroupResources" />
      <Stack.Screen name="Event" />
    </Stack>
  );
}
