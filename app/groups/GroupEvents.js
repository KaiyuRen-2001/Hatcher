import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Theme from "@/assets/theme";
import EventsList from "@/components/EventsList";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { Animated, LinearTransition, FadeIn, FadeOut } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { useNavigation } from "expo-router";

export default function GroupEvents() {
  const route = useRoute();
  const router = useRouter();
  const { groupName } = route.params; // Getting groupName from route params
  const navigation = useNavigation(); // Get navigation object

  // Update the header title dynamically when the component mounts
  useEffect(() => {
    if (groupName) {
      navigation.setOptions({
        title: groupName, // Set the title of the header
      });
    }
  }, [groupName, navigation]); // Ensure it runs when groupName changes
  return (
    <View style={styles.container}>
      <Animated.View
        style={styles.feed}
        layout={LinearTransition}
        entering={FadeIn}
        exiting={FadeOut}
      >
        <EventsList
          eventsExpanded={true}
          RSVPed={false}
          groupName={groupName}
        />
        <TouchableOpacity
          onPress={() => {
            const navigationPayload = {
              pathname: "/groups/newEvent",
              params: { groupName },
            };
            router.push(navigationPayload);
          }}
        >
          <View style={styles.postButton}>
            <FontAwesome
              size={Theme.sizes.iconLarge}
              name="plus"
              color={Theme.colors.textPrimary}
            />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  feed: {
    //paddingLeft: 32,
    height: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  postButton: {
    backgroundColor: Theme.colors.iconHighlighted,
    height: 64,
    width: 64,
    borderRadius: 64,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 25,
    right: 25,
    // FontAwesome 'plus' icon is a bit off-center, so we manually center it by
    // tweaking the padding
    paddingTop: 2,
    paddingLeft: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: Theme.colors.headerBackground,
  },
  groupName: {
    fontFamily: "PTSansCaption-Bold",
    fontSize: Theme.sizes.textMedium,
    color: Theme.colors.textPrimary,
  },
  infoContainer: {
    padding: 16,
  },
  infoText: {
    fontFamily: "Inter",
    fontSize: Theme.sizes.textSmall,
    color: Theme.colors.textSecondary,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: Theme.colors.textSecondary,
    marginTop: 8,
  },
  chatContainer: {
    flex: 1,
    padding: 16,
  },
  chatList: {
    flex: 1,
    marginBottom: 8,
  },
  messageContainer: {
    padding: 10,
    marginVertical: 4,
    borderRadius: 20,
    maxWidth: "75%",
    position: "relative",
  },
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: Theme.colors.backgroundSecondary,
    borderTopRightRadius: 0,
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: Theme.colors.backgroundSecondary,
    borderTopLeftRadius: 0,
  },
  messageText: {
    color: Theme.colors.textPrimary,
  },
  tail: {
    position: "absolute",
    width: 0,
    height: 0,
    borderStyle: "solid",
  },
  sentTail: {
    right: -5,
    top: 10,
    borderWidth: 10,
    borderColor: "transparent",
    borderTopColor: Theme.colors.backgroundSecondary,
    borderBottomWidth: 0,
  },
  receivedTail: {
    left: -5,
    top: 10,
    borderWidth: 10,
    borderColor: "transparent",
    borderTopColor: Theme.colors.backgroundSecondary,
    borderBottomWidth: 0,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: Theme.colors.textSecondary,
    borderRadius: 8,
    padding: 9,
    marginRight: 8,
    color: Theme.colors.textPrimary,
  },

  resourcesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  pressableContainer: {
    backgroundColor: Theme.colors.backgroundSecondary,
    borderRadius: 20,
    padding: 9,
    flexDirection: "row",
    alignItems: "center",
  },
  pressableText: {
    fontSize: Theme.sizes.textSmall,
    color: Theme.colors.textDark,
    fontFamily: "Inter",
  },

  notJoinedContainer: {
    backgroundColor: Theme.colors.backgroundSecondary,
    borderRadius: 50,
    padding: 9,
  },

  joinedContainer: {
    padding: 6,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Theme.colors.backgroundSecondary,
  },
});
