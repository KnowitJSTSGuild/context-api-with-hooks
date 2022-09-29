import React from "react";
import "./styles.css";
import {
  StateProvider,
  useNameContext,
  useAgeContext,
  useSavedValuesContext,
} from "./store"

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

var nameInputRenderCount = 0;
const NameInput: React.FC = () => {
  const nameInputRef = React.useRef<HTMLInputElement>(null);
  const { setName, name } = useNameContext();
  nameInputRenderCount++;
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }


  React.useEffect(() => {
    if (!name && nameInputRef.current) nameInputRef.current.value = "";
  }, [name]);

  React.useEffect(() => {
    console.log("Name was changed: ", name);
  }, [name]);

  return (
    <Input id="name_input" ref={nameInputRef} type="text" defaultValue={name} labelText={"Name " + nameInputRenderCount} onChange={onNameChange} />
  );
}

var lastNameInputRenderCount = 0;
const LastNameInput: React.FC = () => {
  const lastNameInputRef = React.useRef<HTMLInputElement>(null);
  const { setLastName, lastName } = useNameContext();
  lastNameInputRenderCount++;

  const onLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  }

  React.useEffect(() => {
    if (!lastName && lastNameInputRef.current) lastNameInputRef.current.value = "";
  }, [lastName]);

  React.useEffect(() => {
    console.log("Last name was changed: ", lastName);
  }, [lastName]);

  return (
    <Input id="last_name_input" ref={lastNameInputRef} type="text" defaultValue={lastName} labelText={"Last name " + lastNameInputRenderCount} onChange={onLastNameChange} />
  );
}

var ageInputRenderCount = 0;
const AgeInput: React.FC = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { setAge, age } = useAgeContext();
  ageInputRenderCount++;

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
    <Input id="age_input" ref={inputRef} type="number" defaultValue={age} labelText={"Age " + ageInputRenderCount} onChange={onChange} />
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

var valueRenderCount = 0;
const ValueOutput: React.FC = () => {
  const { savedValues } = useSavedValuesContext();
  valueRenderCount++;

  React.useEffect(() => {
    // this is very weird side effect, this does not get called again
    console.log("Saved values was changed: ", savedValues);
  }, [savedValues]);

  return (
    <div className="output">
      <span style={{ textAlign: "center" }}>Render count: {valueRenderCount}</span>
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

var inputsRenderCount = 0;
const Inputs: React.FC = () => {
  inputsRenderCount++;
  return (
    <div className="inputs">
      <span style={{ textAlign: 'center' }}>Render count: {inputsRenderCount}</span>
      <NameInput />
      <LastNameInput />
      <AgeInput />
      <SaveButton />
    </div>
  );
}

export const Main: React.FC = () => {
  return (
    <main>
      <StateProvider>
        <Inputs />
        <ValueOutput />
      </StateProvider>
    </main>
  );
}