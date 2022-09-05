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
  // Need to destructure here if there are nested objects in the state, or the re-render wont fire.
  // If no nested objects, no need to destructure.
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