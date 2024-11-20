import { StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Theme from "@/assets/theme";

export default function GoalDetails() {
  const { name, catagory, confidence } = useLocalSearchParams();

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Theme.colors.backgroundPrimary,
  },
});
