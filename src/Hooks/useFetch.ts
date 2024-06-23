import { useState } from 'react';

type FetchResponse<T> = {
  data: T | null;
  error:  unknown;
  isLoading: boolean;
};
interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: string;
}

export const useFetch = <T>() => {
  const [response, setResponse] = useState<FetchResponse<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const fetchData = async (url: string, fetchOptions?: FetchOptions) => {
    setResponse((prevState) => ({ ...prevState, isLoading: true }));

    try {
      const res = await fetch(url, fetchOptions);
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setResponse({ data, error: null, isLoading: false });

    } 
    catch (error) {
      if (error instanceof Error) {
        setResponse({ data: null, error, isLoading: false });
        return;
      } 
      setResponse({ data: null, error , isLoading: false });
    }
  };

  return [response, fetchData] as const;
};


