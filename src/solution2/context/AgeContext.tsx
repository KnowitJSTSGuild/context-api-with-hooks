import React from 'react';

interface IState {
  age?: number;
}

interface IAction {
  type: string;
  value?: number;
}

export const initialAgeState: IState = {};

export const ageReducer = (state: IState, action: IAction): IState => {
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

export const AgeContext = React.createContext<{ state: IState, dispatch: React.Dispatch<IAction> }>({ state: initialAgeState, dispatch: () => { } });

export const useSetAge = () => {
  const { dispatch } = React.useContext(AgeContext);

  const setAge = (age: number) => {
    dispatch({
      type: "setAge",
      value: age
    });
  }

  return setAge;
}

export const useResetAge = () => {
  const { dispatch } = React.useContext(AgeContext);

  const resetAge = () => {
    dispatch({ type: "resetAge" });
  }

  return resetAge;
}