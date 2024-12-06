import { Stack, useLocalSearchParams } from "expo-router";
import Theme from "@/assets/theme";
import { Pressable, Text } from "react-native";
import { GoalsContext } from "@/components/storageContext";
import { useContext } from "react";
import { useRouter } from "expo-router";

export default function Layout() {
  const { storageDeleteGoal } = useContext(GoalsContext);
  const router = useRouter();

  const handleDelete = (id) => {
    if (id) {
      storageDeleteGoal(id);
      router.back();
    } else {
      console.error("No goal ID provided for deletion");
    }
  };

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
      <Stack.Screen name="nav" options={{ headerShown: false }} />
      <Stack.Screen
        name="myprofile"
        options={{
          title: "my profile",
        }}
      />
      <Stack.Screen
        name="goaldetails"
        options={({ route }) => ({
          title: "Goal",
          headerBackTitle: "Back",
          headerTintColor: Theme.colors.textPrimary,
          headerRight: () => (
            <Pressable
              onPress={() => handleDelete(route.params?.id)}
              style={{
                marginRight: 10,
              }}
            >
              <Text style={{ color: Theme.colors.textPrimary, fontSize: 16 }}>
                Delete
              </Text>
            </Pressable>
          ),
        })}
      />
      <Stack.Screen
        name="event"
        options={{
          title: "Event",
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
