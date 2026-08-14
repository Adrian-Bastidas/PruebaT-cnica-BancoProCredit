import { useCallback, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setStoredValue = useCallback(
    (nextValue: T) => {
      setValue(nextValue);
      localStorage.setItem(key, JSON.stringify(nextValue));
    },
    [key],
  );

  return [value, setStoredValue] as const;
}
