import { StyleSheet, View, TextInput } from "react-native";
import Theme from "@/assets/theme";
import Slider from "@react-native-community/slider";
import { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";

export default function NewGoal() {
  const [textName, onChangeTextName] = useState("your goal here");
  const data = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
    { label: "Item 3", value: "3" },
    { label: "Item 4", value: "4" },
    { label: "Item 5", value: "5" },
    { label: "Item 6", value: "6" },
    { label: "Item 7", value: "7" },
    { label: "Item 8", value: "8" },
  ];
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.goalNameInputText}
        onChangeText={onChangeTextName}
        value={textName}
      />
      <SelectList
        setSelected={(val) => setSelected(val)}
        data={data}
        save="value"
      />
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
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
});
