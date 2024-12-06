import Nav from "@/components/Nav";
import ListGroups from "@/app/tabs/explore/mapview";

export default function DrawerNav() {
  return <Nav name={"explore groups"} component={ListGroups} />;
}
