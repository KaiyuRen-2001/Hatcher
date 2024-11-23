import Nav from "@/components/Nav";
import ListGroups from "@/app/tabs/explore/list";

export default function DrawerNav() {
  return <Nav name={"Explore New Groups"} component={ListGroups} />;
}
