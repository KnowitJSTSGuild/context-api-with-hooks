import React from "react";
import { useStore } from "./store";

export const StateProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { ContextProvider } = useStore();

  return (
    <ContextProvider>
      {children}
    </ContextProvider>
  );
}

export * from "./savedValuesContext";
export * from "./nameContext";
export * from "./ageContext";