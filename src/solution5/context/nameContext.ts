import React from "react";
import { useStore } from "./store";

export const useNameContext = () => {
    const { inputs, dispatch } = useStore();
    const name = React.useSyncExternalStore(
        () => () => inputs.name,
        React.useCallback(() => inputs.name, [inputs.name])
    );

    const lastName = React.useSyncExternalStore(
        () => () => inputs.lastName,
        React.useCallback(() => inputs.lastName, [inputs.lastName])
    );

    const setName = (name: string) => {
        dispatch((state) => {
            state.inputs.name = name;
            return state;
        });
    }

    const resetName = () => {
        dispatch((state) => {
            state.inputs.name = undefined;
            return state;
        });
    }

    const setLastName = (lastName: string) => {
        dispatch((state) => {
            state.inputs.lastName = lastName;
            return state;
        });
    }

    const resetLastName = () => {
        dispatch((state) => {
            state.inputs.lastName = undefined;
            return state;
        });
    }

    return { name, setName, resetName, lastName, setLastName, resetLastName };
};