import React from 'react';
import { useAgeContext } from "./AgeContext";
import { useNameContext } from "./NameContext";

interface IState {
  [name: string]: number;
}

type TCallBack = (state: IState) => IState;

const initialSavedValuesState: IState = Object.freeze({});

const savedValuesReducer = (state: IState, callback: TCallBack): IState => Object.freeze(callback(state));

const SavedValuesContext = React.createContext<{ savedValuesState: IState, savedValuesDispatch: React.Dispatch<TCallBack> }>({ savedValuesState: initialSavedValuesState, savedValuesDispatch: () => { } });

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
    // Due to race conditions, need to assign these to variables or they will be reset before callback can use them
    const name = nameState.name;
    const age = ageState.age;
    savedValuesDispatch((state) => ({ ...state, [name]: age }));
    resetAge();
    resetName();
  }

  return { savedValuesState, SavedValuesContextProvider, setSavedValue };
}