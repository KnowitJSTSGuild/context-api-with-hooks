import React from 'react';
import { useAgeContext } from "./AgeContext";
import { useNameContext } from "./NameContext";

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

const initialSavedValuesState: IState = {};

const savedValuesReducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case "setSavedValue":
      state[action.value.name] = action.value.age;
      break;
  }
  return { ...state };
}

const SavedValuesContext = React.createContext<{ savedValuesState: IState, savedValuesDispatch: React.Dispatch<IAction> }>({ savedValuesState: initialSavedValuesState, savedValuesDispatch: () => { } });

export const useSavedValuesContext = () => {
  const { ageState, resetAge } = useAgeContext();
  const { nameState, resetName } = useNameContext();

  const SavedValuesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = React.useReducer(savedValuesReducer, initialSavedValuesState);
    return (
      <SavedValuesContext.Provider value={{ savedValuesState: state, savedValuesDispatch: dispatch }}>
        {children}
      </SavedValuesContext.Provider>
    );
  }

  const { savedValuesState, savedValuesDispatch } = React.useContext(SavedValuesContext);

  const setSavedValue = () => {
    if (!nameState.name || !ageState.age) return;
    savedValuesDispatch({
      type: "setSavedValue",
      value: { name: nameState.name, age: ageState.age }
    });
    resetAge();
    resetName();
  }

  return { savedValuesState, SavedValuesContextProvider, setSavedValue };
}