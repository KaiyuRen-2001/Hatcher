import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import EvilIcons from "@expo/vector-icons/EvilIcons";

import Tag from "@/components/Tag";
import DateTimeDisplay from "@/components/DateTimeDisplay";
import Theme from "@/assets/theme";

export default function Goal({ id, title, location, date, time }) {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.name}>{title}</Text>
        <View style={styles.catagory}>
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
      </View>
      <DateTimeDisplay style={styles.dateTime} date={date} time={time} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
