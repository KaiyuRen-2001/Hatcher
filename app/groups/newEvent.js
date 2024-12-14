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
import DateTimePicker from "@react-native-community/datetimepicker";

export default function NewEvent() {
  const router = useRouter();
  const route = useRoute();
  const session = useSession();
  const { storageAddEvent } = useContext(GoalsContext);
  const { groupName } = route.params;

  const [title, onChangeTitle] = useState("");
  const [description, onChangeDescription] = useState("");
  const [month, onChangeMonth] = useState("");
  const [day, onChangeDay] = useState("");
  const [year, onChangeYear] = useState("");
  const [loc, onChangeLoc] = useState("");
  const [time, onChangeTime] = useState("");
  const [sqlTime, setSqlTime] = useState("");
  const [showTimePicker, setShowTimePicker] = useState(false);

  const disableAdd =
    title.trim() === "" ||
    description.trim() === "" ||
    month.trim() === "" ||
    day.trim() === "" ||
    year.trim() === "" ||
    loc.trim() === "" ||
    time.trim() === "";

  const createEvent = () => {
    storageAddEvent(
      title,
      description,
      month,
      day,
      year,
      sqlTime,
      loc,
      groupName
    );
    router.back();
  };

  // Function to handle time selection
  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false); // Close the picker
    if (selectedTime) {
      const hours = selectedTime.getHours();
      const minutes = String(selectedTime.getMinutes()).padStart(2, "0");
      const seconds = "00"; // Default seconds to 00

      // Adjust hours for 24-hour format if necessary
      const formattedHours = String(hours).padStart(2, "0");

      // Final SQL-compatible time string
      const formattedSqlTime = `${formattedHours}:${minutes}:${seconds}`;
      console.log("formattedTime is ", formattedSqlTime);
      setSqlTime(formattedSqlTime);

      const formattedTime = selectedTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      onChangeTime(formattedTime);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: "New Event",
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
            placeholder="Insert a description for your event"
            multiline={true}
            returnKeyType={"send"}
            placeholderTextColor={Theme.colors.textSecondary}
            style={styles.rulesInputText}
            onChangeText={onChangeDescription}
            value={description}
          />
        </View>
        <View style={styles.nameBox}>
          <Text style={styles.nameTitle}>Location</Text>
          <TextInput
            placeholder="Enter the event location"
            placeholderTextColor={Theme.colors.textSecondary}
            style={styles.goalNameInputText}
            onChangeText={onChangeLoc}
            value={loc}
          />
        </View>
        <View style={styles.nameBox}>
          <Text style={styles.nameTitle}>Time</Text>
          <TouchableWithoutFeedback onPress={() => setShowTimePicker(true)}>
            <View style={[styles.goalNameInputText, styles.timeTextBox]}>
              <Text style={styles.timeText}>
                {time || "Select Time"}{" "}
                {/* Show selected time or a placeholder */}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          {showTimePicker && (
            <DateTimePicker
              value={new Date()} // Default to current time
              mode="time"
              is24Hour={false} // Toggle 12-hour or 24-hour clock
              display="spinner" // Options: 'default', 'spinner', 'clock'
              onChange={handleTimeChange}
            />
          )}
        </View>
        <View style={styles.locAndToggle}>
          <View style={styles.cityBox}>
            <Text style={styles.nameTitle}>Month</Text>
            <TextInput
              placeholder="MM"
              keyboardType="numeric"
              maxLength={2} // Limit to 2 characters
              placeholderTextColor={Theme.colors.textSecondary}
              style={styles.goalNameInputText}
              onChangeText={onChangeMonth}
              value={month}
            />
          </View>
          <View style={styles.stateBox}>
            <Text style={styles.nameTitle}>Day</Text>
            <TextInput
              placeholder="DD"
              keyboardType="numeric"
              maxLength={2} // Limit to 2 characters
              placeholderTextColor={Theme.colors.textSecondary}
              style={styles.goalNameInputText}
              onChangeText={onChangeDay}
              value={day}
            />
          </View>
          <View style={styles.yearBox}>
            <Text style={styles.nameTitle}>Year</Text>
            <TextInput
              placeholder="YYYY"
              keyboardType="numeric"
              maxLength={4} // Limit to 4 characters
              placeholderTextColor={Theme.colors.textSecondary}
              style={styles.goalNameInputText}
              onChangeText={onChangeYear}
              value={year}
            />
          </View>
        </View>
        <Button
          diasabled={disableAdd}
          onPress={createEvent}
          title={"Create Event"}
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
    //marginTop: "auto",
    //marginBottom: 20,
  },
});
