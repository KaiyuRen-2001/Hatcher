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
  getGroupResources,
  updateEvents,
  updateResources,
  getOtherGroups,
} from "@/database/db";

export const GoalsContext = createContext({});

export const StorageContextProvider = ({ children }) => {
  const [storageInitialized, setStorageInitialized] = useState(false);
  const [goals, setGoals] = useState([]);
  const [events, setEvents] = useState([]);
  const [resources, setResources] = useState([]);
  const [groups, setGroups] = useState([]);
  const [exploreGroups, setExploreGroups] = useState([]);
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

      const otherGroups = await getOtherGroups("landay");
      if (otherGroups) {
        setExploreGroups(otherGroups);
      }

      const categoriesData = await getCategories();
      if (categoriesData) {
        setCategories(categoriesData);
      }

      setStorageInitialized(true);
    };

    initializeStorage();
  }, []);

  const addUserToEvent = async (id, username) => {
    const updateEvents = events.reduce((acc, event) => {
      if (event.id == id) {
        const currMembers = event.members;
        console.log([
          ...acc,
          { members: [...currMembers, username], ...event },
        ]);
        return [...acc, { ...event, members: [...currMembers, username] }];
      }
      return [...acc, event];
    }, []);

    await setUpdatedEvents(updateEvents);
    setEvents(updateEvents);
  };

  const removeUserFromEvent = async (id, username) => {
    const updateEvents = events.reduce((acc, event) => {
      if (event.id == id) {
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

  const storageAddEvent = async (
    title,
    description,
    month,
    day,
    year,
    time,
    loc,
    groupName
  ) => {
    const newEvent = {
      id: events.length + 1,
      timestamp: Date.now(),
      groupName: groupName,
      title: title,
      location: loc,
      date: month.substring(0, 3) + " " + day + ", " + year,
      time: time,
      description: description,
      members: [],
    };

    updateEvents([...events, newEvent]);
    setEvents((e) => [...e, newEvent]);
  };

  const storageAddResource = async (
    title,
    description,
    link,
    groupName,
    userName
  ) => {
    const timestamp = Date.now();
    const date = "Dec 4, 2024";
    const time = "11:12pm";

    const newResource = {
      id: resources.length + 101,
      groupName: groupName,
      title: title,
      userName: userName,
      description: description,
      resourceUrl: link,
      date: date,
      time: time,
    };

    updateResources([...resources, newResource]);
    setResources((e) => [...e, newResource]);
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
        addUserToEvent,
        exploreGroups,
        getOrderedEventsAndResources,
        storageAddEvent,
        storageAddResource,
      }}
    >
      {children}
    </GoalsContext.Provider>
  );
};
