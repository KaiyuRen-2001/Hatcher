import { StyleSheet, View } from "react-native";
import Theme from "@/assets/theme";

export default function Details(props) {
  const group = props.group;
  // TODO I think we'll will have to use a react-navigation stack here instead of expo router

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Theme.colors.backgroundPrimary,
  },
});
