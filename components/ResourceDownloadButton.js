import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import * as Linking from "expo-linking";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Theme from "@/assets/theme";

export default function ResourceDownloadButton({ resourceUrl }) {
  const handlePress = async () => {
    try {
      // Check if the URL can be opened
      const supported = await Linking.canOpenURL(resourceUrl);

      if (supported) {
        await Linking.openURL(resourceUrl); // Open the URL
      } else {
        Alert.alert("Error", "The URL is not supported.");
      }
    } catch (err) {
      console.error("Error opening URL:", err);
      Alert.alert("Error", "Something went wrong while opening the link.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <FontAwesome
          size={Theme.sizes.iconMedium}
          name="link"
          color={Theme.colors.iconPrimary}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.iconHighlighted,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginRight: 8,
    borderRadius: 20,
    aspectRatio: 1,
    width: 80,
  },
});
