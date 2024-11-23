import { Stack, useLocal } from "expo-router";
import Theme from "@/assets/theme";
import { Pressable, Text } from "react-native";

export default function Layout() {
  const handleDelete = () => {
    console.log("Delete button pressed!");
    //const { id } = useLocalSearchParams();
    //storageDeleteGoal();
  };
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
        name="myprofile"
        options={{
          title: "my profile",
        }}
      />
      <Stack.Screen
        name="goaldetails"
        options={{
          title: "Goal",
          headerBackTitle: "Back",
          headerTintColor: Theme.colors.textPrimary,
          headerRight: () => (
            <Pressable
              onPress={handleDelete}
              style={{
                marginRight: 10, // Adjust for spacing
              }}
            >
              <Text style={{ color: Theme.colors.textPrimary, fontSize: 16 }}>
                Delete
              </Text>
            </Pressable>
          ),
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
