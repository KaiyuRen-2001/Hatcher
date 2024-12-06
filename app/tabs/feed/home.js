import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { MaterialIcons } from "@expo/vector-icons";
import FilterDropdowns from "@/components/FilterDropdowns";

import Theme from "@/assets/theme";
import Feed from "@/components/Feed";

export default function Home() {
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, onChangeSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedGoal, setSelectedGoal] = useState(null);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <View style={styles.goalNameInputText}>
          <Feather
            name="search"
            size={Theme.sizes.iconSmall}
            color={Theme.colors.textDark}
          />
          <TextInput
            placeholder="Search"
            placeholderTextColor={Theme.colors.textSecondary}
            onChangeText={onChangeSearchTerm}
            value={searchTerm}
            style={styles.searchText}
          />
        </View>
        <TouchableOpacity
          style={styles.filterIcon}
          onPress={() => setShowFilters(!showFilters)}
        >
          <MaterialIcons
            name="filter-list"
            size={24}
            color={Theme.colors.textPrimary}
          />
        </TouchableOpacity>
      </View>
      {showFilters && (
        <FilterDropdowns
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedGoal={selectedGoal}
          setSelectedGoal={setSelectedGoal}
        />
      )}
      <Feed
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        selectedGoal={selectedGoal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Theme.colors.backgroundPrimary,
    // paddingTop: 16,
    // paddingLeft: 32,
    justifyContent: "flex-start",
    height: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 16,
  },
  filterIcon: {
    paddingRight: 12,
    paddingBottom: 8,
  },
  goalNameInputText: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    flex: 1,
    width: "80%",
    gap: 8,
    marginBottom: 8,
    borderWidth: 1,
    marginRight: 32,
    borderRadius: 10,
    //paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: Theme.colors.backgroundWhite,
    borderColor: Theme.colors.textPrimary,
    color: Theme.colors.textDark,
  },
  postButtonContainer: {
    position: "absolute",
    right: 8,
    bottom: 8,
  },
  postButton: {
    backgroundColor: Theme.colors.iconHighlighted,
    height: 48,
    width: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    // FontAwesome 'plus' icon is a bit off-center, so we manually center it by
    // tweaking the padding
    paddingTop: 2,
    paddingLeft: 1,
  },
  searchText: {
    flex: 1,
    fontSize: 16, // Match font size to your design
    lineHeight: 20, // Ensure line height matches font size
    color: Theme.colors.textDark, // Use the desired text color
    paddingVertical: 0, // Avoid extra padding that might clip text
  },
});
