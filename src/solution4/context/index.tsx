import React from 'react';
import { useSavedValuesContext } from "./SavedValuesContext";
import { useNameContext } from "./NameContext";
import { useAgeContext } from "./AgeContext";

// Note: This is not ideal for very complexly coupled states, ideally the Contexts' that require
// information from another Context should have those Contexts' Providers added in their respective hooks.
// For simplicity's sake we do it like this in this example.
export const StateProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { SavedValuesContextProvider } = useSavedValuesContext();
  const { NameContextProvider } = useNameContext();
  const { AgeContextProvider } = useAgeContext();

  return (
    <NameContextProvider>
      <AgeContextProvider>
        <SavedValuesContextProvider>
          {children}
        </SavedValuesContextProvider>
      </AgeContextProvider>
    </NameContextProvider>
  );
}

export * from './SavedValuesContext';
export * from './NameContext';
export * from './AgeContext';