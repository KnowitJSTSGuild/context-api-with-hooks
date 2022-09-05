import React from "react";
import {
  NameContext,
  AgeContext,
  SavedValuesContext,
  StateProvider,
  useSetName,
  useSetAge,
  useSetSavedValue
} from "./context"

const NameInput: React.FC = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { state } = React.useContext(NameContext);
  const setName = useSetName();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  React.useEffect(() => {
    if (!state.name && inputRef.current) inputRef.current.value = "";
  }, [state]);

  return (
    <input ref={inputRef} type="text" defaultValue={state.name} placeholder="Name" onChange={onChange} />
  );
}

const AgeInput: React.FC = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { state } = React.useContext(AgeContext);
  const setAge = useSetAge();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const age = Number(e.target.value);
    if (isNaN(age)) return;
    setAge(age);
  }

  React.useEffect(() => {
    if (!state.age && inputRef.current) inputRef.current.value = "";
  }, [state]);

  return (
    <input ref={inputRef} type="number" defaultValue={state.age} placeholder="Age" onChange={onChange} />
  )
}

const SaveButton: React.FC = () => {
  const nameContext = React.useContext(NameContext);
  const ageContext = React.useContext(AgeContext);
  const setSavedValue = useSetSavedValue();

  const submit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSavedValue(nameContext.state.name, ageContext.state.age);
  }

  return (
    <button disabled={!nameContext.state.name || !ageContext.state.age} onClick={submit}>Save</button>
  )
}

const ValueOutput: React.FC = () => {
  const { state } = React.useContext(SavedValuesContext);
  return (
    <h1>Saved values: {JSON.stringify(state)}</h1>
  );
}

export const Main: React.FC = () => {
  // Note that the state can only be accessed inside the provider
  return (
    <StateProvider>
      <ValueOutput />
      <NameInput />
      <AgeInput />
      <SaveButton />
    </StateProvider>
  );
}