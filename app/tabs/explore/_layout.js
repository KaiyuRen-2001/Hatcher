import { Stack } from "expo-router";
import Theme from "@/assets/theme";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Theme.colors.backgroundPrimary,
        },
        headerTitleStyle: {
          color: Theme.colors.textPrimary,
        },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="nav" options={{ headerShown: false }} />
      <Stack.Screen
        name="mapview"
        options={{
          title: "Explore New Groups",
        }}
      />
      <Stack.Screen name="details" />
    </Stack>
  );
}
