import { createDrawerNavigator } from "@react-navigation/drawer";
import { useState, useEffect } from "react";
import {
  createStaticNavigation,
  NavigationIndependentTree,
} from "@react-navigation/native";
import Home from "@/app/tabs/feed/home";
import Theme from "@/assets/theme";
import GroupPage from "@/components/GroupPage";
import { getUsersGroups } from "@/database/db";
import useSession from "@/utils/useSession";

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  const session = useSession();

  const [groups, setGroups] = useState(null);

  const getGroups = async () => {
    const myGroups = await getUsersGroups(session.user.username);
    setGroups(myGroups);
  };

  useEffect(() => {
    if (session) {
      getGroups();
    }
  }, [session]);

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
          drawerInactiveTintColor: Theme.colors.textSecondary,
          headerTitleAlign: "center",
          drawerBackgroundColor: Theme.colors.backgroundPrimary,
          headerTintColor: Theme.colors.textPrimary,
        }}
      >
        <Drawer.Screen name="Home" component={Home}></Drawer.Screen>
        {groups &&
          groups.map((group) => (
            <Drawer.Screen
              name={group.name}
              key={group.groupId}
              children={() => <GroupPage group={group} />}
            />
          ))}
      </Drawer.Navigator>
    </NavigationIndependentTree>
  );
}
