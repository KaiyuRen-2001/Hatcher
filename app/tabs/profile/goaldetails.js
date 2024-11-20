import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Slider from "@react-native-community/slider";

import Tag from "@/components/Tag";
import Theme from "@/assets/theme";
import { updateGoal } from "@/database/db";
import getImages from "@/utils/images";

export default function GoalDetails() {
  const { id, name, catagory, confidence } = useLocalSearchParams();
  const [currentConfidence, setCurrentConfidence] = useState(confidence);
  const [sliderValue, setSliderValue] = useState(confidence);
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

    updateGoal(newGoal);
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
        <Pressable
          disabled={diasableSave}
          style={({ pressed }) => [
            {
              backgroundColor: diasableSave
                ? Theme.colors.backgroundSecondary
                : pressed
                ? Theme.colors.textTertiary
                : Theme.colors.iconHighlighted,
            },
            styles.saveButton,
          ]}
          onPress={updateConfidence}
        >
          <Text
            style={[
              {
                color: diasableSave
                  ? Theme.colors.textSecondary
                  : Theme.colors.textPrimary,
              },
              styles.saveButtonText,
            ]}
          >
            Save
          </Text>
        </Pressable>
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
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
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
