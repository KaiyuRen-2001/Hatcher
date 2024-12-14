import {
  StyleSheet,
  View,
  TextInput,
  Switch,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Theme from "@/assets/theme";
import Slider from "@react-native-community/slider";
import { useState, useContext } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { GoalsContext } from "@/components/storageContext";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import useSession from "@/utils/useSession";

export default function CreatGroupPage() {
  const router = useRouter();
  const session = useSession();
  const { groups, categories, storageAddGroup } = useContext(GoalsContext);

  const [title, onChangeTitle] = useState("");
  const [description, onChangeDescription] = useState("");
  const [city, onChangeCity] = useState("");
  const [state, onChangeState] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [rules, onChangeRules] = useState("");
  const [selected, setSelected] = useState("");

  const disableAdd =
    title.trim() === "" ||
    selected === "" ||
    description.trim() === "" ||
    city.trim() === "" ||
    state.trim() === "" ||
    selected.trim() === "" ||
    rules.trim() === "";

  const formattedCategories = categories.map((category) => ({
    label: category,
    value: category,
  }));

  const createGroup = () => {
    const groupNames = groups.map((g) => g.name);

    if (groupNames.includes(title)) {
      Alert.alert(
        "Cannot Create Group",
        "This group already exists. Please give your group a different name.",
        [
          {
            text: "Ok",
            style: "cancel",
          },
        ],
        { cancelable: true }
      );
      return;
    }

    storageAddGroup(
      title,
      city,
      state,
      description,
      session.user.username,
      rules
    );
    const group = {
      admins: [session.user.username],
      description: description,
      //groupId: 50,
      location: `${city}, ${state}`,
      members: [session.user.username],
      name: title,
      norms: [rules],
    };
    const navigationPayload = {
      pathname: "/groups/newgroup",
      params: { group: JSON.stringify(group) },
    };
    console.log("navigation payload: ", navigationPayload);
    router.back();
    router.push(navigationPayload);
  };
  return (
    // <KeyboardAvoidingView style={styles.keyboardContainer}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.nameBox}>
          <Text style={styles.nameTitle}>Title</Text>
          <TextInput
            placeholder="Insert a name for your group"
            placeholderTextColor={Theme.colors.textSecondary}
            style={styles.goalNameInputText}
            onChangeText={onChangeTitle}
            value={title}
          />
        </View>
        <View style={styles.nameBox}>
          <Text style={styles.nameTitle}>Description</Text>
          <TextInput
            placeholder="What sort of community is your group?"
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
          <View style={styles.cityBox}>
            <Text style={styles.nameTitle}>City</Text>
            <TextInput
              placeholderTextColor={Theme.colors.textSecondary}
              style={styles.goalNameInputText}
              onChangeText={onChangeCity}
              value={city}
            />
          </View>
          <View style={styles.stateBox}>
            <Text style={styles.nameTitle}>State</Text>
            <TextInput
              placeholderTextColor={Theme.colors.textSecondary}
              style={styles.goalNameInputText}
              onChangeText={onChangeState}
              value={state}
            />
          </View>
          <View>
            <Text style={styles.nameTitle}>
              {isPublic ? "Public" : "Private"}
            </Text>
            <Switch
              trackColor={{
                false: Theme.colors.textDark,
                true: Theme.colors.textDark,
              }}
              ios_backgroundColor={Theme.colors.textDark}
              thumbColor={"#ffffff"}
              onValueChange={() => setIsPublic((p) => !p)}
              value={isPublic}
            />
          </View>
        </View>
        <View style={styles.nameBox}>
          <Text style={styles.nameTitle}>Rules</Text>
          <TextInput
            placeholder="Insert rules for your group"
            multiline={true}
            returnKeyType={"send"}
            placeholderTextColor={Theme.colors.textSecondary}
            style={styles.rulesInputText}
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
    </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  cityBox: {
    width: "40%",
  },
  stateBox: {
    width: "20%",
    marginRight: 16,
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
    marginVertical: 0,
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
    paddingHorizontal: 15,
    backgroundColor: Theme.colors.backgroundWhite,
    borderColor: Theme.colors.textPrimary,
    color: Theme.colors.textDark,
  },
  rulesInputText: {
    height: 100,
    width: "80%",
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
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
