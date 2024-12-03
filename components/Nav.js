import { createDrawerNavigator } from "@react-navigation/drawer";
import { useState, useEffect } from "react";
import { NavigationIndependentTree } from "@react-navigation/native";
import Theme from "@/assets/theme";
import GroupPage from "@/app/groups/GroupPage";
import { getUsersGroups } from "@/database/db";
import useSession from "@/utils/useSession";
import CreateGroupPage from "./CreateGroupPage";

const Drawer = createDrawerNavigator();

export default function DrawerNav({ name, component }) {
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
          drawerContentContainerStyle: {
            height: "100%",
          },
          drawerContentStyle: { height: "100%" },
          drawerActiveTintColor: Theme.colors.textPrimary,
          drawerInactiveTintColor: Theme.colors.textSecondary,
          headerTitleAlign: "center",
          drawerActiveBackgroundColor: Theme.colors.textHighlighted,
          drawerBackgroundColor: Theme.colors.backgroundPrimary,
          headerTintColor: Theme.colors.textPrimary,
        }}
      >
        <Drawer.Screen
          name={name}
          component={component}
          options={{
            drawerActiveBackgroundColor: Theme.colors.backgroundSecondary,
            drawerLabelStyle: {
              color: Theme.colors.textPrimary,
            },
          }}
        ></Drawer.Screen>
        {groups &&
          groups.map((group) => (
            <Drawer.Screen
              name={group.name}
              key={group.groupId}
              children={() => <GroupPage group={group} />}
            />
          ))}
        <Drawer.Screen
          options={{
            drawerItemStyle: {
              marginTop: "auto",
              marginLeft: "5%",
              marginRight: "30%",
              backgroundColor: Theme.colors.iconHighlighted,
              borderTopStyle: "solid",
              borderTopWeight: 10,
              borderTopColor: "black",
              borderWidth: 0,
              borderRadius: 4,
              paddingHorizontal: 0,
            },
            drawerLabelStyle: {
              fontSize: Theme.sizes.textSmall,
              fontFamily: "PTSansCaption",
              marginHorizontal: "auto",
              paddingLeft: 16,
            },
          }}
          name={"Create New Group"}
          children={() => <CreateGroupPage />}
        ></Drawer.Screen>
      </Drawer.Navigator>
    </NavigationIndependentTree>
  );
}
