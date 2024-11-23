import Nav from "@/components/Nav";
import Profile from "@/app/tabs/profile/myprofile";

export default function DrawerNav() {
  return <Nav name={"My Profile"} component={Profile} />;
}
