import { createContext, useState, useEffect } from "react";
import {
  updateGoal,
  setUpdatedEvents,
  getGoals,
  getEvents,
  setInitialData,
  getCategories,
  updateCategories,
  addGoal,
  getAndIncrementNextGoalId,
} from "@/database/db";

export const GoalsContext = createContext({});

export const StorageContextProvider = ({ children }) => {
  const [storageInitialized, setStorageInitialized] = useState(false);
  const [goals, setGoals] = useState([]);
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);

  /* useEffect(() => {
    setInitialData().then(() => {
      getGoals().then((data) => {
        if (data) {
          setGoals(data);
        }
        setStorageInitialized(true);
      });
    });
  }, []);*/

  useEffect(() => {
    const initializeStorage = async () => {
      await setInitialData();

      const data = await getGoals();
      if (data) {
        setGoals(data);
      }

      const eventsData = await getEvents();
      if (eventsData) {
        setEvents(eventsData);
      }

      const categoriesData = await getCategories();
      if (categoriesData) {
        setCategories(categoriesData);
      }

      setStorageInitialized(true);
    };

    initializeStorage();
  }, []);

  const removeUserFromEvent = async (id, username) => {
    const updateEvents = events.reduce((acc, event) => {
      if (event.id === id) {
        const currMembers = event.members;
        const userIndex = currMembers.indexOf(username);
        currMembers.splice(userIndex, 1);
        return [...acc, { members: currMembers, ...event }];
      }
      return [...acc, event];
    }, []);

    console.log(updateEvents);
    await setUpdatedEvents(updateEvents);
    setEvents(updateEvents);
  };

  const storageUpdateGoal = async (newGoal) => {
    await updateGoal(newGoal);
    const newGoals = await getGoals();
    setGoals(newGoals);
  };

  const storageAddGoal = async (newGoal) => {
    const id = await getAndIncrementNextGoalId();
    newGoal.id = id;
    console.log(newGoal.id);
    await addGoal(newGoal);
    const goals = await getGoals();
    if (goals) {
      setGoals(goals);
    }
  };

  const storageUpdateCategories = async (newCategory) => {
    await updateCategories(newCategory);
  };

  return (
    <GoalsContext.Provider
      value={{
        goals,
        categories,
        events,
        storageInitialized,
        storageUpdateGoal,
        storageUpdateCategories,
        storageAddGoal,
        removeUserFromEvent,
      }}
    >
      {children}
    </GoalsContext.Provider>
  );
};
