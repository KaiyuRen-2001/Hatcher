import { AppState } from "react-native";
import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";

const supabaseUrl = "https://aegxkhoyyhuppcjxkojs.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlZ3hraG95eWh1cHBjanhrb2pzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4ODE3MDIsImV4cCI6MjA0OTQ1NzcwMn0.VWK0pHuSN5qlYVo9y7NRi83Bu2VGiuN-Tm37Ef1r3d8";
export const db = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    db.auth.startAutoRefresh();
  } else {
    db.auth.stopAutoRefresh();
  }
});

//export default db;
//useEffect(, [])

// Utility functions for interacting with Supabase
const fetchFromTable = async (table) => {
  console.log("fetching from table: ", table);
  const { data, error } = await db.from(table).select();
  if (error) throw new Error(error.message);
  console.log(data);
  return data;
};

const updateTable = async (table, id, updates) => {
  const { error } = await db.from(table).update(updates).eq("id", id);
  if (error) throw new Error(error.message);
};

const insertIntoTable = async (table, values) => {
  const { error } = await db.from(table).insert(values);
  if (error) throw new Error(error.message);
};

const deleteFromTable = async (table, id) => {
  const { error } = await db.from(table).delete().eq("id", id);
  if (error) throw new Error(error.message);
};

export const updateEvents = async (newEvents) => {
  for (const event of newEvents) {
    await updateTable("events", event.id, event);
  }
};

export const updateGroups = async (newGroups) => {
  for (const group of newGroups) {
    await updateTable("groups", group.groupId, group);
  }
};

export const getOtherGroups = async (username) => {
  const groups = await fetchFromTable("groups");
  return groups.filter((group) => !group.members.includes(username));
};

export const getUser = async () => {
  const users = await fetchFromTable("users");
  return users.length > 0 ? users[0] : null;
};

export const updateResources = async (updatedResources) => {
  for (const resource of updatedResources) {
    await updateTable("resources", resource.id, resource);
  }
};

export const getUsersGroups = async (username) => {
  const groups = await fetchFromTable("groups");
  return groups.filter((group) => group.members.includes(username));
};

export const getEvents = async () => {
  (async () => {
    try {
      const events = await fetchFromTable("events");
      console.log("Test fetch successful:", events);
      return events;
    } catch (error) {
      console.error("Test fetch failed:", error.message);
    }
  })();
  /*const events = await fetchFromTable("events");
  console.log(events);
  return events;*/
};

export const getResources = async () => {
  return await fetchFromTable("resources");
};

export const getGoals = async () => {
  return await fetchFromTable("goals");
};

export const getCategories = async () => {
  return await fetchFromTable("categories");
};

export const updateGoals = async (newGoals) => {
  for (const goal of newGoals) {
    await updateTable("goals", goal.id, goal);
  }
};

export const updateGoal = async (newGoal) => {
  await updateTable("goals", newGoal.id, newGoal);
};

// export const getAndIncrementNextGoalId = async () => {
//   const nextIdRecord = await fetchFromTable("goalNextID");
//   const nextId = nextIdRecord[0]?.id || 1;

//   await updateTable("goalNextID", nextId, { id: nextId + 1 });
//   return nextId;
// };

export const addGoal = async (newGoal) => {
  await insertIntoTable("goals", newGoal);
};

export const updateCategories = async (newCategory) => {
  for (const category of newCategory) {
    await updateTable("categories", category.id, category);
  }
};
