import React, { useState, ChangeEvent, KeyboardEvent, HTMLProps } from "react";
import { PencilIcon } from "@heroicons/react/16/solid";

interface EditableInputProps extends HTMLProps<HTMLInputElement> {
  initialValue: string;
  onSave: (newValue: string) => void;
}

const EditableInput: React.FC<EditableInputProps> = ({
  initialValue,
  onSave,
  ...rest
}) => {
  const [value, setValue] = useState<string>(initialValue);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const saveValue = () => {
    if (value === initialValue) {
      setIsEditing(false);
      return;
    }

    onSave(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setValue(initialValue);
      setIsEditing(false);
    }
    if (e.key === "Enter") {
      saveValue();
    }
  };



  return (
    <div onClick={() => setIsEditing(true)}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={saveValue}
            autoFocus
            {...rest}
          />
        </div>
      ) : (
        <div className="flex">
          {value}
          <PencilIcon className="h-6 w-6 text-blue-500 ml-2" />
        </div>
      )}
    </div>
  );
};

export default EditableInput;
