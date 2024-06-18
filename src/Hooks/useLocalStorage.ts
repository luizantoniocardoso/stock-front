import { useState } from 'react';

export const useLocalStorage = (key: string, initialValue: any) => {
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialValue;
    });

    const setLocalStorageValue = (newValue: any) => {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    };

    const clearLocalStorage = () => {
        setValue(initialValue);
        localStorage.removeItem(key);
    };

    return [value, setLocalStorageValue, clearLocalStorage];
};