import React from "react";
import "./styles.css";
import {
  StateProvider,
  useNameContext,
  useAgeContext,
  useSavedValuesContext,
} from "./context"

interface InputProps {
  type: "text" | "number";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string | number;
  id: string;
  labelText: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ type, onChange, defaultValue, id, labelText }, ref) => {
  return (
    <>
      <label htmlFor={id}>{labelText}</label>
      <input id={id} ref={ref} type={type} onChange={onChange} defaultValue={defaultValue} />
    </>
  )
});

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
      <Input id="name_input" ref={nameInputRef} type="text" defaultValue={name} labelText="Name" onChange={onNameChange} />
      <Input id="last_name_input" ref={lastNameInputRef} type="text" defaultValue={lastName} labelText="Last name" onChange={onLastNameChange} />
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
    <Input id="age_input" ref={inputRef} type="number" defaultValue={age} labelText="Age" onChange={onChange} />
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
  const savedValue = getSavedValue(valueKey);

  React.useEffect(() => {
    console.log("Saved value was changed: ", valueKey, savedValue)
  }, [savedValue]);

  return (
    <tr>
      <td>{savedValue.name}</td>
      <td>{savedValue.lastName}</td>
      <td>{savedValue.age}</td>
    </tr>
  );
}

const ValueOutput: React.FC = () => {
  const { savedValues } = useSavedValuesContext();

  React.useEffect(() => {
    console.log("Saved values was changed: ", savedValues);
  }, [savedValues]);

  return (
    <div className="output">
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Last name</th>
            <th>Age</th>
          </tr>
          {Object.keys(savedValues).map((key) => <Value key={key} valueKey={key} />)}
        </tbody>
      </table>
    </div>
  );
}

const Inputs: React.FC = () => {
  return (
    <div className="inputs">
      <NameInput />
      <AgeInput />
      <SaveButton />
    </div>
  );
}

export const Main: React.FC = () => {
  console.log("this should fire only when initial render happens");
  // Note that the state can only be accessed inside the provider
  return (
    <main>
      <StateProvider>
        <Inputs />
        <ValueOutput />
      </StateProvider>
    </main>
  );
}