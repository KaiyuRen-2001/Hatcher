import {
  StyleSheet,
  View,
  TextInput,
  Switch,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Stack } from "expo-router";
import Theme from "@/assets/theme";
import Slider from "@react-native-community/slider";
import { useState, useContext } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { GoalsContext } from "@/components/storageContext";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { useRoute } from "@react-navigation/native";
import useSession from "@/utils/useSession";

export default function NewResource() {
  const router = useRouter();
  const route = useRoute();
  const session = useSession();
  const { storageAddResource } = useContext(GoalsContext);
  const { groupName } = route.params;

  const [title, onChangeTitle] = useState("");
  const [description, onChangeDescription] = useState("");
  const [link, onChangeLink] = useState("");

  const disableAdd =
    title.trim() === "" || description.trim() === "" || link.trim() === "";

  const createEvent = () => {
    /*const groupNames = groups.map((g) => g.name);
  
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
      }*/

    storageAddResource(
      title,
      description,
      link,
      groupName,
      session.user.username
    );
    router.back();
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: "New Resource",
            headerBackTitle: "Back",
            headerTintColor: Theme.colors.textPrimary,
          }}
        />
        <View style={styles.nameBox}>
          <Text style={styles.nameTitle}>Title</Text>
          <TextInput
            placeholder="Insert a name for your event"
            placeholderTextColor={Theme.colors.textSecondary}
            style={styles.goalNameInputText}
            onChangeText={onChangeTitle}
            value={title}
          />
        </View>
        <View style={styles.nameBox}>
          <Text style={styles.nameTitle}>Description</Text>
          <TextInput
            placeholder="Insert rules for your group"
            multiline={true}
            returnKeyType={"send"}
            placeholderTextColor={Theme.colors.textSecondary}
            style={styles.rulesInputText}
            onChangeText={onChangeDescription}
            value={description}
          />
        </View>
        <View style={styles.nameBox}>
          <Text style={styles.nameTitle}>Link</Text>
          <TextInput
            placeholder="Enter the resource link"
            placeholderTextColor={Theme.colors.textSecondary}
            style={styles.goalNameInputText}
            onChangeText={onChangeLink}
            value={link}
          />
        </View>
        <Button
          diasabled={disableAdd}
          onPress={createEvent}
          title={"Create Resource"}
          style={styles.addGoalButton}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  cityBox: {
    width: "30%",
  },
  yearBox: {
    width: "30%",
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
    alignItems: "center",
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
  timeTextBox: {
    width: "40%",
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
