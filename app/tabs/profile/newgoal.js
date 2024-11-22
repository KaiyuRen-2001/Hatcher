import { StyleSheet, View, TextInput, Image } from "react-native";
import Theme from "@/assets/theme";
import Slider from "@react-native-community/slider";
import { useState, useContext } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import Tag from "@/components/Tag";
import getImages from "@/utils/images";
import { GoalsContext } from "@/components/storageContext";
import Button from "@/components/Button";
import { useRouter } from "expo-router";

export default function NewGoal() {
  const router = useRouter();
  const { storageUpdateCategories, categories, storageAddGoal } =
    useContext(GoalsContext);

  const [sliderValue, setSliderValue] = useState(0);
  const images = getImages();
  const [textName, onChangeTextName] = useState("");
  const [selected, setSelected] = useState("");

  const disableAdd = textName.trim() === "" || selected === "";

  const formattedCategories = categories.map((category) => ({
    label: category,
    value: category,
  }));

  const onValueChange = (val) => {
    setSliderValue(val);
  };

  const addGoal = () => {
    const newGoal = {
      name: textName,
      catagory: selected,
      confidence: sliderValue,
    };
    storageAddGoal(newGoal);
    console.log("added goal!");
    router.back();
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="goal name"
        style={styles.goalNameInputText}
        onChangeText={onChangeTextName}
        value={textName}
      />
      <SelectList
        boxStyles={styles.categoriesSelectListBox}
        dropdownStyles={styles.categoriesSelectListList}
        setSelected={(val) => setSelected(val)}
        data={formattedCategories}
        save="value"
      />
      <Image
        style={styles.eggPicture}
        resizeMode="contain"
        source={images[sliderValue]} // TODO do not hard code
      ></Image>
      <Slider
        style={styles.eggSlider}
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
        diasabled={disableAdd}
        onPress={addGoal}
        title={"Add Goal"}
        style={styles.addGoalButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  goalNameInputText: {
    height: 50,
    width: "80%",
    marginTop: 50,
    marginBottom: 30,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Theme.colors.backgroundWhite,
    borderColor: Theme.colors.textPrimary,
    color: Theme.colors.textDark,
  },
  categoriesSelectListBox: {
    height: 50,
    width: "80%",
    backgroundColor: Theme.colors.backgroundWhite,
    color: Theme.colors.textDark,
  },
  categoriesSelectListList: {
    width: "80%",
    backgroundColor: Theme.colors.backgroundWhite,
    color: Theme.colors.textDark,
  },
  eggPicture: {
    height: "40%",
    aspectRatio: 1,
    marginHorizontal: "auto",
    marginTop: 20,
    padding: 32,
  },
  eggSlider: {
    width: 300,
    height: 40,
    marginVertical: 20,
  },
  addGoalButton: {
    marginTop: 70,
    marginBottom: 20,
  },
});
