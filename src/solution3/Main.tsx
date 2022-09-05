import React from "react";
import {
  StateProvider,
  useNameContext,
  useAgeContext,
  useSavedValuesContext,
} from "./context"

const NameInput: React.FC = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { nameState, setName } = useNameContext();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  React.useEffect(() => {
    if (!nameState.name && inputRef.current) inputRef.current.value = "";
  }, [nameState]);

  console.log("this should only fire when NameState is updated");

  return (
    <input ref={inputRef} type="text" defaultValue={nameState.name} placeholder="Name" onChange={onChange} />
  );
}

const AgeInput: React.FC = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { ageState, setAge } = useAgeContext();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(Number(e.target.value));
  }

  React.useEffect(() => {
    if (!ageState.age && inputRef.current) inputRef.current.value = "";
  }, [ageState]);

  console.log("this should only fire when AgeState is updated");

  return (
    <input ref={inputRef} type="number" defaultValue={ageState.age} placeholder="Age" onChange={onChange} />
  )
}

const SaveButton: React.FC = () => {
  const { nameState } = useNameContext();
  const { ageState } = useAgeContext();
  const { setSavedValue } = useSavedValuesContext();

  const submit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSavedValue();
  }

  return (
    <button disabled={!nameState.name || !ageState.age} onClick={submit}>Save</button>
  )
}

const ValueOutput: React.FC = () => {
  const { savedValuesState } = useSavedValuesContext();

  console.log("this fires on every update, since useSavedValuesContext subscribes to the other contexts");

  return (
    <h1>Saved values: {JSON.stringify(savedValuesState)}</h1>
  );
}

export const Main: React.FC = () => {
  console.log("this should fire only when initial render happens");
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