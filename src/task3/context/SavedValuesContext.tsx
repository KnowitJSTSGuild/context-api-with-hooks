import React from 'react';
import { useResetAge } from "./AgeContext";
import { useResetName } from "./NameContext";

interface IState {
  [name: string]: number;
}

interface IAction {
  type: string;
  value: {
    name: string;
    age: number;
  };
}

export const initialSavedValuesState: IState = {};

export const savedValuesReducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case "setSavedValue":
      state[action.value.name] = action.value.age;
      break;
  }
  // Need to destructure here if there are nested objects in the state, or the re-render wont fire.
  // If no nested objects, no need to destructure.
  return { ...state };
}

export const SavedValuesContext = React.createContext<{ state: IState, dispatch: React.Dispatch<IAction> }>({ state: initialSavedValuesState, dispatch: () => { } });

export const useSetSavedValue = () => {
  const { dispatch } = React.useContext(SavedValuesContext);

  // If this hook is called from inside the Name and Age providers, we can just call
  // these magically inside here
  const resetAge = useResetAge();
  const resetName = useResetName();

  const setSavedValue = (name?: string, age?: number) => {
    if (!name || !age) return;
    dispatch({
      type: "setSavedValue",
      value: { name, age }
    });
    resetAge();
    resetName();
  }

  return setSavedValue;
}