import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Theme from "@/assets/theme";

export default function Details(props) {
  const group = props.group;

  const posts = [
    { id: "1", title: "Welcome to the group!" },
    { id: "2", title: "Weekly discussion thread" },
    { id: "3", title: "Share your favorite moments!" },
    // Add more posts as needed
  ];

  const renderPost = ({ item }) => (
    <TouchableOpacity style={styles.postContainer}>
      <Text style={styles.postTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.groupName}>{group.name}</Text>
        <Button title="Join" onPress={() => alert("Joined the group!")} />
      </View>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>{group.members.length} members</Text>
        <Text style={styles.infoText}>Admins: {group.admins}</Text>
        <Text style={styles.infoText}>Location: {group.location}</Text>
        <Text style={styles.description}>{group.description}</Text>
      </View>

      {/* Posts Section */}
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        style={styles.postsList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: Theme.colors.headerBackground,
  },
  groupName: {
    fontSize: 20,
    fontWeight: "bold",
    color: Theme.colors.textPrimary,
  },
  infoContainer: {
    padding: 16,
    backgroundColor: Theme.colors.backgroundSecondary,
  },
  infoText: {
    fontSize: 14,
    color: Theme.colors.textSecondary,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: Theme.colors.textSecondary,
    marginTop: 8,
  },
  postsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  postContainer: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: Theme.colors.cardBackground,
    borderRadius: 8,
  },
  postTitle: {
    fontSize: 16,
    color: Theme.colors.textPrimary,
  },
});
