import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Switch,
  TouchableOpacity,
  TextInput,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";
import { SelectList } from "react-native-dropdown-select-list";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import Tag from "@/components/Tag";
import Button from "@/components/Button";
import { router } from "expo-router";
import { useState, useRef } from "react";

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
  description: "A group for interview prep for anxious new grad engineers",
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

const CustomCallout = ({ group }) => {
  const calloutRef = useRef(null);

  const handleJoinPress = () => {
    if (calloutRef.current) {
      router.push({
        pathname: "/tabs/feed",
        params: {
          groupName: group.name,
          groupDescription: group.description,
          groupLocation: group.location,
          groupCategory: group.category,
          groupGoals: JSON.stringify(group.goals)
        }
      });
    }
  };

  return (
    <Callout
      ref={calloutRef}
      tooltip={true}
      onPress={handleJoinPress}
    >
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
          <View style={styles.buttonWrapper}>
            <TouchableOpacity onPress={handleJoinPress} style={styles.joinButton}>
              <Text style={styles.joinButtonText}>Join</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Callout>
  );
};

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
            <View style={styles.goalNameInputText}>
              <Feather
                name="search"
                size={Theme.sizes.iconSmall}
                color={Theme.colors.textDark}
              />
              <TextInput
                placeholder="Search"
                placeholderTextColor={Theme.colors.textSecondary}
                onChangeText={() => {}}
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
          <MapView
            style={[styles.map, showFilters && styles.mapWithFilters]}
            initialRegion={BAY_AREA_REGION}
          >
            {filteredGroups.map(({ coords, group }) => (
              <Marker
                key={coords.title}
                coordinate={{
                  latitude: coords.latitude,
                  longitude: coords.longitude,
                }}
                pinColor={Theme.colors.iconTertiary}
              >
                <CustomCallout group={group} />
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
    alignItems: "center",
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
    marginBottom: 32,
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
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: Theme.colors.backgroundWhite,
    borderColor: Theme.colors.textPrimary,
    color: Theme.colors.textDark,
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
