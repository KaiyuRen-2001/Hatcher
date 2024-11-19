import { useState, useEffect } from "react";
import { StyleSheet, FlatList, RefreshControl, Text } from "react-native";

import Theme from "@/assets/theme";
import Goal from "@/components/Goal";
import Loading from "@/components/Loading";
import useSession from "@/utils/useSession";

import { getGoals } from "@/database/db";

export default function GoalsList() {
  const session = useSession();

  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchGoals = async () => {
    setIsLoading(true);

    const newGoals = await getGoals();
    setGoals(newGoals);

    setIsLoading(false);
    setIsRefreshing(false);
  };

  useEffect(() => {
    if (session) {
      fetchGoals();
    }
  }, [session]);

  if (isLoading && !isRefreshing) {
    return <Loading />;
  }

  if (!goals.length) {
    return <Text style={styles.text}>Click + to add goals.</Text>;
  }

  return (
    <FlatList
      data={goals}
      renderItem={({ item }) => (
        <Goal
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
            fetchGoals();
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
