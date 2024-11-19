import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { useRouter } from "expo-router";

import Theme from "@/assets/theme";
import Feed from "@/components/Feed";
import Loading from "@/components/Loading";

import useSession from "@/utils/useSession";

export default function Profile() {
  const session = useSession();
  const router = useRouter();

  const signOut = async () => {
    try {
      /*const { error } = await db.auth.signOut();
      if (error) {
        Alert.alert(error.message);
      } else {
        router.navigate("/");
        Alert.alert("Sign out successful.");
      }*/
    } catch (err) {
      console.log(err);
    }
  };

  if (!session) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image
          style={styles.profilePicture}
          source={require("@/assets/user.png")} // TODO do not hard code
        ></Image>
        <View style={styles.userTextContainer}>
          <Text style={styles.title}>{session.user.username}</Text>
          <Text style={styles.text}>{session.user.name}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => router.navigate("/tabs/profile/newgoal")}
      >
        <View style={styles.postButton}>
          <FontAwesome size={32} name="plus" color={Theme.colors.textPrimary} />
        </View>
      </TouchableOpacity>
      <Text style={[styles.title, styles.postTitle]}>My Posts</Text>
      <Feed
        navigateToComments={"/tabs/profile/details"}
        fetchUsersPostsOnly={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  profilePicture: {
    width: "40%",
    padding: 8,
    aspectRatio: 1,
  },
  postTitle: {
    padding: 12,
  },
  userContainer: {
    width: "100%",
    flexDirection: "row",
    marginTop: 12,
    alignItems: "center",
    paddingHorizontal: 12,
  },
  userTextContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 8,
    marginLeft: 8,
  },
  title: {
    color: Theme.colors.textPrimary,
    fontSize: Theme.sizes.textLarge,
    fontWeight: "bold",
  },
  text: {
    color: Theme.colors.textPrimary,
    fontSize: Theme.sizes.textMedium,
  },
  buttonText: {
    fontWeight: "bold",
    color: Theme.colors.textHighlighted,
    fontSize: Theme.sizes.textMedium,
  },
});
