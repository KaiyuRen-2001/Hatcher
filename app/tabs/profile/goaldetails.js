import { StyleSheet, View, Text, Image, Button } from "react-native";
import { useLocalSearchParams } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Slider from "@react-native-community/slider";

import Tag from "@/components/Tag";
import Theme from "@/assets/theme";

export default function GoalDetails() {
  const { name, catagory, confidence } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.catagory}>
        <Tag
          title={catagory}
          icon={
            <FontAwesome
              name="files-o"
              size={Theme.sizes.iconSmall}
              color={Theme.colors.iconPrimary}
            />
          }
        />
      </View>
      <Image
        style={styles.eggPicture}
        resizeMode="contain"
        source={require("@/assets/confidence3.png")} // TODO do not hard code
      ></Image>
      <View style={styles.textAndSlider}>
        <Text style={styles.confidenceText}>Adjust your confidence level</Text>
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
        <Button title="Save" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  confidenceText: {
    fontSize: Theme.sizes.textMedium,
    color: Theme.colors.textPrimary,
  },
  textAndSlider: {
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 16,
  },
  eggPicture: {
    height: "40%",
    aspectRatio: 1,
    margin: "auto",
    padding: 32,
  },
  name: {
    color: Theme.colors.textPrimary,
    fontWeight: "bold",
    fontSize: Theme.sizes.textExtraLarge,
    paddingTop: 32,
  },
  catagory: {
    paddingTop: 8,
  },
});
