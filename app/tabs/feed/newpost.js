import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Platform } from "react-native";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

import Theme from "@/assets/theme";
import db from "@/database/db";
import useSession from "@/utils/useSession";

export default function NewPost() {
  const session = useSession();
  const router = useRouter();

  const [username, setUsername] = useState(null);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitPost = async () => {
    setIsLoading(true);

    const post = {
      username: username ? username : "Anonymous",
      text: inputText,
      user_id: session.user.id,
    };

    await db.from("posts").upsert(post);

    setIsLoading(false);
    router.back();
  };

  const submitDisabled = isLoading || inputText.length === 0;

  const submitButtonTextColor = {
    color: submitDisabled
      ? Theme.colors.iconSecondary
      : Theme.colors.textHighlighted,
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "New Post",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={styles.submitButton}
              disabled={submitDisabled}
              onPress={submitPost}
            >
              <Text
                style={{ ...submitButtonTextColor, ...styles.submitButtonText }}
              >
                Submit
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.nameInputContainer}>
        <Text style={styles.nameInputPrompt}>Post as:</Text>
        <TextInput
          style={styles.nameInput}
          value={username}
          onChangeText={setUsername}
          placeholder={"Anonymous"}
          placeholderTextColor={Theme.colors.textTertiary}
        />
      </View>
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={setInputText}
        placeholder={"What do you want to share?"}
        placeholderTextColor={Theme.colors.textSecondary}
        multiline
        textAlignVertical="top"
        autoFocus
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cancelButtonText: {
    fontSize: Theme.sizes.textMedium,
    color: Theme.colors.iconSecondary,
  },
  submitButtonText: {
    fontSize: Theme.sizes.textMedium,
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  nameInputContainer: {
    width: "100%",
    padding: 16,
    gap: 8,
  },
  nameInputPrompt: {
    color: Theme.colors.textPrimary,
  },
  nameInput: {
    color: Theme.colors.textSecondary,
  },
  headerButtonTextPrimary: {
    fontSize: 18,
    color: Theme.colors.textHighlighted,
  },
  input: {
    color: Theme.colors.textPrimary,
    backgroundColor: Theme.colors.backgroundSecondary,
    flex: 1,
    width: "100%",
    padding: 16,
  },
});
