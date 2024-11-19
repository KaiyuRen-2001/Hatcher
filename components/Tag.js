import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import Theme from "@/assets/theme";

export default function Tag({ title, icon }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderStyle: "solid",
    borderWidth: 1,
    padding: 2,
    paddingLeft: 8,
    borderColor: Theme.colors.iconSecondary,
    borderRadius: 8,
  },
  title: {
    color: Theme.colors.textPrimary,
    fontSize: Theme.sizes.textMedium,
  },
});
