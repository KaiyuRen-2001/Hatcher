import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import Tag from "@/components/Tag";
import DateTimeDisplay from "@/components/DateTimeDisplay";
import Theme from "@/assets/theme";
import ResourceDownloadButton from "./ResourceDownloadButton";

export default function Resource({
  id,
  groupName,
  userName,
  title,
  description,
  date,
  time,
  resourceUrl,
}) {
  console.log("resource loaded: ", title);
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.name}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.userDateTime}>
          <Tag
            title={userName}
            icon={
              <FontAwesome
                size={Theme.sizes.iconSmall}
                name="user"
                color={Theme.colors.iconPrimary}
              />
            }
          />
          <Text style={styles.dateTime}>{date}</Text>
        </View>
      </View>
      <ResourceDownloadButton resourceUrl={resourceUrl} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 8,
    flexDirection: "row",
    flex: 1,
    gap: 8,
    // borderColor: "blue",
    // borderWidth: 1,
  },
  body: {
    flex: 1,
    //height: 75,
    flexDirection: "column",
    justifyContent: "center",
    // borderColor: "red",
    // borderWidth: 1,
  },
  name: {
    color: Theme.colors.textPrimary,
    fontWeight: "bold",
    fontSize: Theme.sizes.textLarge,
    paddingLeft: 8,
    // borderColor: "green",
    // borderWidth: 1,
  },
  description: {
    color: Theme.colors.textPrimary,
    fontWeight: "normal",
    fontSize: Theme.sizes.textBody,
    paddingLeft: 8,
  },
  userDateTime: {
    paddingHorizontal: 8,
    paddingTop: 4,
    flexDirection: "row",
    alignItems: "center",
    // borderColor: "yellow",
    // borderWidth: 1,
  },
  dateTime: {},
});
