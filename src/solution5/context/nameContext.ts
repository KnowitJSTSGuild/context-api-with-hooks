import { useStore } from "./store";

export const useNameContext = () => {
  const { state, dispatch } = useStore();
  const name = state.inputs.name;
  const lastName = state.inputs.lastName;

  const setName = (name: string) => {
    dispatch((state) => {
      state.inputs.name = name;
      return state;
    });
  };

  const resetName = () => {
    dispatch((state) => {
      state.inputs.name = undefined;
      return state;
    });
  };

  const setLastName = (lastName: string) => {
    dispatch((state) => {
      state.inputs.lastName = lastName;
      return state;
    });
  };

  const resetLastName = () => {
    dispatch((state) => {
      state.inputs.lastName = undefined;
      return state;
    });
  };

  return { name, setName, resetName, lastName, setLastName, resetLastName };
};
