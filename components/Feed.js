import { useState, useEffect } from "react";
import { StyleSheet, FlatList, RefreshControl } from "react-native";

import Theme from "@/assets/theme";
import Post from "@/components/Post";
import Loading from "@/components/Loading";
import useSession from "@/utils/useSession";

import timeAgo from "@/utils/timeAgo";

export default function Feed({
  navigateToComments = false,
  fetchUsersPostsOnly = false,
}) {
  const session = useSession();

  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchPosts = async () => {
    setIsLoading(true);

    /*const votes = await db
      .from("likes")
      .select("post_id, vote")
      .eq("user_id", session.user.id);

    const columns = "id, username, timestamp, text, like_count, comment_count";
    let data;
    if (fetchUsersPostsOnly) {
      data = await db
        .from("posts_with_counts")
        .select(columns)
        .eq("user_id", session.user.id);
    } else {
      data = await db.from("posts_with_counts").select(columns);
    }

    const postsWithVotes = data.data.map((post) => {
      let vote = 0;

      votes.data.forEach((like) => {
        if (like.post_id === post.id) {
          vote = like.vote;
        }
      });

      return { vote: vote, ...post };
    });

    setPosts(postsWithVotes);*/

    setIsLoading(false);
    setIsRefreshing(false);
  };

  useEffect(() => {
    if (session) {
      fetchPosts();
    }
  }, [session]);

  if (isLoading && !isRefreshing) {
    return <Loading />;
  }

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <Post
          navigateOnPress={navigateToComments}
          id={item.id}
          username={item.username}
          timestamp={timeAgo(item.timestamp)}
          text={item.text}
          score={item.like_count}
          vote={item.vote}
          commentCount={item.comment_count}
        />
      )}
      contentContainerStyle={styles.posts}
      style={styles.postsContainer}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={() => {
            setIsRefreshing(true);
            fetchPosts();
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
  },
  posts: {
    gap: 8,
  },
});
