import { StyleSheet, View, TextInput, Switch, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Theme from "@/assets/theme";
import Slider from "@react-native-community/slider";
import { useState, useContext } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { GoalsContext } from "@/components/storageContext";
import Button from "@/components/Button";
import { useRouter } from "expo-router";

export default function CreatGroupPage() {
  const router = useRouter();
  const { storageUpdateCategories, categories, storageAddGoal } =
    useContext(GoalsContext);

  const [title, onChangeTitle] = useState("");
  const [description, onChangeDescription] = useState("");
  const [location, onChangeLocation] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [rules, onChangeRules] = useState(false);
  const [selected, setSelected] = useState("");

  const disableAdd =
    title.trim() === "" || selected === "" || description.trim() === "";

  const formattedCategories = categories.map((category) => ({
    label: category,
    value: category,
  }));

  const createGroup = () => {
    /*const newGoal = {
      name: textName,
      catagory: selected,
      confidence: sliderValue,
    };
    storageAddGoal(newGoal);
    console.log("added goal!");
    router.back();*/
  };
  return (
    <View style={styles.container}>
      <View style={styles.nameBox}>
        <Text style={styles.nameTitle}>Title</Text>
        <TextInput
          placeholder="Insert a name for your goal"
          placeholderTextColor={Theme.colors.textSecondary}
          style={styles.goalNameInputText}
          onChangeText={onChangeTitle}
          value={title}
        />
      </View>
      <View style={styles.nameBox}>
        <Text style={styles.nameTitle}>Description</Text>
        <TextInput
          placeholder="Insert a name for your goal"
          placeholderTextColor={Theme.colors.textSecondary}
          style={styles.goalNameInputText}
          onChangeText={onChangeDescription}
          value={description}
        />
      </View>
      <View style={styles.catagoryBox}>
        <Text style={styles.nameTitle}>Category</Text>
        <SelectList
          placeholder="Select a category for your group"
          boxStyles={styles.categoriesSelectListBox}
          dropdownStyles={styles.categoriesSelectListList}
          inputStyles={styles.categoriesInputStyles}
          dropdownTextStyles={styles.categoriesDropDownText}
          arrowicon={
            <FontAwesome
              name="chevron-down"
              size={Theme.sizes.iconSmall}
              color={Theme.colors.textDark}
            />
          }
          searchicon={
            <FontAwesome
              name="search"
              size={Theme.sizes.iconSmall}
              color={Theme.colors.textDark}
            />
          }
          closeicon={
            <FontAwesome
              name="close"
              size={Theme.sizes.iconSmall}
              color={Theme.colors.textDark}
            />
          }
          setSelected={(val) => setSelected(val)}
          data={formattedCategories}
          save="value"
        />
      </View>
      <View style={styles.locAndToggle}>
        <View style={styles.locationBox}>
          <Text style={styles.nameTitle}>Location</Text>
          <TextInput
            placeholder="Group Location"
            placeholderTextColor={Theme.colors.textSecondary}
            style={styles.goalNameInputText}
            onChangeText={onChangeLocation}
            value={location}
          />
        </View>
        <View>
          <Text style={styles.nameTitle}>Public</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isPublic ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setIsPublic((p) => !p)}
            value={isPublic}
          />
        </View>
      </View>
      <View style={styles.nameBox}>
        <Text style={styles.nameTitle}>Rules</Text>
        <TextInput
          placeholder="Insert rules for your group"
          placeholderTextColor={Theme.colors.textSecondary}
          style={styles.goalNameInputText}
          onChangeText={onChangeRules}
          value={rules}
        />
      </View>
      <Button
        diasabled={disableAdd}
        onPress={createGroup}
        title={"Create Group"}
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
  locationBox: {
    width: "60%",
  },
  locAndToggle: {
    display: "flex",
    flexDirection: "row",
    marginTop: 8,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  catagoryBox: {
    marginTop: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 8,
  },
  categoriesDropDownText: {
    color: Theme.colors.textDark,
  },
  categoriesInputStyles: {
    marginTop: 3,
    color: Theme.colors.textDark,
  },
  nameBox: {
    marginTop: 8,
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
    marginBottom: 8,
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
  addGoalButton: {
    marginTop: "auto",
    marginBottom: 20,
  },
});