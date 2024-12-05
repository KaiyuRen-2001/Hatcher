import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState, useContext } from "react";
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

const CATEGORIES = ["All", "STEM", "Business", "Arts", "Social Sciences"];
const GOALS = [
  "All",
  "networking",
  "mentorship",
  "career advice",
  "interview prep",
];

const FilterDropdowns = ({
  selectedCategory,
  setSelectedCategory,
  selectedGoal,
  setSelectedGoal,
}) => {
  const categoryData = CATEGORIES.map((cat) => ({
    key: cat,
    value: cat,
  }));

  const goalData = GOALS.map((goal) => ({
    key: goal,
    value: goal,
  }));

  const handleCategorySelect = (val) => {
    setSelectedCategory(val === "All" ? null : val);
  };

  const handleGoalSelect = (val) => {
    setSelectedGoal(val === "All" ? null : val);
  };

  return (
    <View style={styles.filterContainer}>
      <View style={styles.dropdownContainer}>
        <SelectList
          placeholder="Category"
          boxStyles={styles.dropdownButton}
          dropdownStyles={styles.dropdownList}
          inputStyles={styles.dropdownButtonText}
          dropdownTextStyles={styles.dropdownItemText}
          setSelected={handleCategorySelect}
          data={categoryData}
          save="value"
          search={false}
          arrowicon={
            <FontAwesome
              name="chevron-down"
              size={Theme.sizes.iconSmall}
              color={Theme.colors.iconSecondary}
            />
          }
        />
      </View>

      <View style={styles.dropdownContainer}>
        <SelectList
          placeholder="Goal"
          boxStyles={styles.dropdownButton}
          dropdownStyles={styles.dropdownList}
          inputStyles={styles.dropdownButtonText}
          dropdownTextStyles={styles.dropdownItemText}
          setSelected={handleGoalSelect}
          data={goalData}
          save="value"
          search={false}
          arrowicon={
            <FontAwesome
              name="chevron-down"
              size={Theme.sizes.iconSmall}
              color={Theme.colors.iconSecondary}
            />
          }
        />
      </View>
    </View>
  );
};

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

  // if (!session) {
  //   return <Loading />;
  // }
  const filteredGroups = exploreGroups.filter((group) => {
    const categoryMatch =
      !selectedCategory || group.category === selectedCategory;
    const goalMatch = !selectedGoal || group.goals.includes(selectedGoal);
    return categoryMatch && goalMatch;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
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
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 16,
  },
  filterIcon: {
    padding: 8,
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
  },
  cardContent: {
    marginBottom: 12,
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
    backgroundColor: Theme.colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  joinButtonText: {
    color: "#FFFFFF",
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
    marginTop: 50,
  },
});

export {
  FilterDropdowns,
  STANFORD_GROUP,
  ANXIOUS_ENGINEERS_GROUP,
  BERKELEY_GROUP,
};
