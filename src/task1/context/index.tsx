import React from 'react';

interface IState {
  name?: string;
}

interface IAction {
  type: string;
  value: string;
}

const initialState: IState = {};

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case "setName":
      state.name = action.value;
      break;
  }
  // Need to destructure here if there are nested objects in the state, or the re-render wont fire.
  // If no nested objects, no need to destructure.
  return { ...state };
}

export const Context = React.createContext<{ state: IState, dispatch: React.Dispatch<IAction> }>({ state: initialState, dispatch: () => { } });

export const StateProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>
      {children}
    </Context.Provider>
  );
}