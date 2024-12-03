import { useState, useEffect, useContext } from "react";
import { StyleSheet, FlatList, RefreshControl, Text } from "react-native";

import Theme from "@/assets/theme";
import Event from "@/components/Event";
import Loading from "@/components/Loading";
import useSession from "@/utils/useSession";
import { GoalsContext } from "@/components/storageContext";
import Resource from "./Resource";
import { View } from "react-native";

export default function ResourcesList({ eventsExpanded, RSVPed, groupName }) {
  //console.log(eventsExpanded, RSVPed, groupName);
  const { events, storageInitialized } = useContext(GoalsContext);
  const session = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [userEvents, setUserEvents] = useState([]);
  const [inProfilePage, setInProfilePage] = useState(false);

  useEffect(() => {
    if (session && storageInitialized) {
      setIsLoading(false);
      setIsRefreshing(false);

      if (events) {
        //console.log(events);
        if (RSVPed) {
          setUserEvents(
            events.reduce((acc, event) => {
              if (event.members.includes(session.user.username)) {
                return [...acc, event];
              }
              return acc;
            }, [])
          );
          setInProfilePage(true);
          //console.log(`userEvents: ${userEvents.length}`);
        } else if (groupName) {
          setUserEvents(
            events.reduce((acc, event) => {
              if (event.groupName === groupName) {
                return [...acc, event];
              }
              return acc;
            }, [])
          );
          setInProfilePage(false);
        }
      }
    } else {
      setIsLoading(true);
    }
  }, [session, storageInitialized, events]);

  if (isLoading && !isRefreshing) {
    return <Loading />;
  }

  return (
    <View>
      <Resource title={"netflix"} />
      <FlatList
        data={userEvents}
        renderItem={({ item }) => <Resource title={netflix} />}
        contentContainerStyle={styles.goals}
        style={styles.goalsContainer}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => {
              setIsRefreshing(true);
              // fetchGoals();
              setIsRefreshing(false);
            }}
            tintColor={Theme.colors.textPrimary} // only applies to iOS
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  goalsContainer: {
    width: "100%",
  },
  goals: {
    gap: 8,
  },
});
