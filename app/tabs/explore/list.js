import { StyleSheet, View } from "react-native";

import Theme from "@/assets/theme";
import Loading from "@/components/Loading";

import useSession from "@/utils/useSession";

export default function ListGroups() {
  const session = useSession();

  if (!session) {
    return <Loading />;
  }

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.backgroundPrimary,
  },
});
