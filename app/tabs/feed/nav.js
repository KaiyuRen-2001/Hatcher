import Nav from "@/components/Nav";
import Home from "@/app/tabs/feed/home";
import { Image, View } from "react-native";

export default function DrawerNav() {
  return (
    <Nav
      name={"hatcher"}
      component={Home}
      source={require("@/assets/james.png")}
    />
  );
}
