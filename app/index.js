import { Redirect } from "expo-router";

import { setInitialData } from "@/database/db";

export default function App() {
  setInitialData();

  return <Redirect href="/feed" />;
}
