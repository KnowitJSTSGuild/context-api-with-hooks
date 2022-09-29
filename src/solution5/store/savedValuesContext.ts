import React from "react";
import { useStore } from "./store";
import { useAgeContext } from "./ageContext";
import { useNameContext } from "./nameContext";

export const useSavedValuesContext = () => {
  const { dispatch, useSelector } = useStore();
  // Note that subscribing to these causes the table to re-render
  const { age, resetAge } = useAgeContext();
  const { name, lastName, resetName, resetLastName } = useNameContext();

  const savedValues = useSelector(
    React.useCallback((state) => state.savedValues, [])
  );

  const setSavedValue = () => {
    if (!name || !lastName || !age) return;
    dispatch((state) => {
      /* 
      * This is necessary if we want to call the listener for savedValues.
      */
      state.savedValues = {
        ...state.savedValues,
        [name]: {
          name,
          lastName,
          age,
        },
      };
      return state;
    });
    resetAge();
    resetName();
    resetLastName();
  };

  const useGetSavedValue = (key: string) => {
    return savedValues[key];
  };

  return {
    setSavedValue,
    savedValues,
    getSavedValue: useGetSavedValue,
  };
};
