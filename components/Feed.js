import { useState, useEffect, useContext } from "react";
import { StyleSheet, FlatList, RefreshControl, View } from "react-native";

import Tag from "@/components/Tag";
import Theme from "@/assets/theme";
import Loading from "@/components/Loading";
import useSession from "@/utils/useSession";
import Event from "@/components/Event";
import Resource from "@/components/Resource";
import { GoalsContext } from "@/components/storageContext";

export default function Feed({ searchTerm, selectedCategory, selectedGoal }) {
  const session = useSession();
  const {
    events,
    resources,
    getOrderedEventsAndResources,
    getGroupByName,
    storageInitialized,
  } = useContext(GoalsContext);
  //console.log(events);

  const [posts, setPosts] = useState(null);
  const [displayedPosts, setDisplayedPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  //console.log(posts);

  /*const fetchPosts = () => {
    //setPosts(getOrderedEventsAndResources());
    const fetchedPosts = getOrderedEventsAndResources();
    setPosts(fetchedPosts); // Update posts state
    setDisplayedPosts(fetchedPosts);
  };

  useEffect(() => {
    fetchPosts();
  }, [session, events, resources]);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const searchResults = posts.reduce((acc, post) => {
        if (post.title.toLowerCase().startsWith(searchTerm.toLowerCase())) {
          return [...acc, post];
        }
        return acc;
      }, []);
      setDisplayedPosts(searchResults);
    } else {
      if (selectedCategory || selectedGoal) {
        const filteredPosts = posts.filter((post) => {
          const group = getGroupByName(post.groupName);

          const categoryMatch =
            !selectedCategory || group.category === selectedCategory;

          const goalMatch = !selectedGoal || Math.random() < 0.5; // group.goals.includes(selectedGoal);
          return categoryMatch && goalMatch;
        });
        setDisplayedPosts(filteredPosts);
      } else {
        setDisplayedPosts(posts);
      }
    }
  }, [posts, searchTerm, selectedCategory, selectedGoal]);*/
  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const fetchedPosts = await getOrderedEventsAndResources();
      setPosts(fetchedPosts);
      setDisplayedPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    //console.log("empty dependency array fetchposts");
    fetchPosts();
    //console.log(posts);
  }, [storageInitialized, events, resources]);

  useEffect(() => {
    if (posts) {
      let filteredPosts = posts;

      if (searchTerm) {
        filteredPosts = posts.filter((post) =>
          post.title.toLowerCase().startsWith(searchTerm.toLowerCase())
        );
      } else if (selectedCategory || selectedGoal) {
        filteredPosts = posts.filter((post) => {
          const group = getGroupByName(post.groupName);
          const categoryMatch =
            !selectedCategory || group.category === selectedCategory;
          const goalMatch = !selectedGoal || Math.random() < 0.5; // Replace Math.random
          return categoryMatch && goalMatch;
        });
      }

      setDisplayedPosts(filteredPosts);
    }
  }, [posts, searchTerm, selectedCategory, selectedGoal]);

  if (isLoading && !isRefreshing) {
    return <Loading />;
  }

  return (
    <FlatList
      data={displayedPosts}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Tag style={styles.groupTag} title={item.groupName} />
          {item.type === "event" ? (
            <Event
              id={`e${item.id}`}
              title={item.title}
              description={item.description}
              location={item.location}
              date={item.date}
              time={item.time}
              groupName={item.groupName}
              inProfilePage={false}
            />
          ) : (
            <Resource
              id={`r${item.id}`}
              title={item.title}
              userName={item.userName}
              resourceUrl={item.resourceUrl}
              groupName={item.groupName}
              description={item.description}
              date={item.date}
              time={item.time}
            />
          )}
        </View>
      )}
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
      keyExtractor={(item) => `${item.title}`}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  itemContainer: {
    margin: 8,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: Theme.colors.backgroundSecondary,
  },
  groupTag: {
    position: "absolute",
    top: -16,
    left: 16,
    margin: "auto",
    marginBottom: 8,
    backgroundColor: Theme.colors.textHighlighted,
  },
  postsContainer: {
    width: "100%",
    // borderColor: "blue",
    // borderWidth: 1,
    // paddingHorizontal: 8,
  },
  posts: {
    gap: 16,
    marginTop: 16,
  },
});
