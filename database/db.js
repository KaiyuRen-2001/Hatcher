import AsyncStorage from "@react-native-async-storage/async-storage";

export const setInitialData = async () => {
  try {
    await AsyncStorage.setItem(
      "user",
      JSON.stringify({
        email: "user@user.com",
        name: "James Landay",
        id: 1,
      })
    );
    console.log("srt");
  } catch (error) {
    console.log("error");
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
