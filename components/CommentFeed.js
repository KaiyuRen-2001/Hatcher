import { useState, useEffect } from "react";
import { StyleSheet, FlatList, RefreshControl } from "react-native";

import Theme from "@/assets/theme";
import Comment from "./Comment";
import Loading from "./Loading";
import db from "@/database/db";
import useSession from "@/utils/useSession";

import timeAgo from "@/utils/timeAgo";

export default function CommentFeed({ postId }) {
  const session = useSession();

  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchComments = async () => {
    setIsLoading(true);

    const data = await db
      .from("comments")
      .select("username, timestamp, text")
      .eq("post_id", postId);
    setComments(data.data);

    setIsLoading(false);
    setIsRefreshing(false);
  };

  useEffect(() => {
    if (session) {
      fetchComments();
    }
  }, [session]);

  if (isLoading && !isRefreshing) {
    return <Loading />;
  }

  return (
    <FlatList
      data={comments}
      renderItem={({ item }) => (
        <Comment
          username={item.username}
          timestamp={timeAgo(item.timestamp)}
          text={item.text}
        />
      )}
      contentContainerStyle={styles.posts}
      style={styles.postsContainer}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={() => {
            setIsRefreshing(true);
            fetchComments();
          }}
          tintColor={Theme.colors.textPrimary} // only applies to iOS
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  postsContainer: {
    marginTop: 24,
  },
  posts: {
    gap: 8,
  },
});
