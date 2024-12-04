import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Switch,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";

import Tag from "@/components/Tag";
import Button from "@/components/Button";
import { router } from "expo-router";
import { useState } from "react";

import Theme from "@/assets/theme";
import Loading from "@/components/Loading";
import ListView from "./listview";
import useSession from "@/utils/useSession";

const STANFORD_COORDS = {
  latitude: 37.4275,
  longitude: -122.1697,
  title: "Women in Computer Science",
};

const STANFORD_GROUP = {
  name: "Women in Computer Science",
  description: "A group for women in computer science at Stanford University",
  location: "Stanford University",
  category: "STEM",
  goals: ["networking", "mentorship", "career advice"],
};

const JAPANTOWN_COORDS = {
  latitude: 37.7851,
  longitude: -122.4294,
  title: "San Francisco Japantown",
};

const ANXIOUS_ENGINEERS_GROUP = {
  name: "Interview Prep for Anxious Engineers",
  description: "A group for interview prep for anxious new gradengineers",
  location: "San Francisco Japantown",
  category: "STEM",
  goals: ["interview prep", "networking", "mentorship"],
};

const BERKELEY_COORDS = {
  latitude: 37.8719,
  longitude: -122.2585,
  title: "UC Berkeley",
};

const BERKELEY_GROUP = {
  name: "Berkeley Women Engineers",
  description: "A supportive community for women in engineering at UC Berkeley",
  location: "UC Berkeley",
  category: "STEM",
  goals: ["networking", "mentorship", "career advice"],
};

const BAY_AREA_REGION = {
  latitude: 37.6064,
  longitude: -122.2919,
  latitudeDelta: 0.8,
  longitudeDelta: 0.8,
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
  const [showCategories, setShowCategories] = useState(false);
  const [showGoals, setShowGoals] = useState(false);

  return (
    <View style={styles.filterContainer}>
      <View style={styles.dropdownContainer}>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => {
            setShowCategories(!showCategories);
            setShowGoals(false);
          }}
        >
          <Text style={styles.dropdownButtonText}>
            {selectedCategory || "Category"}
          </Text>
          <MaterialIcons
            name={showCategories ? "arrow-drop-up" : "arrow-drop-down"}
            size={24}
            color={Theme.colors.textPrimary}
          />
        </TouchableOpacity>
        {showCategories && (
          <View style={styles.dropdownList}>
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.dropdownItem,
                  selectedCategory === category && styles.selectedItem,
                ]}
                onPress={() => {
                  if (category === "All") {
                    setSelectedCategory(null);
                  } else {
                    setSelectedCategory(
                      selectedCategory === category ? null : category
                    );
                  }
                  setShowCategories(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View style={styles.dropdownContainer}>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => {
            setShowGoals(!showGoals);
            setShowCategories(false);
          }}
        >
          <Text style={styles.dropdownButtonText}>
            {selectedGoal || "Goal"}
          </Text>
          <MaterialIcons
            name={showGoals ? "arrow-drop-up" : "arrow-drop-down"}
            size={24}
            color={Theme.colors.textPrimary}
          />
        </TouchableOpacity>
        {showGoals && (
          <View style={styles.dropdownList}>
            {GOALS.map((goal) => (
              <TouchableOpacity
                key={goal}
                style={[
                  styles.dropdownItem,
                  selectedGoal === goal && styles.selectedItem,
                ]}
                onPress={() => {
                  if (goal === "All") {
                    setSelectedGoal(null);
                  } else {
                    setSelectedGoal(selectedGoal === goal ? null : goal);
                  }
                  setShowGoals(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{goal}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const CustomCallout = ({ group }) => (
  <View style={styles.calloutContainer}>
    <View style={styles.cardContent}>
      <Text style={styles.groupName}>{group.name}</Text>
      <Tag
        title={group.location}
        icon={
          <EvilIcons
            name="location"
            size={Theme.sizes.iconSmall}
            color={Theme.colors.iconPrimary}
          />
        }
      />
      <Text style={styles.groupDescription}>{group.description}</Text>
    </View>
    <Button
      diasabled={false}
      onPress={() => router.navigate("/tabs/explore/details")}
      title={"Join"}
      style={styles.joinButton}
    />
  </View>
);

export default function ListGroups() {
  const session = useSession();
  const [showList, setShowList] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedGoal, setSelectedGoal] = useState(null);

  // Add this filtering logic
  const groupsData = [
    { coords: STANFORD_COORDS, group: STANFORD_GROUP },
    { coords: JAPANTOWN_COORDS, group: ANXIOUS_ENGINEERS_GROUP },
    { coords: BERKELEY_COORDS, group: BERKELEY_GROUP },
  ];

  const filteredGroups = groupsData.filter(({ group }) => {
    const categoryMatch =
      !selectedCategory || group.category === selectedCategory;
    const goalMatch = !selectedGoal || group.goals.includes(selectedGoal);
    return categoryMatch && goalMatch;
  });

  if (!session) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      {showList ? (
        <ListView />
      ) : (
        <>
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
          <MapView
            style={[styles.map, showFilters && styles.mapWithFilters]}
            initialRegion={BAY_AREA_REGION}
          >
            {filteredGroups.map(({ coords, group }) => (
              <Marker
                key={coords.title}
                pinColor={Theme.colors.iconTertiary}
                coordinate={{
                  latitude: coords.latitude,
                  longitude: coords.longitude,
                }}
              >
                <Callout tooltip={true}>
                  <CustomCallout group={group} />
                </Callout>
              </Marker>
            ))}
          </MapView>
        </>
      )}

      <View style={styles.toggleContainer}>
        <MaterialIcons name="map" size={24} color={Theme.colors.textPrimary} />
        <Switch
          trackColor={{
            false: Theme.colors.textDark,
            true: Theme.colors.textDark,
          }}
          thumbColor={"#ffffff"}
          ios_backgroundColor={Theme.colors.textDark}
          onValueChange={() => setShowList(!showList)}
          value={showList}
          style={styles.toggle}
        />
        <MaterialIcons name="list" size={24} color={Theme.colors.textPrimary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  map: {
    width: Dimensions.get("window").width,
    height: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 16,
  },
  calloutContainer: {
    zIndex: 1,
    width: 250,
    backgroundColor: Theme.colors.backgroundPrimary,
    borderRadius: 12,
    padding: 16,
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
    fontSize: Theme.sizes.textMedium,
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
    paddingTop: 8,
    fontSize: Theme.sizes.textSmall,
    color: Theme.colors.textdark,
    lineHeight: 20,
  },
  joinButton: {
    marginTop: "auto",
    width: "50%",
    marginHorizontal: "auto",
  },
  customCallout: {
    backgroundColor: "transparent",
    padding: 0,
  },
  toggleContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.backgroundPrimary,
    padding: 8,
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  toggle: {
    marginHorizontal: 8,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    zIndex: 1,
  },
  dropdownContainer: {
    width: "48%",
    zIndex: 1,
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Theme.colors.backgroundSecondary,
    padding: 12,
    borderRadius: 8,
  },
  dropdownButtonText: {
    color: Theme.colors.textPrimary,
    fontSize: 16,
  },
  dropdownList: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: Theme.colors.backgroundSecondary,
    borderRadius: 8,
    marginTop: 4,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.backgroundPrimary,
  },
  selectedItem: {
    backgroundColor: Theme.colors.primary + "20",
  },
  dropdownItemText: {
    color: Theme.colors.textPrimary,
    fontSize: 16,
  },
  scrollView: {
    marginTop: 50,
  },
});
