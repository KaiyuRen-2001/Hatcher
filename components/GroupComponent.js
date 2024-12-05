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
import { Stack } from "expo-router";
import Theme from "@/assets/theme";
import Tag from "@/components/Tag";
import { router } from "expo-router";
import { BlurView } from "expo-blur";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function GroupComponent({ group }) {
  const [isInGroup, setIsInGroup] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [chat, setChat] = useState([
    { id: "1", text: "how should i structure my resume?", sentBy: "Andreea" },
    {
      id: "2",
      text: "should i use different fonts and font sizes?",
      sentBy: "Andreea",
    },
    { id: "3", text: "yeah", sentBy: "me" },
    { id: "4", text: "cool thanks!", sentBy: "Andreea" },
    { id: "5", text: "I thought you're not supposed to", sentBy: "Kaiyu" },
    { id: "6", text: "I think it's okay", sentBy: "Zoe" },
    { id: "7", text: "are you sure??", sentBy: "me" },
  ]);

  const [message, setMessage] = useState(""); // State for input field

  const renderMessage = ({ item }) => {
    const isMe = item.sentBy === "me";
    return (
      <View
        style={[
          styles.messageContainer,
          isMe ? styles.sentMessage : styles.receivedMessage,
        ]}
      >
        {!isMe && <Text style={styles.senderText}>{item.sentBy}</Text>}
        <Text style={styles.messageText}>{item.text}</Text>
        <View
          style={[styles.tail, isMe ? styles.sentTail : styles.receivedTail]}
        />
      </View>
    );
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setChat([
        ...chat,
        { id: Date.now().toString(), text: message, sentBy: "me" },
      ]);
      setMessage("");
    }
  };

  const toggleMembership = () => {
    if (isInGroup) {
      Alert.alert(
        "Leave Group",
        "Are you sure you want to leave this group?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Yes, Leave",
            onPress: () => setIsInGroup(false),
          },
        ],
        { cancelable: true }
      );
    } else {
      setIsInGroup(true); // Directly join the group
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: group.name,
          headerBackTitle: "Back",
          headerTintColor: Theme.colors.textPrimary,
        }}
      />
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.groupName}>{group.name}</Text>
        <Pressable
          onPress={toggleMembership}
          style={isInGroup ? styles.joinedContainer : styles.notJoinedContainer}
        >
          <Text style={styles.pressableText}>
            {" "}
            {isAdmin ? "Edit Group" : isInGroup ? "Joined" : "Join"}{" "}
          </Text>
        </Pressable>
      </View>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>{group.members.length} members</Text>
        <View style={styles.temp}>
          <Tag
            title={group.location}
            style={styles.infoText}
            icon={
              <EvilIcons
                name="location"
                size={Theme.sizes.iconSmall}
                color={Theme.colors.iconPrimary}
              />
            }
          />
          <View style={styles.resourcesContainer}>
            <Pressable
              onPress={() => {
                const navigationPayload = {
                  pathname: "/groups/GroupEvents",
                  params: { groupName: group.name },
                };
                //console.log(navigationPayload);
                router.push(navigationPayload);
              }}
              style={styles.pressableContainer}
            >
              <MaterialIcons
                name="event"
                size={32}
                color={Theme.colors.textDark}
              />
              <Text style={styles.infoText}>Events</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                const navigationPayload = {
                  pathname: "/groups/GroupResources",
                  params: { groupName: group.name },
                };
                console.log("in group.js nav payload", navigationPayload);
                router.push(navigationPayload);
              }}
              style={styles.pressableContainer}
            >
              <MaterialIcons
                name="summarize"
                size={32}
                color={Theme.colors.textDark}
              />
              <Text style={styles.infoText}>Resources</Text>
            </Pressable>
            {!isInGroup && (
              <BlurView intensity={10} style={styles.absolute}></BlurView>
            )}
          </View>
        </View>
        <Text style={styles.description}>{group.description}</Text>
      </View>

      {/* Chat Section */}
      <View style={styles.chatContainer}>
        <FlatList
          data={chat}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.chatList}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            placeholderTextColor={Theme.colors.textSecondary}
          />
          <Button title="Send" onPress={handleSendMessage} />
        </View>
        {!isInGroup && (
          <>
            <BlurView intensity={20} style={styles.absolute}></BlurView>

            <Text style={styles.joinGroupText}>
              Join this group to participate in its chat, events, and resources!
            </Text>
          </>
        )}
      </View>
    </View>
  );
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

  adminContainer: {
    borderColor: Theme.colors.backgroundSecondary,
    borderWidth: 3,
    borderRadius: 20,
    padding: 9,
    padding: 6,
    borderRadius: 20,
  },
});
