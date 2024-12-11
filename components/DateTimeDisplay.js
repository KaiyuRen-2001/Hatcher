import { StyleSheet, Text, View } from "react-native";

import Theme from "@/assets/theme";

export default function DateTimeDisplay({
  date,
  time,
  style,
  textMonth,
  textDay,
  textTime,
}) {
  /*const month = date.substring(0, date.indexOf(" "));
  const day = date.substring(date.indexOf(" ") + 1, date.indexOf(","));
  const startTime = time;*/
  const dateTimeString = `${date} ${time}`; // Combine date and time
  const dateTime = new Date(dateTimeString); // Parse it into a Date object

  // Extract month, day, and time from the Date object
  const month = dateTime.toLocaleString("en-US", { month: "short" }); // Get short month (e.g., 'Dec')
  const day = dateTime.getDate(); // Get day of the month
  const startTime = dateTime.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <View style={[styles.container, style]}>
      <Text
        style={[styles.month, { fontSize: textMonth, lineHeight: textMonth }]}
      >
        {month}
      </Text>
      <Text style={[styles.day, { fontSize: textDay, lineHeight: textDay }]}>
        {day}
      </Text>
      <Text style={[styles.time, { fontSize: textTime, lineHeight: textTime }]}>
        {startTime}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.iconHighlighted,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
    borderRadius: 20,
    elevation: 3,
  },
  month: {
    color: Theme.colors.textPrimary,
    letterSpacing: 0.25,
    fontFamily: "PTSansCaption-Bold",
  },
  day: {
    color: Theme.colors.textPrimary,
    fontFamily: "PTSansCaption-Bold",
    letterSpacing: 0.25,
  },
  time: {
    color: Theme.colors.textPrimary,
    fontFamily: "PTSansCaption-Bold",
    letterSpacing: 0.25,
  },
});
