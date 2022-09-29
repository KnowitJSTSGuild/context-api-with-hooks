import React from 'react';

interface IState {
  name?: string;
}

interface IAction {
  type: string;
  value?: string;
}

export const initialNameState: IState = {};

export const nameReducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case "setName":
      state.name = action.value;
      break;
    case "resetName":
      state.name = undefined;
      break;
  }
  return { ...state };
}

export const NameContext = React.createContext<{ state: IState, dispatch: React.Dispatch<IAction> }>({ state: initialNameState, dispatch: () => { } });

export const useSetName = () => {
  const { dispatch } = React.useContext(NameContext);

  const setName = (name: string) => {
    dispatch({
      type: "setName",
      value: name
    });
  }

  return setName;
}

export const useResetName = () => {
  const { dispatch } = React.useContext(NameContext);

  const resetName = () => {
    dispatch({ type: "resetName" });
  }

  return resetName;
}