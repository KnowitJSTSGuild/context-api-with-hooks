import React from 'react';
import { savedValuesReducer, initialSavedValuesState, SavedValuesContext } from "./SavedValuesContext";
import { nameReducer, initialNameState, NameContext } from "./NameContext";
import { ageReducer, initialAgeState, AgeContext } from "./AgeContext";


export const StateProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [savedValuesState, savedValuesDispatch] = React.useReducer(savedValuesReducer, initialSavedValuesState);
  const [nameState, nameDispatch] = React.useReducer(nameReducer, initialNameState);
  const [ageState, ageDispatch] = React.useReducer(ageReducer, initialAgeState);
  return (
    <SavedValuesContext.Provider value={{ state: savedValuesState, dispatch: savedValuesDispatch }}>
      <NameContext.Provider value={{ state: nameState, dispatch: nameDispatch }}>
        <AgeContext.Provider value={{ state: ageState, dispatch: ageDispatch }}>
          {children}
        </AgeContext.Provider>
      </NameContext.Provider>
    </SavedValuesContext.Provider>
  );
}

export * from './SavedValuesContext';
export * from './NameContext';
export * from './AgeContext';