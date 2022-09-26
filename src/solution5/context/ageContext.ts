import React from "react";
import { useStore } from "./store";

export const useAgeContext = () => {
    const { inputs, dispatch } = useStore();
    const age = React.useSyncExternalStore(
        () => () => inputs.age,
        React.useCallback(() => inputs.age, [inputs.age])
    );

    const setAge = (age: number) => {
        if (typeof age !== 'number') return;
        dispatch((state) => {
            state.inputs.age = age;
            return state;
        });
    }

    const resetAge = () => {
        dispatch((state) => {
            state.inputs.age = undefined;
            return state;
        });
    }

    return { age, setAge, resetAge };
};