import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import Theme from "@/assets/theme";

export default function Tag({ title, icon, style }) {
  return (
    <View style={[styles.container, style]}>
      {icon && icon}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderStyle: "none",
    alignItems: "center",
    padding: 4,
    paddingHorizontal: 8,
    marginRight: "auto",
    backgroundColor: Theme.colors.backgroundSecondary,
    borderRadius: 8,
  },
  title: {
    paddingLeft: 4,
    color: Theme.colors.textPrimary,
    fontSize: Theme.sizes.textMedium,
  },
});
