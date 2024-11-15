export const setInitialData = async () => {
  try {
    await AsyncStorage.setItem("user", {
      email: "user@user.com",
      name: "James Landay",
      id: 1,
    });
  } catch (error) {
    // Error saving data
  }
};

export const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem("user");
    return user;
  } catch (error) {
    // Error saving data
  }
};
