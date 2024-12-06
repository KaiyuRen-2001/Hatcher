import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Switch,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import Theme from "@/assets/theme";

const CATEGORIES = ["All", "STEM", "Business", "Arts", "Social Sciences"];
const GOALS = [
  "All",
  "networking",
  "mentorship",
  "career advice",
  "interview prep",
];

export default function FilterDropdowns({
  selectedCategory,
  setSelectedCategory,
  selectedGoal,
  setSelectedGoal,
}) {
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
    marginTop: 16,
    width: "60%",
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
