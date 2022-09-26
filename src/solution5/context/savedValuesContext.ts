import React from "react";
import { useStore } from "./store";
import { useAgeContext } from "./ageContext";
import { useNameContext } from "./nameContext";

export const useSavedValuesContext = () => {
    const { savedValues, dispatch } = useStore();
    const { age, resetAge } = useAgeContext();
    const { name, lastName, resetName, resetLastName } = useNameContext();

    const [savedValuesKeys, setSavedValuesKeys] = React.useState(Object.keys(savedValues));
    const memoizedValues = React.useMemo(() => savedValues, [savedValuesKeys]);

    const setSavedValue = () => {
        if (!name || !lastName || !age) return;
        dispatch((state) => {
            state.savedValues[name] = {
                name,
                lastName,
                age,
            }
            return state;
        });
        if(!savedValuesKeys.includes(name)){
            setSavedValuesKeys([...savedValuesKeys, name]);
        }
        resetAge();
        resetName();
        resetLastName();
    }

    const useGetSavedValue = (key: string) => {
        const savedValue = React.useSyncExternalStore(
            () => () => memoizedValues[key],
            React.useCallback(() => memoizedValues[key], [memoizedValues[key]])
        );
        return React.useMemo(() => savedValue, [savedValue]);
    }

    return {
        setSavedValue,
        savedValues: memoizedValues,
        getSavedValue: useGetSavedValue,
    };
};
