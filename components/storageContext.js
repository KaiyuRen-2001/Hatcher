import { createContext, useState, useEffect } from "react";
import {
  updateGoal,
  setUpdatedEvents,
  getGoals,
  getEvents,
  getResources,
  setInitialData,
  getCategories,
  updateCategories,
  addGoal,
  getAndIncrementNextGoalId,
  getUsersGroups,
  updateGroups,
} from "@/database/db";

export const GoalsContext = createContext({});

export const StorageContextProvider = ({ children }) => {
  const [storageInitialized, setStorageInitialized] = useState(false);
  const [goals, setGoals] = useState([]);
  const [events, setEvents] = useState([]);
  const [resources, setResources] = useState([]);
  const [groups, setGroups] = useState([]);
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

      const resourcesData = await getResources();
      if (resourcesData) {
        setResources(resourcesData);
      }

      const myGroups = await getUsersGroups("landay");
      if (myGroups) {
        setGroups(myGroups);
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

  const getOrderedEventsAndResources = () => {
    const groupNames = groups.map((g) => g.name);

    const eventsForUser = events.reduce((acc, event) => {
      if (groupNames.includes(event.groupName)) {
        return [...acc, { type: "event", ...event }];
      }
      return acc;
    }, []);

    const resourcesForUser = resources.reduce((acc, resource) => {
      if (groupNames.includes(resource.groupName)) {
        return [...acc, { type: "resource", ...resource }];
      }
      return acc;
    }, []);

    const all = [...eventsForUser, ...resourcesForUser];

    const sorted = all.sort(function (a, b) {
      return a.timestamp - b.timestamp;
    });

    return sorted;
  };

  const storageAddGroup = async (
    name,
    city,
    state,
    description,
    username,
    norms
  ) => {
    const normsList = norms.split(/\r?\n/);
    const newGroup = {
      groupId: groups.length + 1,
      name: name,
      location: city + ", " + state,
      description: description,
      admins: [username],
      members: [username],
      norms: normsList,
    };

    updateGroups([...groups, newGroup]);
    setGroups((g) => [...g, newGroup]);
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
        resources,
        groups,
        storageInitialized,
        storageUpdateGoal,
        storageUpdateCategories,
        storageAddGoal,
        storageAddGroup,
        removeUserFromEvent,
        getOrderedEventsAndResources,
      }}
    >
      {children}
    </GoalsContext.Provider>
  );
};
