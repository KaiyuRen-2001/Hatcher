import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import Theme from "@/assets/theme";

export default function Tag({ title, icon }) {
  return (
    <View style={styles.container}>
      {icon && icon}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderStyle: "solid",
    alignItems: "center",
    borderWidth: 1,
    padding: 4,
    paddingHorizontal: 8,
    marginRight: "auto",
    borderColor: Theme.colors.iconSecondary,
    borderRadius: 8,
  },
  title: {
    paddingLeft: 4,
    color: Theme.colors.textPrimary,
    fontSize: Theme.sizes.textMedium,
  },
});
