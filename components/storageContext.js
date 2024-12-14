import { createContext, useState, useEffect } from "react";
import {
  getGoals,
  getEvents,
  getResources,
  getCategories,
  getUsersGroups,
  getOtherGroups,
  insertGoal,
  updateEvents,
  addEvent,
  addResource,
  updateResources,
  updateGroups,
  addGroup,
  updateCategories,
  updateGoals,
} from "@/database/dbSupabase";
import useSession from "@/utils/useSession";

export const GoalsContext = createContext({});

export const StorageContextProvider = ({ children }) => {
  const [storageInitialized, setStorageInitialized] = useState(false);
  const [goals, setGoals] = useState([]);
  const [events, setEvents] = useState([]);
  const [resources, setResources] = useState([]);
  const [groups, setGroups] = useState([]);
  const [exploreGroups, setExploreGroups] = useState([]);
  const [categories, setCategories] = useState([]);

  const session = useSession();

  useEffect(() => {
    const initializeStorage = async () => {
      //await initializeData();

      const data = await getGoals();
      if (data) {
        setGoals(data);
      }

      const eventsData = await getEvents();
      if (eventsData) {
        setEvents(eventsData);
        //console.log("line 40:", events);
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
    const updatedEvents = events.map((event) =>
      event.id == id
        ? { ...event, members: [...event.members, username] }
        : event
    );
    console.log(id);

    await updateEvents(updatedEvents);
    setEvents(updatedEvents);
  };

  const removeMemberFromGroup = async (group, username) => {
    const updatedGroup = groups.find((g) => g.name === group.name);

    /*const updatedGroup = {
      ...group,
      members: group.members.filter((member) => member !== username),
    };

    const updatedGroups = groups.filter((g) => g.groupId !== group.groupId);
    const updatedExploreGroups = [...exploreGroups, updatedGroup];

    await updateGroups([...updatedGroups, ...updatedExploreGroups]);
    setGroups(updatedGroups);
    setExploreGroups(updatedExploreGroups);*/
    if (updatedGroup) {
      // Remove the member from the group's members list
      const newMembersList = updatedGroup.members.filter(
        (member) => member !== username
      );

      // Update the group's members list
      updatedGroup.members = newMembersList;

      // Remove the group from the current list and add the updated group
      const updatedGroups = groups.filter((g) => g.name !== group.name);

      // Update explore groups
      const updatedExploreGroups = exploreGroups.filter(
        (g) => g.name !== group.name
      );
      updatedExploreGroups.push(updatedGroup);

      // Update the state and persist the changes
      await updateGroups([...updatedGroups, ...updatedExploreGroups]);
      setGroups(updatedGroups);
      setExploreGroups(updatedExploreGroups);
    } else {
      console.error(`Group with name "${group.name}" not found.`);
    }
  };

  const addMemberToGroup = async (group, username) => {
    /*const updatedGroup = { ...group, members: [...group.members, username] };

    const updatedGroups = [...groups, updatedGroup];
    const updatedExploreGroups = exploreGroups.filter(
      (g) => g.groupId !== group.groupId
    );

    await updateGroups([...updatedGroups, ...updatedExploreGroups]);
    setGroups(updatedGroups);
    setExploreGroups(updatedExploreGroups);*/
    const updatedGroup = exploreGroups.find((g) => g.name == group.name);
    console.log(updatedGroup);
    if (updatedGroup) {
      // Add the new member to the group's members list
      updatedGroup.members = [...updatedGroup.members, username];

      // Update the groups list
      const updatedGroups = [...groups, updatedGroup];

      console.log(updatedGroups);

      // Update explore groups
      const updatedExploreGroups = exploreGroups.filter(
        (g) => g.name !== group.name
      );

      console.log(updatedExploreGroups);

      // Update the state and persist the changes
      setGroups(updatedGroups);
      setExploreGroups(updatedExploreGroups);
      await updateGroups([...updatedGroups, ...updatedExploreGroups]);
      console.log("updated groups: ", groups);
    } else {
      console.error(`Group with name "${groupName}" not found.`);
    }
  };

  const removeUserFromEvent = async (id, username) => {
    const updatedEvents = events.map((event) =>
      event.id == id
        ? {
            ...event,
            members: event.members.filter((member) => member !== username),
          }
        : event
    );

    await updateEvents(updatedEvents);
    setEvents(updatedEvents);
  };

  const storageUpdateGoal = async (newGoal) => {
    const updatedGoals = goals.map((goal) =>
      goal.id == newGoal.id ? newGoal : goal
    );
    await updateGoals(updatedGoals);
    setGoals(updatedGoals);
  };

  const storageDeleteGoal = async (goalId) => {
    const updatedGoals = goals.filter((goal) => goal.id != goalId);
    await updateGoals(updatedGoals);
    setGoals(updatedGoals);
  };

  const getOrderedEventsAndResources = () => {
    const groupNames = groups.map((g) => g.name);
    console.log("groupNames: ", groupNames);
    console.log("events: ", events);

    const eventsForUser = events
      .filter((event) => groupNames.includes(event.groupName))
      .map((event) => ({ ...event, type: "event" })); // Add `type: "event"`

    console.log("eventsForUser in getOrdered", eventsForUser);

    const resourcesForUser = resources
      .filter((resource) => groupNames.includes(resource.groupName))
      .map((resource) => ({ ...resource, type: "resource" })); // Add `type: "resource"`

    return [...eventsForUser, ...resourcesForUser].sort((a, b) => {
      const dateDiff = new Date(b.date) - new Date(a.date);
      if (dateDiff != 0) {
        return dateDiff;
      }

      return new Date(b.time) - new Date(a.time);
    });
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
    // Validate and format the date string (ensure it's zero-padded for MM and DD)
    const formattedMonth = month.padStart(2, "0"); // Ensure MM is zero-padded
    const formattedDay = day.padStart(2, "0"); // Ensure DD is zero-padded
    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

    const newEvent = {
      id: events.length + 1,
      groupName,
      title,
      location: loc,
      date: formattedDate,
      time,
      description,
      members: [session.user.username],
    };

    const updatedEvents = [...events, newEvent];
    await addEvent(newEvent);
    setEvents(updatedEvents);
  };

  const storageAddResource = async (
    title,
    description,
    link,
    groupName,
    userName
  ) => {
    const newResource = {
      id: resources.length + 101,
      groupName,
      title,
      userName,
      description,
      resourceUrl: link,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString().slice(0, -3),
    };

    const updatedResources = [...resources, newResource];
    await addResource(newResource);
    setResources(updatedResources);
  };

  const getGroupByName = (name) => {
    return (
      groups.find((group) => group.name === name) ||
      exploreGroups.find((group) => group.name === name)
    );
  };

  const storageAddGroup = async (
    name,
    city,
    state,
    description,
    username,
    norms
  ) => {
    const newGroup = {
      id: groups.length + exploreGroups.length + 1,
      name,
      location: `${city}, ${state}`,
      description,
      admins: [username],
      members: [username],
      norms: norms.split(/\r?\n/),
      goals: [],
    };

    const updatedGroups = [...groups, newGroup];
    const updatedExploreGroups = [...exploreGroups];

    await addGroup(newGroup);
    setGroups(updatedGroups);
  };

  const storageAddGoal = async (newGoal) => {
    /*const id = await fetchAndIncrementNextGoalId();
    newGoal.id = id;*/
    await insertGoal(newGoal);

    const updatedGoals = await getGoals();
    setGoals(updatedGoals);
  };

  const storageUpdateCategories = async (newCategories) => {
    await updateCategoryList(newCategories);
    const updatedCategories = await fetchCategories();
    setCategories(updatedCategories);
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
        storageDeleteGoal,
        removeUserFromEvent,
        addUserToEvent,
        exploreGroups,
        getOrderedEventsAndResources,
        storageAddEvent,
        storageAddResource,
        addMemberToGroup,
        removeMemberFromGroup,
        getGroupByName,
      }}
    >
      {children}
    </GoalsContext.Provider>
  );
};

// import { createContext, useState, useEffect } from "react";
// import {
//   updateGoal,
//   updateGoals,
//   setUpdatedEvents,
//   getGoals,
//   getEvents,
//   getResources,
//   setInitialData,
//   getCategories,
//   updateCategories,
//   addGoal,
//   getAndIncrementNextGoalId,
//   getUsersGroups,
//   updateGroups,
//   getGroupResources,
//   updateEvents,
//   updateResources,
//   getOtherGroups,
// } from "@/database/db";

// export const GoalsContext = createContext({});

// export const StorageContextProvider = ({ children }) => {
//   const [storageInitialized, setStorageInitialized] = useState(false);
//   const [goals, setGoals] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [resources, setResources] = useState([]);
//   const [groups, setGroups] = useState([]);
//   const [exploreGroups, setExploreGroups] = useState([]);
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const initializeStorage = async () => {
//       await setInitialData();

//       const data = await getGoals();
//       if (data) {
//         setGoals(data);
//       }

//       const eventsData = await getEvents();
//       if (eventsData) {
//         setEvents(eventsData);
//       }

//       const resourcesData = await getResources();
//       if (resourcesData) {
//         setResources(resourcesData);
//       }

//       const myGroups = await getUsersGroups("landay");
//       if (myGroups) {
//         setGroups(myGroups);
//       }

//       const otherGroups = await getOtherGroups("landay");
//       if (otherGroups) {
//         setExploreGroups(otherGroups);
//       }

//       const categoriesData = await getCategories();
//       if (categoriesData) {
//         setCategories(categoriesData);
//       }

//       setStorageInitialized(true);
//     };

//     initializeStorage();
//   }, []);

//   const addUserToEvent = async (id, username) => {
//     const updateEvents = events.reduce((acc, event) => {
//       if (event.id == id) {
//         const currMembers = event.members;
//         console.log([
//           ...acc,
//           { members: [...currMembers, username], ...event },
//         ]);
//         return [...acc, { ...event, members: [...currMembers, username] }];
//       }
//       return [...acc, event];
//     }, []);

//     await setUpdatedEvents(updateEvents);
//     setEvents(updateEvents);
//   };

//   const removeMemberFromGroup = async (group, username) => {
//     const currMembers = group.members;
//     const userIndex = currMembers.indexOf(username);
//     currMembers.splice(userIndex, 1);

//     const updatedGroup = { ...group, members: currMembers };
//     const updatedExploreGroups = [...exploreGroups, updatedGroup];

//     const updatedGroups = groups.reduce((acc, currGroup) => {
//       if (currGroup.groupId == group.groupId) {
//         return acc;
//       }
//       return [...acc, currGroup];
//     }, []);

//     updateGroups([...updatedExploreGroups, ...updatedGroups]);
//     setGroups(updatedGroups);
//     setExploreGroups(updatedExploreGroups);
//   };

//   const addMemberToGroup = async (group, username) => {
//     const currMembers = group.members;
//     const updatedGroup = { ...group, members: [...currMembers, username] };
//     const updatedGroups = [...groups, updatedGroup];

//     const updatedExploreGroups = exploreGroups.reduce((acc, currGroup) => {
//       if (currGroup.groupId == group.groupId) {
//         return acc;
//       }
//       return [...acc, currGroup];
//     }, []);
//     console.log(updatedExploreGroups);

//     updateGroups([...updatedExploreGroups, ...updatedGroups]);
//     setGroups(updatedGroups);
//     setExploreGroups(updatedExploreGroups);
//   };

//   const removeUserFromEvent = async (id, username) => {
//     const updateEvents = events.reduce((acc, event) => {
//       if (event.id == id) {
//         const currMembers = event.members;
//         const userIndex = currMembers.indexOf(username);
//         currMembers.splice(userIndex, 1);
//         return [...acc, { members: currMembers, ...event }];
//       }
//       return [...acc, event];
//     }, []);

//     console.log(updateEvents);
//     await setUpdatedEvents(updateEvents);
//     setEvents(updateEvents);
//   };

//   const storageUpdateGoal = async (newGoal) => {
//     await updateGoal(newGoal);
//     const newGoals = await getGoals();
//     setGoals(newGoals);
//   };

//   const storageDeleteGoal = async (goalId) => {
//     try {
//       // Get current goals
//       const currentGoals = await getGoals();

//       // Filter out the goal to delete
//       const updatedGoals = currentGoals.filter((goal) => goal.id != goalId);

//       // Update the goals in storage
//       await updateGoals(updatedGoals);

//       // Update state
//       setGoals(updatedGoals);

//       console.log(`Goal with ID ${goalId} deleted successfully.`);
//       return true;
//     } catch (error) {
//       console.error("Error deleting goal:", error);
//       return false;
//     }
//   };

//   const getOrderedEventsAndResources = () => {
//     const groupNames = groups.map((g) => g.name);

//     const eventsForUser = events.reduce((acc, event) => {
//       if (groupNames.includes(event.groupName)) {
//         return [...acc, { type: "event", ...event }];
//       }
//       return acc;
//     }, []);

//     const resourcesForUser = resources.reduce((acc, resource) => {
//       if (groupNames.includes(resource.groupName)) {
//         return [...acc, { type: "resource", ...resource }];
//       }
//       return acc;
//     }, []);

//     const all = [...eventsForUser, ...resourcesForUser];

//     const sorted = all.sort(function (a, b) {
//       return a.timestamp - b.timestamp;
//     });

//     return sorted;
//   };

//   const storageAddEvent = async (
//     title,
//     description,
//     month,
//     day,
//     year,
//     time,
//     loc,
//     groupName
//   ) => {
//     const newEvent = {
//       id: events.length + 1,
//       timestamp: Date.now(),
//       groupName: groupName,
//       title: title,
//       location: loc,
//       date: month.substring(0, 3) + " " + day + ", " + year,
//       time: time,
//       description: description,
//       members: [],
//     };

//     updateEvents([...events, newEvent]);
//     setEvents((e) => [...e, newEvent]);
//   };

//   const storageAddResource = async (
//     title,
//     description,
//     link,
//     groupName,
//     userName
//   ) => {
//     const timestamp = Date.now();
//     const date = "Dec 4, 2024";
//     const time = "11:12pm";

//     const newResource = {
//       id: resources.length + 101,
//       groupName: groupName,
//       title: title,
//       userName: userName,
//       description: description,
//       resourceUrl: link,
//       date: date,
//       time: time,
//     };

//     updateResources([...resources, newResource]);
//     setResources((e) => [...e, newResource]);
//   };

//   const getGroupByName = (name) => {
//     const ownGroup = groups.reduce((acc, group) => {
//       if (acc) {
//         return acc;
//       }
//       if (group.name == name) {
//         return group;
//       }

//       return null;
//     }, null);

//     if (ownGroup) {
//       return ownGroup;
//     }

//     return exploreGroups.reduce((acc, group) => {
//       if (acc) {
//         return acc;
//       }
//       if (group.name == name) {
//         return group;
//       }

//       return null;
//     }, null);
//   };

//   const storageAddGroup = async (
//     name,
//     city,
//     state,
//     description,
//     username,
//     norms
//   ) => {
//     const normsList = norms.split(/\r?\n/);
//     const newGroup = {
//       groupId: groups.length + exploreGroups.length + 1,
//       name: name,
//       location: city + ", " + state,
//       description: description,
//       admins: [username],
//       members: [username],
//       norms: normsList,
//       goals: [],
//     };

//     updateGroups([...exploreGroups, ...groups, newGroup]);
//     setGroups((g) => [...g, newGroup]);
//   };

//   const storageAddGoal = async (newGoal) => {
//     const id = await getAndIncrementNextGoalId();
//     newGoal.id = id;
//     console.log(newGoal.id);
//     await addGoal(newGoal);
//     const goals = await getGoals();
//     if (goals) {
//       setGoals(goals);
//     }
//   };

//   const storageUpdateCategories = async (newCategory) => {
//     await updateCategories(newCategory);
//   };

//   return (
//     <GoalsContext.Provider
//       value={{
//         goals,
//         categories,
//         events,
//         resources,
//         groups,
//         storageInitialized,
//         storageUpdateGoal,
//         storageUpdateCategories,
//         storageAddGoal,
//         storageAddGroup,
//         storageDeleteGoal,
//         removeUserFromEvent,
//         addUserToEvent,
//         exploreGroups,
//         getOrderedEventsAndResources,
//         storageAddEvent,
//         storageAddResource,
//         addMemberToGroup,
//         removeMemberFromGroup,
//         getGroupByName,
//       }}
//     >
//       {children}
//     </GoalsContext.Provider>
//   );
// };
