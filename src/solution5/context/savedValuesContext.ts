import { useStore } from "./store";
import { useAgeContext } from "./ageContext";
import { useNameContext } from "./nameContext";

export const useSavedValuesContext = () => {
  const { state, dispatch } = useStore();
  const { age, resetAge } = useAgeContext();
  const { name, lastName, resetName, resetLastName } = useNameContext();
  
  const savedValues = state.savedValues;

  const setSavedValue = () => {
    if (!name || !lastName || !age) return;
    dispatch((state) => {
      state.savedValues[name] = {
        name,
        lastName,
        age,
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
