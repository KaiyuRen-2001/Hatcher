import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import * as Linking from "expo-linking";

export default function ResourceDownloadButton() {
  const [actionType, setActionType] = useState("openLink"); // Only handle openLink action

  const handlePress = async () => {
    if (actionType === "openLink") {
      try {
        // Define the URL dynamically (this could come from props, state, or any other dynamic source)
        const url = "https://www.netflix.com/"; // Replace with your dynamic URL

        // Check if the URL can be opened
        const supported = await Linking.canOpenURL(url);

        if (supported) {
          await Linking.openURL(url); // Open the URL
        } else {
          Alert.alert("Error", "The URL is not supported.");
        }
      } catch (err) {
        console.error("Error opening URL:", err);
        Alert.alert("Error", "Something went wrong while opening the link.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.primaryButton}>
        <Text style={styles.buttonText}>Go to Link</Text>
      </TouchableOpacity>

      {/* Optional button to toggle between different actions */}
      <TouchableOpacity
        onPress={() =>
          setActionType(actionType === "openLink" ? "openLink" : "openLink")
        }
        style={styles.toggleButton}
      >
        <Text style={styles.buttonText}>Link Navigation</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  primaryButton: {
    padding: 15,
    backgroundColor: "blue",
    borderRadius: 5,
    marginBottom: 20,
  },
  toggleButton: {
    padding: 10,
    backgroundColor: "green",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
