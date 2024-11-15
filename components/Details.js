import { useState } from "react";
import {
  StyleSheet,
  Platform,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import db from "@/database/db";
import useSession from "@/utils/useSession";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import Theme from "@/assets/theme";
import Post from "@/components/Post";
import CommentFeed from "@/components/CommentFeed";

export default function Details() {
  const { id, username, timestamp, text, score, commentCount, vote } =
    useLocalSearchParams();
  const session = useSession();

  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitComment = async () => {
    setIsLoading(true);

    const comment = {
      post_id: id,
      username: "Anonymous",
      text: inputText,
      user_id: session.user.id,
    };

    await db.from("comments").upsert(comment);

    setIsLoading(false);
    setInputText("");
    Keyboard.dismiss();
  };

  const submitDisabled = isLoading || inputText.length === 0;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Comments",
          headerBackTitle: "Back",
          headerTintColor: Theme.colors.textPrimary,
        }}
      />
      <Post
        id={id}
        username={username}
        timestamp={timestamp}
        text={text}
        score={score}
        vote={vote}
        commentCount={commentCount}
      />
      {/* This component pushes up the view when the keyboard is open so that it's still visible. */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 65 : 0}
        style={styles.keyboardContainer}
      >
        <CommentFeed postId={id} />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder={"Write a comment..."}
            placeholderTextColor={Theme.colors.textSecondary}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => submitComment()}
            disabled={submitDisabled}
          >
            <FontAwesome
              size={24}
              name="send"
              color={
                submitDisabled
                  ? Theme.colors.iconSecondary
                  : Theme.colors.iconHighlighted
              }
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  keyboardContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    padding: 8,
    alignItems: "center",
  },
  input: {
    paddingLeft: 12,
    marginRight: 8,
    height: 48,
    borderRadius: 24,
    color: Theme.colors.textPrimary,
    backgroundColor: Theme.colors.backgroundSecondary,
    flex: 1,
  },
  sendButton: {
    padding: 4,
  },
});
