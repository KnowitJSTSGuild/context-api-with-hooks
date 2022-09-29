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

class Store {
  private state: IState = {
    inputs: {},
    savedValues: {},
  }

  private listeners = new Set<() => void>();

  addListener(listener: () => void) {
    this.listeners.add(listener);
  }

  removeListener(listener: () => void) {
    this.listeners.delete(listener);
  }

  subscribe(listener: () => void, store: Store){
    store.addListener(listener);
    return () => store.removeListener(listener);
  }

  getState() {
    return this.state;
  }

  setState(state: IState) {
    this.state = state;
    console.log(this.listeners);
    this.listeners.forEach((l) => l());
  }

  dispatch(callback: TCallBack, store: Store) {
    const state = store.getState();
    store.setState(callback(state));
  }
}

const Context = React.createContext(new Store());

export const useStore = () => {
  const ContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const store = new Store();
    return (
      <Context.Provider value={store}>
        {children}
      </Context.Provider>
    );
  }

  const store = React.useContext(Context);
  const state = store.getState();
  function dispatch(callback: TCallBack){
    store.dispatch(callback, store);
  }
  
  function useSelector<T>(selector: T) {
    return React.useSyncExternalStore(
      (onStoreChange: () => void) => {
        console.log(store.getState());
        return store.subscribe(onStoreChange, store)
      },
      React.useCallback(() => selector, [store, selector])
    );
  }

  return { ContextProvider, state, useSelector, dispatch };
}
