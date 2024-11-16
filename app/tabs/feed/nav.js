import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  createStaticNavigation,
  NavigationIndependentTree,
} from "@react-navigation/native";
import FeedDetails from "@/app/tabs/profile/details";
import Home from "@/app/tabs/feed/home";

const Drawer = createDrawerNavigator({
  screens: {
    Home: Home,
  },
});

const Navigation = createStaticNavigation(Drawer);

export default function DrawerNav() {
  return (
    <NavigationIndependentTree>
      <Navigation />
    </NavigationIndependentTree>
  );
}
