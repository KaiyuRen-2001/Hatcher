import { useState, useEffect, useContext } from "react";
import { StyleSheet, FlatList, RefreshControl, Text } from "react-native";

import Theme from "@/assets/theme";
import Event from "@/components/Event";
import Loading from "@/components/Loading";
import useSession from "@/utils/useSession";
import { GoalsContext } from "@/components/storageContext";

export default function EventsList({ eventsExpanded, RSVPed, groupName }) {
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
          description={item.description}
          location={item.location}
          date={item.date}
          time={item.time}
          groupName={item.groupName}
          inProfilePage={inProfilePage}
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
  text: {
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    paddingTop: "10%",
    textAlign: "center",
    fontSize: Theme.sizes.textLarge,
    color: Theme.colors.textPrimary,
    fontFamily: "PTSansCaption",
  },
  goalsContainer: {
    paddingTop: 60,
    width: "100%",
  },
  goals: {
    height: "100%",
    gap: 130,
  },
});
