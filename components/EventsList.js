import { useState, useEffect, useContext } from "react";
import { StyleSheet, FlatList, RefreshControl, Text } from "react-native";

import Theme from "@/assets/theme";
import Event from "@/components/Event";
import Loading from "@/components/Loading";
import useSession from "@/utils/useSession";
import { GoalsContext } from "@/components/storageContext";

export default function EventsList({ eventsExpanded }) {
  const { events, storageInitialized } = useContext(GoalsContext);
  const session = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    if (session && storageInitialized) {
      setIsLoading(false);
      setIsRefreshing(false);

      if (events) {
        setUserEvents(
          events.reduce((acc, event) => {
            if (event.members.includes(session.user.username)) {
              return [...acc, event];
            }
            return acc;
          }, [])
        );
      }
    } else {
      setIsLoading(true);
    }
  }, [session, storageInitialized, events]);

  if (isLoading && !isRefreshing) {
    return <Loading />;
  }

  if (!eventsExpanded) {
    return <></>;
  }

  if (!userEvents || !userEvents.length) {
    return <Text style={styles.text}>No upcoming events.</Text>;
  }

  return (
    <FlatList
      data={userEvents}
      renderItem={({ item }) => (
        <Event
          id={item.id}
          title={item.title}
          location={item.location}
          date={item.date}
          time={item.time}
        />
      )}
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
