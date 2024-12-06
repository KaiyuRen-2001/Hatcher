import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs, useRouter } from "expo-router";
import Theme from "@/assets/theme";

export default function Layout() {
  const router = useRouter();
  // Override default layout to ensure that our screen background bleeds
  // into the status bar.
  return (
    <Tabs
      initialRouteName="explore"
      screenOptions={{
        tabBarActiveTintColor: Theme.colors.tabBarActive,
        tabBarInactiveTintColor: Theme.colors.iconSecondary,
        tabBarStyle: {
          backgroundColor: Theme.colors.backgroundPrimary,
          borderTopStyle: "solid",
          borderTopColor: Theme.colors.tabBarBorder,
        },
        tabBarLabelStyle: {
          fontFamily: "PTSansCaption",
          fontSize: Theme.sizes.textSmall,
        },
        headerStyle: {
          backgroundColor: Theme.colors.backgroundPrimary,
          borderStyle: "none",
        },
        headerTitleStyle: {
          color: Theme.colors.textPrimary,
        },
      }}
      screenListeners={{
        tabPress: () => {
          while (router.canGoBack()) {
            router.back();
          }
        },
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="egg" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          headerShown: false,
          tabBarLabel: "Explore",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="earth" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarLabel: "Profile",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome size={size} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
