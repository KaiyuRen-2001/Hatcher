import { Stack } from "expo-router";
import { StorageContextProvider } from "@/components/storageContext";

export default function Layout() {
  return (
    <StorageContextProvider>
      <Stack>
        <Stack.Screen name="tabs" options={{ headerShown: false }} />
      </Stack>
    </StorageContextProvider>
  );
}
