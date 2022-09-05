import React from 'react';

interface IState {
  age?: number;
}

type TCallBack = (state: IState) => IState;

const initialAgeState: IState = Object.freeze({});

const ageReducer = (state: IState, callback: TCallBack) => Object.freeze(callback(state));

const AgeContext = React.createContext<{ ageState: IState, ageDispatch: React.Dispatch<TCallBack> }>({ ageState: initialAgeState, ageDispatch: () => { } });

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
    ageDispatch((state) => ({ ...state, age }));
  }

  const resetAge = () => {
    ageDispatch((state) => ({ ...state, age: undefined }));
  }

  return { ageState, AgeContextProvider, setAge, resetAge };
}