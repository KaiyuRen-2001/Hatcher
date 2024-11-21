import { StyleSheet, Text, Pressable } from "react-native";

import Theme from "@/assets/theme";

export default function Button({ diasabled, onPress, title, style }) {
  return (
    <Pressable
      disabled={diasabled}
      style={({ pressed }) => [
        {
          backgroundColor: diasabled
            ? Theme.colors.backgroundSecondary
            : pressed
            ? Theme.colors.textTertiary
            : Theme.colors.iconHighlighted,
        },
        styles.saveButton,
        style,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          {
            color: diasabled
              ? Theme.colors.textSecondary
              : Theme.colors.textPrimary,
          },
          styles.saveButtonText,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  saveButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
});
