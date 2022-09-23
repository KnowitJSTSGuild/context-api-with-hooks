import React from 'react';
import { useAgeContext } from "./AgeContext";
import { useNameContext } from "./NameContext";

interface IState {
  [name: string]: {
    name: string;
    lastName: string;
    age: number;
  };
}

type TCallBack = (state: IState) => IState;

const initialSavedValuesState: IState = {};

const savedValuesReducer = (state: IState, callback: TCallBack): IState => callback(state);

const SavedValuesContext = React.createContext<{ savedValuesState: IState, savedValuesDispatch: React.Dispatch<TCallBack> }>({ savedValuesState: initialSavedValuesState, savedValuesDispatch: () => { } });



export const useSavedValuesContext = () => {
  const { age, resetAge } = useAgeContext();
  const { name, lastName, resetName, resetLastName } = useNameContext();

  const SavedValuesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = React.useReducer(savedValuesReducer, initialSavedValuesState);
    return (
      <SavedValuesContext.Provider value={{ savedValuesState: state, savedValuesDispatch: dispatch }}>
        {children}
      </SavedValuesContext.Provider>
    );
  }

  const { savedValuesState, savedValuesDispatch } = React.useContext(SavedValuesContext);
  const [keys, setKeys] = React.useState(Object.keys(savedValuesState));
  const memoizedState = React.useMemo(() => savedValuesState, [keys]);

  const setSavedValue = () => {
    if (!name || !lastName || !age) return;
    savedValuesDispatch((state) => {
      state[name] = {
        name,
        lastName,
        age,
      }
      return state;
    });
    if (!keys.includes(name)) {
      setKeys([...keys, name]);
    }
    resetAge();
    resetName();
    resetLastName();
  }
  return { savedValuesState: memoizedState, SavedValuesContextProvider, setSavedValue, keys };
}

export const useGetSavedValues = () => {
  const { savedValuesState, keys } = useSavedValuesContext();
  const savedValues = React.useSyncExternalStore(() => () => savedValuesState, React.useCallback(() => savedValuesState, [keys]));
  return React.useMemo(() => ({ savedValues }), [keys]);
}

export const useGetSavedValue = (key: string) => {
  const { savedValuesState } = useSavedValuesContext();
  const savedValue = React.useSyncExternalStore(() => () => savedValuesState[key], React.useCallback(() => savedValuesState[key], [savedValuesState[key]]));
  return React.useMemo(() => ({ savedValue }), [savedValue]);
}