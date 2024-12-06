import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { useState, useContext } from "react";
import FilterDropdowns from "@/components/FilterDropdowns";
import { SelectList } from "react-native-dropdown-select-list";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { GoalsContext } from "@/components/storageContext";

import Theme from "@/assets/theme";
import Loading from "@/components/Loading";
import useSession from "@/utils/useSession";

const STANFORD_GROUP = {
  name: "Women in Computer Science",
  description: "A group for women in computer science at Stanford University",
  location: "Stanford University",
  category: "STEM",
  goals: ["networking", "mentorship", "career advice"],
};

const ANXIOUS_ENGINEERS_GROUP = {
  name: "Interview Prep for Anxious Engineers",
  description: "A group for interview prep for anxious new gradengineers",
  location: "San Francisco Japantown",
  category: "STEM",
  goals: ["interview prep", "networking", "mentorship"],
};

const BERKELEY_GROUP = {
  name: "Berkeley Women Engineers",
  description: "A supportive community for women in engineering at UC Berkeley",
  location: "UC Berkeley",
  category: "STEM",
  goals: ["networking", "mentorship", "career advice"],
};

const GOALS = [
  "All",
  "networking",
  "mentorship",
  "career advice",
  "interview prep",
];

const GroupCard = ({ group }) => {
  const navToGroup = () => {
    const a1 = {
      admins: group.admins,
      description: group.description,
      groupId: group.groupId,
      location: group.location,
      members: group.members,
      name: group.name,
      norms: group.norms,
    };
    const navigationPayload = {
      pathname: "/groups/newgroup",
      params: { group: JSON.stringify(a1) },
    };
    router.push(navigationPayload);
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.groupName}>{group.name}</Text>
        <Text style={styles.groupLocation}>
          <MaterialIcons
            name="location-on"
            size={16}
            color={Theme.colors.textSecondary}
          />
          {group.location}
        </Text>
        <Text style={styles.groupDescription}>{group.description}</Text>
      </View>
      <TouchableOpacity style={styles.joinButton} onPress={navToGroup}>
        <Text style={styles.joinButtonText}>View</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function ListView() {
  const session = useSession();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const { exploreGroups } = useContext(GoalsContext);
  const [searchTerm, onChangeSearchTerm] = useState("");

  // if (!session) {
  //   return <Loading />;
  // }
  const filteredGroups = searchTerm
    ? exploreGroups.reduce((acc, group) => {
        if (group.name.toLowerCase().startsWith(searchTerm.toLowerCase())) {
          return [...acc, group];
        }
        return acc;
      }, [])
    : exploreGroups.filter((group) => {
        const categoryMatch =
          !selectedCategory || group.category === selectedCategory;
        const goalMatch = !selectedGoal || Math.random() < 0.5; // group.goals.includes(selectedGoal);
        return categoryMatch && goalMatch;
      });

  return (
    <View style={styles.container}>
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
            style={styles.searchText}
            value={searchTerm}
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
      <ScrollView style={styles.scrollView}>
        {filteredGroups.map((group, index) => (
          <GroupCard key={index} group={group} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  filterIcon: {
    paddingRight: 12,
    paddingBottom: 8,
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
  scrollViewNoFilter: {
    marginTop: 0, // Remove top margin when filters are hidden
  },
  card: {
    backgroundColor: Theme.colors.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginHorizontal: 16,
  },
  cardContent: {
    marginBottom: 12,
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
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: Theme.colors.backgroundWhite,
    borderColor: Theme.colors.textPrimary,
    color: Theme.colors.textDark,
  },
  groupName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Theme.colors.textPrimary,
    marginBottom: 8,
  },
  groupLocation: {
    fontSize: 14,
    color: Theme.colors.textSecondary,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  groupDescription: {
    fontSize: 14,
    color: Theme.colors.textSecondary,
    lineHeight: 20,
  },
  joinButton: {
    backgroundColor: Theme.colors.backgroundPrimary,
    marginHorizontal: "35%",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  joinButtonText: {
    color: Theme.colors.textSecondary,
    fontWeight: "bold",
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    zIndex: 1,
  },
  dropdownContainer: {
    width: "48%",
    alignItems: "center",
  },
  dropdownButton: {
    height: 50,
    width: "100%",
    backgroundColor: Theme.colors.backgroundWhite,
    borderWidth: 1,
    borderColor: Theme.colors.textPrimary,
    borderRadius: 10,
  },
  dropdownList: {
    width: "100%",
    backgroundColor: Theme.colors.backgroundWhite,
    color: Theme.colors.textDark,
    marginTop: 50,
    position: "absolute",
    zIndex: 999,
    borderWidth: 2,
    borderColor: Theme.colors.iconSecondary,
  },
  dropdownButtonText: {
    marginTop: 3,
    color: Theme.colors.textDark,
  },
  dropdownItemText: {
    color: Theme.colors.textDark,
  },
  scrollView: {
    marginTop: 0,
  },
  searchText: {
    flex: 1,
  },
});

export { STANFORD_GROUP, ANXIOUS_ENGINEERS_GROUP, BERKELEY_GROUP };
