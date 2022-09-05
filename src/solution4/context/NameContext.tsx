import React from 'react';

interface IState {
  name?: string;
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

  const setName = (name: string) => {
    // Unnecessary to pass state here in this case, but for the sake of unison with other contexts
    // added it here.
    nameDispatch((state) => ({ ...state, name }));
  }

  const resetName = () => {
    nameDispatch((state) => ({ ...state, name: undefined }));
  }


  return { nameState, NameContextProvider, setName, resetName };
}