import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Theme from "@/assets/theme";
import { useRoute } from "@react-navigation/native";
import GroupComponent from "@/components/GroupComponent";
import { useEffect } from "react";
import { useNavigation } from "expo-router";

export default function Details(props) {
  const [group, setGroup] = useState(props.group);
  console.log("props.group: ", group);
  if (!group) {
    const route = useRoute();
    const groupFromRoute = route.params.group;
    setGroup(() => JSON.parse(groupFromRoute));
    console.log("route group: ", group);
  }

  return <GroupComponent group={group} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  joinGroupText: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    paddingHorizontal: "10%",
    paddingTop: "40%",
    textAlign: "center",
    fontSize: Theme.sizes.textLarge,
    color: Theme.colors.textPrimary,
    fontFamily: "PTSansCaption",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: Theme.colors.headerBackground,
  },
  groupName: {
    fontFamily: "PTSansCaption-Bold",
    fontSize: Theme.sizes.textMedium,
    color: Theme.colors.textPrimary,
  },
  infoContainer: {
    padding: 16,
    marginTop: -24,
  },
  infoText: {
    fontFamily: "PTSansCaption",
    fontSize: Theme.sizes.textBody,
    color: Theme.colors.textPrimary,
    marginBottom: 4,
  },
  description: {
    fontSize: Theme.sizes.textSmall,
    color: Theme.colors.textPrimary,
    fontFamily: "PTSansCaption",
  },
  chatContainer: {
    flex: 1,
    padding: 16,
  },
  chatList: {
    flex: 1,
    marginBottom: 8,
  },
  messageContainer: {
    padding: 10,
    marginVertical: 4,
    borderRadius: 20,
    maxWidth: "75%",
    position: "relative",
  },
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: Theme.colors.backgroundSecondary,
    borderTopRightRadius: 0,
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: Theme.colors.backgroundSecondary,
    borderTopLeftRadius: 0,
  },
  messageText: {
    color: Theme.colors.textPrimary,
  },
  tail: {
    position: "absolute",
    width: 0,
    height: 0,
    borderStyle: "solid",
  },
  sentTail: {
    right: -5,
    top: 10,
    borderWidth: 10,
    borderColor: "transparent",
    borderTopColor: Theme.colors.backgroundSecondary,
    borderBottomWidth: 0,
  },
  receivedTail: {
    left: -5,
    top: 10,
    borderWidth: 10,
    borderColor: "transparent",
    borderTopColor: Theme.colors.backgroundSecondary,
    borderBottomWidth: 0,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: Theme.colors.textSecondary,
    borderRadius: 8,
    padding: 9,
    marginRight: 8,
    color: Theme.colors.textPrimary,
  },

  resourcesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: -30,
  },

  pressableContainer: {
    padding: 6,
    flexDirection: "column",
    alignItems: "center",
  },
  pressableText: {
    fontSize: Theme.sizes.textSmall,
    color: Theme.colors.textDark,
    fontFamily: "PTSansCaption",
  },

  notJoinedContainer: {
    backgroundColor: Theme.colors.backgroundSecondary,
    borderRadius: 50,
    padding: 9,
  },

  joinedContainer: {
    borderColor: Theme.colors.backgroundSecondary,
    borderWidth: 3,
    borderRadius: 20,
    padding: 9,
    padding: 6,
    borderRadius: 20,
  },

  temp: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
