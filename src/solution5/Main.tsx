import React from "react";
import {
  StateProvider,
  useNameContext,
  useAgeContext,
  useSavedValuesContext,
} from "./context"

const NameInput: React.FC = () => {
  const nameInputRef = React.useRef<HTMLInputElement>(null);
  const lastNameInputRef = React.useRef<HTMLInputElement>(null);
  const { setName, setLastName, name, lastName } = useNameContext();

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const onLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  }

  React.useEffect(() => {
    if (!name && nameInputRef.current) nameInputRef.current.value = "";
    if (!lastName && lastNameInputRef.current) lastNameInputRef.current.value = "";
  }, [name, lastName]);

  React.useEffect(() => {
    console.log("Name was changed: ", name);
  }, [name]);

  React.useEffect(() => {
    console.log("Last name was changed: ", lastName);
  }, [lastName]);

  return (
    <>
      <input ref={nameInputRef} type="text" defaultValue={name} placeholder="Name" onChange={onNameChange} />
      <input ref={lastNameInputRef} type="text" defaultValue={lastName} placeholder="Last name" onChange={onLastNameChange} />
    </>
  );
}

const AgeInput: React.FC = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { setAge, age } = useAgeContext();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(Number(e.target.value));
  }

  React.useEffect(() => {
    if (age === undefined && inputRef.current) inputRef.current.value = "";
  }, [age]);

  React.useEffect(() => {
    console.log("Age was changed: ", age);
  }, [age]);

  return (
    <input ref={inputRef} type="number" defaultValue={age} placeholder="Age" onChange={onChange} />
  )
}

const SaveButton: React.FC = () => {
  const { name, lastName } = useNameContext();
  const { age } = useAgeContext();
  const { setSavedValue } = useSavedValuesContext();

  const submit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSavedValue();
  }

  return (
    <button disabled={!name || !lastName || age === undefined} onClick={submit}>Save</button>
  )
}

const Value: React.FC<{ valueKey: string }> = ({ valueKey }) => {
  const { getSavedValue } = useSavedValuesContext();
  const savedValue = getSavedValue(valueKey)

  React.useEffect(() => {
    console.log("Saved value was changed: ", valueKey, savedValue)
  }, [savedValue]);

  return (
    <p>{valueKey + ': ' + JSON.stringify(savedValue)}</p>
  );
}

const ValueOutput: React.FC = () => {
  const { savedValues } = useSavedValuesContext();

  React.useEffect(() => {
    console.log("Saved values was changed: ", savedValues);
  }, [savedValues]);

  return (
    <div>
      <h1>Saved values:</h1>
      {Object.keys(savedValues).map((key) => <Value key={key} valueKey={key} />)}
    </div>
  );
}

export const Main: React.FC = () => {
  console.log("this should fire only when initial render happens");
  // Note that the state can only be accessed inside the provider
  return (
    <StateProvider>
      <NameInput />
      <AgeInput />
      <SaveButton />
      <ValueOutput />
    </StateProvider>
  );
}