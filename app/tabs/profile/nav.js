import Nav from "@/components/Nav";
import Profile from "@/app/tabs/profile/myprofile";
import { StyleSheet } from "react-native";

export default function DrawerNav() {
  return (
    <Nav name={"My Profile"} component={Profile} style={styles.container} />
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: "PTSansCaption-Bold",
  },
});
