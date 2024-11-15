import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import Theme from "@/assets/theme";

export default function Layout() {
  // Override default layout to ensure that our screen background bleeds
  // into the status bar.
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Theme.colors.tabBarActive,
        tabBarInactiveTintColor: Theme.colors.iconSecondary,
        tabBarStyle: {
          backgroundColor: Theme.colors.backgroundPrimary,
          borderTopStyle: "solid",
          borderTopColor: Theme.colors.tabBarBorder,
        },
        headerStyle: {
          backgroundColor: Theme.colors.backgroundPrimary,
          borderStyle: "none",
        },
        headerTitleStyle: {
          color: Theme.colors.textPrimary,
        },
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="beehive-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          headerShown: false,
          tabBarLabel: "Explore",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome size={size} name="user" color={color} />
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
