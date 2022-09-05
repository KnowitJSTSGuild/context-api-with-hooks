import React from "react";
import { Context, StateProvider } from "./context"

const NameInput: React.FC = () => {
  const { state, dispatch } = React.useContext(Context);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "setName",
      value: e.target.value
    });
  }

  return (
    <input type="text" defaultValue={state.name} placeholder="Name" onChange={onChange}/>
  );
}

const NameOutput: React.FC = () => {
  const { state } = React.useContext(Context);
  return (
    <h1>Your name is {state.name || "unknown"}</h1>
  );
}

export const Main: React.FC = () => {
  // Note that the state can only be accessed inside the provider
  return (
    <StateProvider>
      <NameOutput />
      <NameInput />
    </StateProvider>
  );
}