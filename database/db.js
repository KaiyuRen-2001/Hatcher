import AsyncStorage from "@react-native-async-storage/async-storage";

export const setInitialData = async () => {
  try {
    // user info
    await AsyncStorage.setItem(
      "user",
      JSON.stringify({
        email: "user@user.com",
        name: "James Landay",
        username: "landay",
        id: 1,
        picture: "@/assets/james.png",
      })
    );

    await AsyncStorage.setItem(
      "goals",
      JSON.stringify([
        {
          id: 1,
          name: "Add skills section",
          catagory: "Resume Prep",
          confidence: 0,
        },
        {
          id: 2,
          name: "Learn my greatest weakness",
          catagory: "Interview",
          confidence: 2,
        },
      ])
    );
    await AsyncStorage.setItem("goalNextID", JSON.stringify(3));

    await AsyncStorage.setItem(
      "categories",
      JSON.stringify(["Resume Prep", "Interview", "Salary negotiation"])
    );

    await AsyncStorage.setItem(
      "groups",
      JSON.stringify([
        {
          groupId: "1",
          name: "Bay Area Resume Review",
          location: "TODO",
          description:
            "Discuss resources, resumes, resume critiques, and any questions about your resume.",
          admins: ["andreeajitaru", "kaiyuren", "mirandaliu"],
          members: ["andreeajitaru", "kaiyuren", "mirandaliu", "landay"],
          norms: [
            "Be respectful!",
            "Be kind and supportive.",
            "No spam, please.",
          ],
        },
      ])
    );

    await AsyncStorage.setItem(
      "events",
      JSON.stringify([
        {
          groupId: "1",
          title: "",
          location: "",
          date: "",
          time: "",
          description: "",
          members: [],
        },
      ])
    );

    await AsyncStorage.setItem(
      "resources",
      JSON.stringify([
        {
          groupId: "1",
          title: "",
          author: "",
          content: "",
        },
      ])
    );

    await AsyncStorage.setItem(
      "chat",
      JSON.stringify([
        {
          groupId: "1",
          author: "",
          timestamp: "",
          content: "",
        },
      ])
    );
  } catch (error) {
    // Error saving data
  }
};

export const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem("user");
    return JSON.parse(user);
  } catch (error) {
    // Error saving data
  }
};

export const getUsersGroups = async (username) => {
  try {
    const groupsString = await AsyncStorage.getItem("groups");
    const groups = JSON.parse(groupsString);

    const usersGroups = groups.reduce((acc, group) => {
      if (group.members.includes(username)) {
        return [group, ...acc];
      } else {
        return acc;
      }
    }, []);

    return usersGroups;
  } catch (error) {
    // Error saving data
  }
};

export const getGoals = async () => {
  try {
    const goalsString = await AsyncStorage.getItem("goals");
    const goals = JSON.parse(goalsString);

    return goals;
  } catch (error) {
    // Error saving data
  }
};

export const getCategories = async () => {
  try {
    const catsString = await AsyncStorage.getItem("categories");
    const categories = JSON.parse(catsString);
    return categories;
  } catch (error) {
    console.log(error);
  }
};

export const updateGoal = async (newGoal) => {
  try {
    const goalsString = await AsyncStorage.getItem("goals");
    const goals = JSON.parse(goalsString);

    const updatedGoals = goals.reduce((acc, goal) => {
      if (goal.id == newGoal.id) {
        return [...acc, newGoal];
      } else {
        return [...acc, goal];
      }
    }, []);

    await AsyncStorage.setItem("goals", JSON.stringify(updatedGoals));
  } catch (error) {
    // Error saving data
  }
};

export const getAndIncrementNextGoalId = async () => {
  try {
    const nextID = await AsyncStorage.getItem("goalNextID");
    const incrID = JSON.parse(nextID) + 1;
    await AsyncStorage.setItem("goalNextID", JSON.stringify(incrID));
    return nextID;
  } catch (error) {
    console.log(error);
  }
};

export const addGoal = async (newGoal) => {
  try {
    const goalsString = await AsyncStorage.getItem("goals");
    const goals = goalsString ? JSON.parse(goalsString) : [];

    const updatedGoals = [...goals, newGoal];

    await AsyncStorage.setItem("goals", JSON.stringify(updatedGoals));
  } catch (error) {
    console.error(error);
  }
};

export const updateCategories = async (newCategory) => {
  try {
    const catsString = await AsyncStorage.getItem("categories");
    const categories = JSON.parse(catsString);

    const updatedCats = categories.reduce((acc, category) => {
      if (category.id == newCategory.id) {
        return [...acc, newCategory];
      } else {
        return [...acc, category];
      }
    }, []);

    await AsyncStorage.setItem("categories", JSON.stringify(updateCategories));
  } catch (error) {
    console.log(error);
  }
};
