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

const initialState: IState = Object.freeze({
    inputs: {},
    savedValues: {},
});

const reducer = (state: IState, callback: TCallBack): IState => Object.freeze({ ...callback(state) });

const Context = React.createContext<{ state: IState, dispatch: React.Dispatch<TCallBack> }>({ state: initialState, dispatch: () => { } });

export const useStore = () => {
    const ContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
        const [state, dispatch] = React.useReducer(reducer, initialState);
        return (
            <Context.Provider value={{ state, dispatch }}>
                {children}
            </Context.Provider>
        );
    }

    const { state, dispatch } = React.useContext(Context);

    // function useSelector<T>(selector: T) {
    //     return React.useSyncExternalStore(
    //         () => () => selector,
    //         React.useCallback(() => selector, [selector])
    //     );
    // }

    return { ContextProvider, state, dispatch };
}