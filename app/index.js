import "@/gesture-handler";
import { Redirect } from "expo-router";
import { Platform, UIManager } from "react-native";

if (Platform.OS === "android") {
  // eslint-disable-next-line no-unused-expressions
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
  return <Redirect href="/tabs" />;
}
