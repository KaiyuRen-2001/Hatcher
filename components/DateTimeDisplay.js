import { StyleSheet, Text, View } from "react-native";

import Theme from "@/assets/theme";

export default function DateTimeDisplay({ date, time, style }) {
  const month = date.substring(0, date.indexOf(" "));
  const day = date.substring(date.indexOf(" ") + 1, date.indexOf(","));
  const startTime = time;

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.month}>{month}</Text>
      <Text style={styles.day}>{day}</Text>
      <Text style={styles.time}>{startTime}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.iconHighlighted,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 20,
    elevation: 3,
  },
  month: {
    color: Theme.colors.textPrimary,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
  day: {
    color: Theme.colors.textPrimary,
    fontSize: 42,
    lineHeight: 42,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
  time: {
    color: Theme.colors.textPrimary,
    fontSize: 16,
    lineHeight: 16,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
});
