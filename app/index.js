import "@/gesture-handler";
import { useCallback } from "react";
import { Redirect } from "expo-router";
import { Platform, UIManager, View } from "react-native";
import { useFonts } from "expo-font";

if (Platform.OS === "android") {
  // eslint-disable-next-line no-unused-expressions
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
  const [fontsLoaded] = useFonts({
    PTSansCaption: require("../assets/fonts/PTSansCaption-Regular.ttf"),
    "PTSansCaption-Bold": require("../assets/fonts/PTSansCaption-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null; // Don't mind/edit the code above; it's there to load the font for you!

  return (
    <View onLayout={onLayoutRootView}>
      <Redirect href="/tabs" />
    </View>
  );
}
