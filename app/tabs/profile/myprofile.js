import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  LayoutAnimation,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import Animated, {
  LinearTransition,
  SequencedTransition,
  FadingTransition,
  FadeOut,
  FadeIn,
  JumpingTransition,
  CurvedTransition,
  EntryExitTransition,
  FlipOutYLeft,
  FlipInEasyY,
  Easing,
} from "react-native-reanimated";

import { useRouter } from "expo-router";

import Theme from "@/assets/theme";
import GoalsList from "@/components/GoalsList";
import EventsList from "@/components/EventsList";
import Loading from "@/components/Loading";

import useSession from "@/utils/useSession";
import { useState } from "react";

export default function Profile() {
  const session = useSession();
  const router = useRouter();

  const [goalsExpanded, setGoalsExpanded] = useState(false);
  const [eventsExpanded, setEventsExpanded] = useState(false);

  const onExpandEvents = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setEventsExpanded((e) => !e);
    setGoalsExpanded(false);
  };

  const onExpandGoals = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setGoalsExpanded((e) => !e);
    setEventsExpanded(false);
  };

  const signOut = async () => {
    try {
      /*const { error } = await db.auth.signOut();
      if (error) {
        Alert.alert(error.message);
      } else {
        router.navigate("/");
        Alert.alert("Sign out successful.");
      }*/
    } catch (err) {
      console.log(err);
    }
  };

  if (!session) {
    return <Loading />;
  }

  const chevron = (onPress, expanded) => {
    return (
      <TouchableOpacity style={styles.dropDown} onPress={onPress}>
        <View style={styles.expandButton}>
          {expanded ? (
            <Entypo
              name="chevron-up"
              size={28}
              color={Theme.colors.textPrimary}
            />
          ) : (
            <Entypo
              name="chevron-down"
              size={28}
              color={Theme.colors.textPrimary}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image
          style={styles.profilePicture}
          source={require("@/assets/james.png")} // TODO do not hard code
        ></Image>
        <View style={styles.userTextContainer}>
          <Text style={styles.title}>{session.user.username}</Text>
          <Text style={styles.text}>{session.user.name}</Text>
        </View>
      </View>
      <View style={styles.goalsTitle}>
        <Text style={styles.goalsTitleText}>Goals</Text>
        <View style={styles.addGoalButton}>
          {goalsExpanded && (
            <Animated.View
              layout={LinearTransition}
              exiting={FadeOut}
              entering={FadeIn}
            >
              <TouchableOpacity
                onPress={() => router.navigate("/tabs/profile/newgoal")}
              >
                <View style={styles.postButton}>
                  <FontAwesome
                    size={28}
                    name="plus"
                    color={Theme.colors.textPrimary}
                  />
                </View>
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>
        {chevron(onExpandGoals, goalsExpanded)}
      </View>
      <Animated.View
        style={styles.feed}
        layout={LinearTransition}
        entering={FadeIn}
        exiting={FadeOut}
      >
        <GoalsList goalsExpanded={goalsExpanded} />
      </Animated.View>
      <Animated.View style={styles.eventsTitle} layout={LinearTransition}>
        <Text style={styles.eventsTitleText}>Events</Text>
        {chevron(onExpandEvents, eventsExpanded)}
      </Animated.View>
      <Animated.View
        style={styles.feed}
        layout={LinearTransition}
        entering={FadeIn}
        exiting={FadeOut}
      >
        <EventsList eventsExpanded={eventsExpanded} RSVPed={true} />
      </Animated.View>
      <Animated.View
        style={styles.bottomBorder}
        layout={LinearTransition}
        entering={FadeIn}
        exiting={FadeOut}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  postButton: {
    backgroundColor: Theme.colors.iconHighlighted,
    height: 36,
    width: 36,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    // FontAwesome 'plus' icon is a bit off-center, so we manually center it by
    // tweaking the padding
    paddingTop: 2,
    paddingLeft: 1,
  },
  expandButton: { height: 36, width: 36 },
  addGoalButton: {
    flex: 1,
  },
  dropDown: {
    marginRight: 16,
  },
  eventsTitleText: {
    color: Theme.colors.textPrimary,
    fontSize: Theme.sizes.textExtraLarge,
    fontWeight: "bold",
    fontFamily: "PTSansCaption-Bold",
    marginRight: 8,
    flex: 1,
  },
  goalsTitle: {
    flexDirection: "row",
    paddingTop: 16,
    paddingLeft: 24,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  feed: {
    //paddingLeft: 32,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  profilePicture: {
    width: "40%",
    padding: 8,
    aspectRatio: 1,
  },
  postTitle: {
    padding: 12,
  },
  eventsTitle: {
    flexDirection: "row",
    paddingTop: 16,
    paddingLeft: 24,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    borderTopStyle: "solid",
    borderTopWidth: 1,
    borderTopColor: Theme.colors.backgroundSecondary,
    marginTop: 16,
  },
  bottomBorder: {
    borderTopStyle: "solid",
    borderTopWidth: 1,
    borderTopColor: Theme.colors.backgroundSecondary,
    marginTop: 16,
  },
  userContainer: {
    width: "100%",
    flexDirection: "row",
    marginTop: 12,
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.backgroundSecondary,
  },
  userTextContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 8,
    marginLeft: 16,
    fontFamily: "PTSansCaption",
  },
  title: {
    color: Theme.colors.textPrimary,
    fontSize: Theme.sizes.textExtraLarge,
    fontFamily: "PTSansCaption-Bold",
  },
  goalsTitleText: {
    color: Theme.colors.textPrimary,
    fontSize: Theme.sizes.textExtraLarge,
    fontWeight: "bold",
    fontFamily: "PTSansCaption-Bold",
    marginRight: 8,
  },
  text: {
    color: Theme.colors.textPrimary,
    fontSize: Theme.sizes.textLarge,
    fontFamily: "PTSansCaption",
  },
  buttonText: {
    fontWeight: "bold",
    color: Theme.colors.textHighlighted,
    fontSize: Theme.sizes.textMedium,
    fontFamily: "PTSansCaption",
  },
});
