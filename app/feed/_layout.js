import { Stack, useRouter } from "expo-router";
import Theme from "@/assets/theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Text, TouchableOpacity } from "react-native";

export default function Layout() {
  const router = useRouter();

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
        name="home"
        options={{
          headerTitle: (props) => (
            <>
              <MaterialCommunityIcons
                name="bee"
                size={Theme.sizes.iconMedium}
                color={Theme.colors.textHighlighted}
              />
              <Text
                style={{
                  color: Theme.colors.textPrimary,
                  fontSize: Theme.sizes.textMedium,
                  fontWeight: "bold",
                }}
              >
                {"Buzz"}
              </Text>
            </>
          ),
        }}
      />
      <Stack.Screen name="details" />
      <Stack.Screen
        name="newpost"
        options={{
          presentation: "modal",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity>
              <Text>Submit</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
