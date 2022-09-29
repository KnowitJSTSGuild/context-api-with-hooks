import React from "react";

interface IState {
  inputs: {
    name?: string;
    lastName?: string;
    age?: number;
  }
  savedValues: {
    [name: string]: {
      name: string;
      lastName: string;
      age: number;
    };
  }
}

type TCallBack = (state: IState) => IState;

// using static methods here due to JavaScript this shenanigans
class Store {
  private static state: IState = {
    inputs: {},
    savedValues: {},
  }

  private static listeners = new Set<() => void>();

  static subscribe(listener: () => void){
    Store.listeners.add(listener);
    return () => Store.listeners.delete(listener);
  }

  static getState() {
    return Store.state;
  }

  private static setState(state: IState) {
    Store.state = state;
    Store.listeners.forEach((onStoreChange) => onStoreChange());
  }

  static dispatch(callback: TCallBack) {
    Store.setState(callback(Store.getState()));
  }
}

const Context = React.createContext(new Store());

export const useStore = () => {
  const ContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    /*
    * Due to the store being static class, Context has no real use here, but 
    * due to JavaScripts weird handling of this keyword the store would have to
    * be passed to itself in every function call, so to save myself from completely 
    * descending into madness, I used static methods and parameters.
    */
    const store = new Store();
    return (
      <Context.Provider value={store}>
        {children}
      </Context.Provider>
    );
  }

  const store = React.useContext(Context);
  const state = Store.getState();
  
  function useSelector<T>(selector: (state: IState) => T) {
    return React.useSyncExternalStore(
      Store.subscribe,
      React.useCallback(() => selector(state), [store, selector])
    );
  }

  return { ContextProvider, useSelector, dispatch: Store.dispatch };
}
