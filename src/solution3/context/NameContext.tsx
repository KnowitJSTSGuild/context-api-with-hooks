import React from 'react';

interface IState {
  name?: string;
}

interface IAction {
  type: string;
  value?: string;
}

const initialNameState: IState = {};

const nameReducer = (state: IState, action: IAction): IState => {
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

const NameContext = React.createContext<{ nameState: IState, nameDispatch: React.Dispatch<IAction> }>({ nameState: initialNameState, nameDispatch: () => { } });

export const useNameContext = () => {
  const NameContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = React.useReducer(nameReducer, initialNameState);
    return (
      <NameContext.Provider value={{ nameState: state, nameDispatch: dispatch }}>
        {children}
      </NameContext.Provider>
    );
  }

  const { nameState, nameDispatch } = React.useContext(NameContext);

  const setName = (name: string) => {
    nameDispatch({
      type: "setName",
      value: name
    });
  }

  const resetName = () => {
    nameDispatch({ type: "resetName" });
  }


  return { nameState, NameContextProvider, setName, resetName };
}