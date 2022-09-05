import React from "react";
import { Context, StateProvider, useSetName } from "./context"

const NameInput: React.FC = () => {
  const { state } = React.useContext(Context);
  const setName = useSetName();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
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