import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { useRouter } from "expo-router";

import Theme from "@/assets/theme";
import Feed from "@/components/Feed";
import Loading from "@/components/Loading";

import useSession from "@/utils/useSession";

export default function Profile() {
  const session = useSession();
  const router = useRouter();

  const [goals, setGoals] = useState([]);

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
      <View style={styles.goalsTitle}>
        <Text style={styles.goalsTitleText}>Goals</Text>
        <TouchableOpacity
          onPress={() => router.navigate("/tabs/profile/newgoal")}
        >
          <View style={styles.postButton}>
            <FontAwesome
              size={32}
              name="plus"
              color={Theme.colors.textPrimary}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.feed}>
        {goals.length ? (
          <Text style={styles.text}>Goals here</Text>
        ) : (
          <Text style={styles.text}>Click + to add goals.</Text>
        )}
      </View>
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
  goalsTitle: {
    flexDirection: "row",
    padding: 16,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  feed: {
    paddingLeft: 32,
    flexDirection: "row",
    justifyContent: "flex-start",
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
    fontSize: Theme.sizes.textExtraLarge,
    fontWeight: "bold",
  },
  goalsTitleText: {
    color: Theme.colors.textPrimary,
    fontSize: Theme.sizes.textExtraLarge,
    fontWeight: "bold",
    marginRight: 8,
  },
  text: {
    color: Theme.colors.textPrimary,
    fontSize: Theme.sizes.textLarge,
  },
  buttonText: {
    fontWeight: "bold",
    color: Theme.colors.textHighlighted,
    fontSize: Theme.sizes.textMedium,
  },
});
