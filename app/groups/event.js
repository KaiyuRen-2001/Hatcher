import { StyleSheet, View, Text } from "react-native";
import { Stack } from "expo-router";
import { useContext } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import EvilIcons from "@expo/vector-icons/EvilIcons";

import Tag from "@/components/Tag";
import Theme from "@/assets/theme";
import { GoalsContext } from "@/components/storageContext";
import DateTimeDisplay from "@/components/DateTimeDisplay";
import Button from "@/components/Button";
import useSession from "@/utils/useSession";

export default function GoalDetails() {
  const router = useRouter();
  const session = useSession();
  const { id, title, description, location, date, time, groupName } =
    useLocalSearchParams();
  const { removeUserFromEvent, addUserToEvent, events } =
    useContext(GoalsContext);

  const userRSVP = () => {
    return events.reduce((acc, event) => {
      if (acc) {
        return true;
      }

      if (event.id == id && event.members.includes("landay")) {
        return true;
      }

      return false;
    }, false);
  };

  const isUserRSVPed = userRSVP();

  const onPress = () => {
    if (isUserRSVPed) {
      removeUserFromEvent(id, session.user.username);
      console.log("user removed from event");
    } else {
      addUserToEvent(id, session.user.username);
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Event",
          headerBackTitle: "Back",
          headerTintColor: Theme.colors.textPrimary,
        }}
      />
      <Text style={styles.name}>{title}</Text>
      <View style={styles.catagory}>
        <Tag style={styles.groupTag} title={groupName} />
        <Tag
          title={location}
          icon={
            <EvilIcons
              name="location"
              size={Theme.sizes.iconSmall}
              color={Theme.colors.iconPrimary}
            />
          }
        />
      </View>
      <DateTimeDisplay
        style={styles.dateTime}
        date={date}
        time={time}
        textMonth={50}
        textDay={62}
        textTime={24}
      />
      <Text style={styles.confidenceText}>{description}</Text>
      <Button
        title={isUserRSVPed ? "Un-RSVP" : "RSVP"}
        onPress={onPress}
        style={styles.saveButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    height: "100%",
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  groupTag: {
    margin: "auto",
    marginBottom: 8,
    backgroundColor: Theme.colors.textHighlighted,
  },
  saveButton: {
    marginTop: 8,
  },
  confidenceText: {
    fontSize: Theme.sizes.textLarge,
    color: Theme.colors.textPrimary,
    marginBottom: 8,
    marginHorizontal: 32,
  },
  textAndSlider: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "blue",
    paddingBottom: 32,
    marginTop: "auto",
  },
  dateTime: {
    height: "30%",
    aspectRatio: 0.8,
    margin: 32,
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
