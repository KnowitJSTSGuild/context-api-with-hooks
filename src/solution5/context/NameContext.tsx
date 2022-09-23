import React from 'react';

interface IState {
  name?: string;
  lastName?: string;
}

type TCallBack = (state: IState) => IState;

const initialNameState: IState = Object.freeze({});

const nameReducer = (state: IState, callback: TCallBack): IState => Object.freeze(callback(state));

const NameContext = React.createContext<{ nameState: IState, nameDispatch: React.Dispatch<TCallBack> }>({ nameState: initialNameState, nameDispatch: () => { } });

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
  const name = React.useSyncExternalStore(() => () => nameState.name, React.useCallback(() => nameState.name, [nameState]));
  const lastName = React.useSyncExternalStore(() => () => nameState.lastName, React.useCallback(() => nameState.lastName, [nameState]));

  const setName = (name: string) => {
    nameDispatch((state) => ({ ...state, name }));
  }

  const resetName = () => {
    nameDispatch((state) => ({ ...state, name: undefined }));
  }

  const setLastName = (lastName: string) => {
    nameDispatch((state) => ({ ...state, lastName }));
  }

  const resetLastName = () => {
    nameDispatch((state) => ({ ...state, lastName: undefined }));
  }


  return { nameState, NameContextProvider, setName, resetName, setLastName, resetLastName, name, lastName };
}