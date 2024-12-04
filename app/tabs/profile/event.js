import { StyleSheet, View, Text } from "react-native";
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
  const { removeUserFromEvent } = useContext(GoalsContext);

  const onPress = () => {
    removeUserFromEvent(id, session.user.username);
    console.log("user removed from event");
    router.back();
  };

  return (
    <View style={styles.container}>
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
        textMonth={58}
        textDay={64}
        textTime={30}
      />
      <Text style={styles.confidenceText}>{description}</Text>
      <Button title={"Un-RSVP"} onPress={onPress} style={styles.saveButton} />
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
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 32,
    marginTop: "auto",
  },
  dateTime: {
    height: "30%",
    aspectRatio: 1,
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
