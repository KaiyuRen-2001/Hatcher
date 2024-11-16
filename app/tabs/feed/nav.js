import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  createStaticNavigation,
  NavigationIndependentTree,
} from "@react-navigation/native";
import FeedDetails from "@/app/tabs/profile/details";
import Home from "@/app/tabs/feed/home";
import Theme from "@/assets/theme";

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  return (
    <NavigationIndependentTree>
      <Drawer.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Theme.colors.backgroundPrimary,
          },
          headerTitleStyle: {
            color: Theme.colors.textPrimary,
          },
          drawerStyle: {
            backgroundColor: Theme.colors.backgroundPrimary,
          },
          drawerActiveTintColor: Theme.colors.textPrimary,
          headerTitleAlign: "center",
          drawerBackgroundColor: Theme.colors.backgroundPrimary,
          headerTintColor: Theme.colors.textPrimary,
        }}
      >
        <Drawer.Screen name="Home" component={Home}></Drawer.Screen>
      </Drawer.Navigator>
    </NavigationIndependentTree>
  );
}
