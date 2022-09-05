import React from 'react';

interface IState {
  age?: number;
}

interface IAction {
  type: string;
  value?: number;
}

const initialAgeState: IState = {};

const ageReducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case "setAge":
      state.age = action.value;
      break;
    case "resetAge":
      state.age = undefined;
      break;
  }
  return { ...state };
}

const AgeContext = React.createContext<{ ageState: IState, ageDispatch: React.Dispatch<IAction> }>({ ageState: initialAgeState, ageDispatch: () => { } });

export const useAgeContext = () => {
  const AgeContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = React.useReducer(ageReducer, initialAgeState);
    return (
      <AgeContext.Provider value={{ ageState: state, ageDispatch: dispatch }}>
        {children}
      </AgeContext.Provider>
    );
  }

  const { ageState, ageDispatch } = React.useContext(AgeContext);

  const setAge = (age: number) => {
    if (typeof age !== 'number') return;
    ageDispatch({
      type: "setAge",
      value: age
    });
  }

  const resetAge = () => {
    ageDispatch({ type: "resetAge" });
  }

  return { ageState, AgeContextProvider, setAge, resetAge };
}