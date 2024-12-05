import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import GroupComponent from "@/components/GroupComponent";

export default function Details(props) {
  const [group, setGroup] = useState(props.group);

  if (!group) {
    const route = useRoute();
    const groupFromRoute = route.params.group;
    setGroup(() => JSON.parse(groupFromRoute));
    console.log("route group: ", group);
  }
  return <GroupComponent group={group} />;
}
