import { createContext, useState, useEffect } from "react";
import { updateGoal, getGoals, setInitialData } from "@/database/db";

export const GoalsContext = createContext({});

export const StorageContextProvider = ({ children }) => {
  const [storageInitialized, setStorageInitialized] = useState(false);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    setInitialData().then(() => {
      getGoals().then((data) => {
        if (data) {
          setGoals(data);
        }
        setStorageInitialized(true);
      });
    });
  }, []);

  const storageUpdateGoal = async (newGoal) => {
    await updateGoal(newGoal);
    const newGoals = await getGoals();
    setGoals(newGoals);
  };

  return (
    <GoalsContext.Provider
      value={{
        goals,
        storageInitialized,
        storageUpdateGoal,
      }}
    >
      {children}
    </GoalsContext.Provider>
  );
};
