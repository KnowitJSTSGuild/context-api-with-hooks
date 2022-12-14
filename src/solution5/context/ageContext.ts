import { useStore } from "./store";

export const useAgeContext = () => {
    const { state, dispatch } = useStore();
    const age = state.inputs.age;

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