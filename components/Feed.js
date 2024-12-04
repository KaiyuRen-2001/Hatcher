import { useState, useEffect, useContext } from "react";
import { StyleSheet, FlatList, RefreshControl } from "react-native";

import Theme from "@/assets/theme";
import Loading from "@/components/Loading";
import useSession from "@/utils/useSession";
import Event from "@/components/Event";
import Resource from "@/components/Resource";
import { GoalsContext } from "@/components/storageContext";

import timeAgo from "@/utils/timeAgo";

export default function Feed() {
  const session = useSession();
  const { events, resources, getOrderedEventsAndResources } =
    useContext(GoalsContext);

  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchPosts = () => {
    setPosts(getOrderedEventsAndResources());
  };

  useEffect(() => {
    fetchPosts();
  }, [events, resources]);

  if (isLoading && !isRefreshing) {
    return <Loading />;
  }

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) =>
        item.type === "event" ? (
          <Event
            id={item.id}
            title={item.title}
            description={item.description}
            location={item.location}
            date={item.date}
            time={item.time}
            groupName={item.groupName}
            inProfilePage={false}
          />
        ) : (
          <Resource id={item.id} title={"netflix"} />
        )
      }
      contentContainerStyle={styles.posts}
      style={styles.postsContainer}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={() => {
            setIsRefreshing(true);
            fetchPosts();
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
  postsContainer: {
    width: "100%",
    paddingHorizontal: 8,
  },
  posts: {
    gap: 8,
  },
});
