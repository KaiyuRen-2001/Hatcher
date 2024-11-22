import { StyleSheet, View, Text, Image } from "react-native";
import { useState, useContext } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Slider from "@react-native-community/slider";

import Tag from "@/components/Tag";
import Theme from "@/assets/theme";
import getImages from "@/utils/images";
import { GoalsContext } from "@/components/storageContext";
import Button from "@/components/Button";

export default function GoalDetails() {
  const router = useRouter();
  const { id, name, catagory, confidence } = useLocalSearchParams();
  const { storageUpdateGoal } = useContext(GoalsContext);
  // parsed to float
  const confidenceN = parseFloat(confidence);
  //console.log(confidence);

  const [currentConfidence, setCurrentConfidence] = useState(confidenceN);
  const [sliderValue, setSliderValue] = useState(confidenceN);
  const diasableSave = Boolean(sliderValue == currentConfidence);
  const images = getImages();

  const onValueChange = (val) => {
    setSliderValue(val);
  };

  const updateConfidence = () => {
    setCurrentConfidence(sliderValue);

    const newGoal = {
      id: id,
      name: name,
      catagory: catagory,
      confidence: sliderValue,
    };

    storageUpdateGoal(newGoal);
    console.log("confidence updated");
    router.back();
  };

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
        source={images[sliderValue]} // TODO do not hard code
      ></Image>
      <View style={styles.textAndSlider}>
        <Text style={styles.confidenceText}>Adjust your confidence level</Text>
        <Slider
          style={{ width: 300, height: 40 }}
          minimumValue={0}
          maximumValue={3}
          step={1}
          value={sliderValue}
          onValueChange={onValueChange}
          minimumTrackTintColor={Theme.colors.iconHighlighted}
          maximumTrackTintColor={Theme.colors.iconPrimary}
          thumbTintColor={Theme.colors.iconHighlighted}
        />
        <Button
          diasabled={diasableSave}
          onPress={updateConfidence}
          title={"Save"}
          style={styles.saveButton}
        />
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
  saveButton: {
    marginTop: 8,
  },
  confidenceText: {
    fontSize: Theme.sizes.textLarge,
    color: Theme.colors.textPrimary,
    marginBottom: 8,
  },
  textAndSlider: {
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 32,
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
