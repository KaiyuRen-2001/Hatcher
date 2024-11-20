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
      <Stack.Screen
        name="myprofile"
        options={{
          title: "My Profile",
        }}
      />
      <Stack.Screen
        name="goaldetails"
        options={{
          title: "Goal",
          headerBackTitle: "Back",
          headerTintColor: Theme.colors.textPrimary,
        }}
      />
      <Stack.Screen
        name="newgoal"
        options={{
          presentation: "modal",
          title: "Create New Goal",
          headerBackTitle: "Back",
          headerTintColor: Theme.colors.textPrimary,
        }}
      />
    </Stack>
  );
}
