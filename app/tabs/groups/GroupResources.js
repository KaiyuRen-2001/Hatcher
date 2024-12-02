import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TextInput,
  Pressable,
} from "react-native";
import Theme from "@/assets/theme";
import FeedDetails from "@/app/tabs/explore/details";

export default function Resources(props) {
  const events = props.events;

  return (
    <View style={styles.container}>
      <Text>Resources page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.backgroundPrimary,
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
  },
  infoText: {
    fontFamily: "Inter",
    fontSize: Theme.sizes.textSmall,
    color: Theme.colors.textSecondary,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: Theme.colors.textSecondary,
    marginTop: 8,
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
  },

  pressableContainer: {
    backgroundColor: Theme.colors.backgroundSecondary,
    borderRadius: 20,
    padding: 9,
    flexDirection: "row",
    alignItems: "center",
  },
  pressableText: {
    fontSize: Theme.sizes.textSmall,
    color: Theme.colors.textDark,
    fontFamily: "Inter",
  },

  notJoinedContainer: {
    backgroundColor: Theme.colors.backgroundSecondary,
    borderRadius: 50,
    padding: 9,
  },

  joinedContainer: {
    padding: 6,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Theme.colors.backgroundSecondary,
  },
});
