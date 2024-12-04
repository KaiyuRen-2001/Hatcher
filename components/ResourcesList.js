import { useState, useEffect, useContext } from "react";
import { StyleSheet, FlatList, RefreshControl, Text } from "react-native";

import Theme from "@/assets/theme";
import Loading from "@/components/Loading";
import useSession from "@/utils/useSession";
import { GoalsContext } from "@/components/storageContext";
import Resource from "./Resource";
import { View } from "react-native";

export default function ResourcesList({ groupName }) {
  //console.log("beg of reslist ", groupName);
  const [groupResources, setGroupResources] = useState([]);
  const { storageInitialized, resources } = useContext(GoalsContext);
  const session = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const updateResources = () => {
    const filteredResources = resources.reduce((acc, resource) => {
      if (resource.groupName === groupName) {
        return [...acc, resource];
      }
      return acc;
    }, []);
    console.log(filteredResources);
    setGroupResources(filteredResources);
  };

  useEffect(() => {
    if (session && storageInitialized) {
      setIsLoading(false);
      setIsRefreshing(false);
      updateResources();
    } else {
      setIsLoading(true);
    }
  }, [session, storageInitialized, resources]);

  if (isLoading && !isRefreshing) {
    return <Loading />;
  }

  return (
    <FlatList
      data={groupResources}
      renderItem={({ item }) => {
        // console.log("Rendering resource:", item);
        return (
          <Resource
            id={item.id}
            title={item.title}
            userName={item.userName}
            resourceUrl={item.resourceUrl}
            groupName={groupName}
            description={item.description}
            date={item.date}
            time={item.time}
          />
        );
      }}
      contentContainerStyle={styles.goals}
      style={styles.goalsContainer}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={() => {
            setIsRefreshing(true);
            //updateResources();
            setIsRefreshing(false);
          }}
          tintColor={Theme.colors.textPrimary} // only applies to iOS
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  goalsContainer: {
    width: "100%",
  },
  goals: {
    gap: 8,
  },
});
