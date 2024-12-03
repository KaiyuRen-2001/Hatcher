import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import EvilIcons from "@expo/vector-icons/EvilIcons";

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
  return (
    // <Link
    //   href={{
    //     pathname: "/groups/resource",
    //     params: {
    //       id: id,
    //       title: title,
    //       description: description,
    //       date: date,
    //       time: time,
    //       groupName: groupName,
    //       userName: userName,
    //       resourceUrl: resourceUrl,
    //     },
    //   }}
    //   asChild={true}
    //   style={styles.content}
    // >
    //   <TouchableOpacity style={styles.container}>
    //     <View style={styles.body}>
    //       <Text style={styles.name}>{title}</Text>
    //       <Text>
    //         {date}, {time}
    //       </Text>
    //     </View>
    //   </TouchableOpacity>
    // </Link>

    <View style={styles.container}>
      <Text style={(styles.name, { color: "blue" })}>{title}</Text>
      {/* <Text>
        {date}, {time}
      </Text> */}
      <Text>Hello</Text>
      <ResourceDownloadButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 64,
    width: "100%",
    alignItems: "center",
    paddingVertical: 6,
    paddingLeft: 0,
    paddingRight: 32,
    flexDirection: "row",
    flex: 1,
    gap: 8,
  },
  dateTime: { width: "35%", aspectRatio: 1 },
  body: {
    flex: 1,
    height: 75,
    flexDirection: "column",
    justifyContent: "center",
  },
  name: {
    color: Theme.colors.textPrimary,
    fontWeight: "bold",
    fontSize: Theme.sizes.textLarge,
  },
  catagory: {
    paddingLeft: 8,
    paddingTop: 4,
  },
  content: {
    flex: 1,
    gap: 8,
  },
});
