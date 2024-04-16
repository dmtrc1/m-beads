import { useState, useEffect, Dispatch, SetStateAction } from "react";

type LocalStorageReturnType<T> = [T, Dispatch<SetStateAction<T>>];

function getSavedValue<T>(key: string, initialValue: T): T {
  const savedValue = localStorage.getItem(key);
  if (savedValue !== null) {
    try {
      return JSON.parse(savedValue) as T;
    } catch (error) {
      console.error("Error parsing saved value:", error);
    }
  }

  if (initialValue instanceof Function) return initialValue();
  return initialValue;
}

export default function useLocalStorage<T>(key: string, initialValue: T): LocalStorageReturnType<T> {
  const [value, setValue] = useState<T>(() => {
    return getSavedValue(key, initialValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
