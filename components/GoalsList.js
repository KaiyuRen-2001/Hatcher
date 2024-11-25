import { useState, useEffect, useContext } from "react";
import { StyleSheet, FlatList, RefreshControl, Text } from "react-native";

import Theme from "@/assets/theme";
import Goal from "@/components/Goal";
import Loading from "@/components/Loading";
import useSession from "@/utils/useSession";
import { GoalsContext } from "@/components/storageContext";

export default function GoalsList({ goalsExpanded }) {
  const { goals, storageInitialized } = useContext(GoalsContext);
  const session = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (session && storageInitialized) {
      setIsLoading(false);
      setIsRefreshing(false);
    } else {
      setIsLoading(true);
    }
  }, [session, storageInitialized, goals]);

  if (isLoading && !isRefreshing) {
    return <Loading />;
  }

  if (!goals || !goals.length) {
    return <Text style={styles.text}>Click + to add goals.</Text>;
  }

  if (!goalsExpanded) {
    return <></>;
  }

  return (
    <FlatList
      data={goals}
      renderItem={({ item }) => (
        <Goal
          id={item.id}
          name={item.name}
          catagory={item.catagory}
          confidence={item.confidence}
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
