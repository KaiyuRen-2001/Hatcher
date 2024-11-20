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
        picture: "@/assets/user.png",
      })
    );

    await AsyncStorage.setItem(
      "goals",
      JSON.stringify([
        { name: "Add skills section", catagory: "Resume Prep", confidence: 0 },
        {
          id: 1,
          name: "Learn my greatest weakness",
          catagory: "Interview",
          confidence: 0,
        },
      ])
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
