import { StyleSheet, View } from "react-native";
import Theme from "@/assets/theme";

export default function NewGoal() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Theme.colors.backgroundPrimary,
  },
});
