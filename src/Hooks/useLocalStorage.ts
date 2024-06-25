import { useCallback } from "react";

type UseLocalStorageReturn = {
    setItem: (key: string, value: string) => void;
    getItem: (key: string) => string | null;
    removeItem: (key: string) => void;
};

export const useLocalStorage = (): UseLocalStorageReturn => {
    const setItem = useCallback((key: string, value: string) => {
        localStorage.setItem(key, value);
    }, []);

    const getItem = useCallback((key: string) => {
        return localStorage.getItem(key);
    }, []);

    const removeItem = useCallback((key: string) => {
        localStorage.removeItem(key);
    }, []);

    return {
        setItem,
        getItem,
        removeItem
    };
};
