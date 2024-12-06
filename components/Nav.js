import { createDrawerNavigator } from "@react-navigation/drawer";
import { useState, useEffect, useContext } from "react";
import { StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import { NavigationIndependentTree } from "@react-navigation/native";
import Theme from "@/assets/theme";
import GroupPage from "@/app/groups/group";
import { getUsersGroups } from "@/database/db";
import useSession from "@/utils/useSession";
import CreateGroupPage from "./CreateGroupPage";
import { GoalsContext } from "@/components/storageContext";

const Drawer = createDrawerNavigator();

export default function DrawerNav({ name, component, source }) {
  const session = useSession();
  const { groups } = useContext(GoalsContext);

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
            headerTitleStyle: {
              color: Theme.colors.textPrimary,
              fontSize: Theme.sizes.textLarge,
              fontFamily: "PTSansCaption-Bold",
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
            headerBackTitle: "Back",
            headerLeft: () => (
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <Entypo
                  name="chevron-small-left"
                  size={Theme.sizes.iconMedium}
                  color={Theme.colors.textDark}
                />
                <Text style={styles.backText}>Back</Text>
              </TouchableOpacity>
            ),
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
              fontFamily: "PTSansCaption-Bold",
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

const styles = StyleSheet.create({
  backButton: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  backText: {
    margin: -8,
    fontSize: Theme.sizes.textMedium,
    color: Theme.colors.textDark,
    fontFamily: "PTSansCaption-Bold",
  },
});
