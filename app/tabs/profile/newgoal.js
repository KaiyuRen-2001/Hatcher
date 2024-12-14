import { StyleSheet, View, TextInput, Image, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
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
      category: selected,
      confidence: sliderValue,
      username: "landay",
    };
    storageAddGoal(newGoal);
    console.log("added goal!");
    router.back();
  };
  return (
    <View style={styles.container}>
      <View style={styles.nameBox}>
        <Text style={styles.nameTitle}>Name</Text>
        <TextInput
          placeholder="Insert a name for your goal"
          placeholderTextColor={Theme.colors.textSecondary}
          style={styles.goalNameInputText}
          onChangeText={onChangeTextName}
          value={textName}
        />
      </View>
      <View style={styles.catagoryBox}>
        <Text style={styles.nameTitle}>Category</Text>
        <SelectList
          placeholder="Select a category for your goal"
          boxStyles={styles.categoriesSelectListBox}
          dropdownStyles={styles.categoriesSelectListList}
          inputStyles={styles.categoriesInputStyles}
          dropdownTextStyles={styles.categoriesDropDownText}
          arrowicon={
            <FontAwesome
              name="chevron-down"
              size={Theme.sizes.iconSmall}
              color={Theme.colors.iconSecondary}
            />
          }
          searchicon={
            <FontAwesome
              name="search"
              size={Theme.sizes.iconSmall}
              color={Theme.colors.iconSecondary}
            />
          }
          closeicon={
            <FontAwesome
              name="close"
              size={Theme.sizes.iconSmall}
              color={Theme.colors.iconSecondary}
            />
          }
          setSelected={(val) => setSelected(val)}
          data={formattedCategories}
          save="value"
        />
      </View>
      <Image
        style={styles.eggPicture}
        resizeMode="contain"
        source={images[sliderValue]}
      ></Image>
      <Text style={styles.confidenceText}>Adjust your confidence level</Text>
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
  catagoryBox: {
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  categoriesDropDownText: {
    color: Theme.colors.textDark,
  },
  categoriesInputStyles: {
    marginTop: 3,
    color: Theme.colors.textDark,
  },
  nameBox: {
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  nameTitle: {
    color: Theme.colors.textPrimary,
    fontSize: Theme.sizes.textLarge,
    fontWeight: "bold",
    marginBottom: 8,
  },
  confidenceText: {
    fontSize: Theme.sizes.textLarge,
    color: Theme.colors.textPrimary,
    marginBottom: 0,
  },
  goalNameInputText: {
    height: 50,
    width: "80%",
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
  },
  categoriesSelectListList: {
    width: "80%",
    backgroundColor: Theme.colors.backgroundWhite,
    color: Theme.colors.textDark,
    marginTop: 50,
    position: "absolute",
    zIndex: 999,
    borderWidth: 2,
    borderColor: Theme.colors.iconSecondary,
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
    marginTop: 5,
    marginBottom: 15,
  },
  addGoalButton: {
    marginBottom: 20,
  },
});
