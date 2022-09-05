# Global state management with Context API

In this repository there are three tasks for handling global state management across different components using React's Context API. From src directory you'll find subdirectories from task1->3 and solution1->3. Ideally, you should use only task1 and follow the steps listed below to modify your own code to reach the needs of the tasks. Each of the task directories are identical to the solution for the previous task, so if you get desperate you can just use the next task directory instead. To swap from one task to another, just switch the import for Main in App.tsx to the respective tasks directory.

## Task 1: 
Modify code in src/task1 in a way that dispatch function has to never be called inside components, use custom hook exported from src/task1/context instead.

## Task 2: 
Create two more contexts, one for adding age for the name given, and one to save the name/age as key value pair to its state. Add number input for adding the age and submit button to save the name and age. Display all of the saved values as stringified object (or by your own chosen method). Empty name and age states when saving from within the saved values context.

## Task 3: 
Set all of the state logic inside a single hook (one for each context), where the state mutation functions are returned as an object. useContext should not be called outside the hook, and components should only import the states and functions they need. Similarly, the contexts' Providers should be created inside the hooks. Note that useContext needs to still be called inside the hooks for the state, the Context cannot be created inside the hook or it will create a new context for every component using the hook, and that the reducer needs to be created together with the Provider component.

## Task 4: 
Use callbacks instead of switch statement for modifying the state. Also modify the contexts' state so that it can't be mutated without calling the reducer.