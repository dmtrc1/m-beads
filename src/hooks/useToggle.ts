import { useState } from 'react';

// Define the type for the toggle function
type ToggleFunction = (value?: boolean) => void;

// Define the custom hook
const useToggleValue = (initialValue: boolean): [boolean, ToggleFunction] => {
  const [value, setValue] = useState<boolean>(initialValue);

  // Define the toggle function
  const toggle: ToggleFunction = (newValue?: boolean) => {
    if (typeof newValue === 'boolean') {
      setValue(newValue);
    } else {
      setValue((prevValue) => !prevValue);
    }
  };

  // Return the current value and the toggle function
  return [value, toggle];
};

export default useToggleValue;
