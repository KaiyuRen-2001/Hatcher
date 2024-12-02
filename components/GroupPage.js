import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TextInput,
  Pressable,
} from "react-native";
import Theme from "@/assets/theme";

export default function Details(props) {
  const group = props.group;

  // Hardcoded chat data with a "sentBy" field
  const [chat, setChat] = useState([
    { id: "1", text: "Welcome to the group, everyone!", sentBy: "other" },
    {
      id: "2",
      text: "Don't forget about the weekly discussion on Friday.",
      sentBy: "me",
    },
    { id: "3", text: "Any tips for new members?", sentBy: "other" },
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

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.groupName}>{group.name}</Text>
        <Button title="Join" onPress={() => alert("Joined the group!")} />
      </View>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>{group.members.length} members</Text>
        <Text style={styles.infoText}>Admins: {group.admins.join(", ")}</Text>
        <Text style={styles.infoText}>Location: {group.location}</Text>
        <Text style={styles.description}>{group.description}</Text>
      </View>

      <View style={styles.resourcesContainer}>
        <Pressable
          onPress={() => alert("q & a")}
          style={styles.pressableContainer}
        >
          <Text> Q & A </Text>
        </Pressable>

        <Pressable
          onPress={() => alert("resources")}
          style={styles.pressableContainer}
        >
          <Text> Resources </Text>
        </Pressable>
      </View>

      {/* Chat Section */}
      <View style={styles.chatContainer}>
        <FlatList
          data={chat}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.chatList}
          inverted // To show the newest message at the bottom
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
      </View>
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
    fontWeight: "bold",
    color: Theme.colors.textPrimary,
  },
  infoContainer: {
    padding: 16,
  },
  infoText: {
    fontFamily: "PTSansCaption",
    fontSize: Theme.sizes.textMedium,
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
    padding: 8,
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
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  pressableText: {
    color: Theme.colors.white,
    fontFamily: "Poppins_400Regular",
  },
});
