import { useState } from 'react';

type FetchResponse<T> = {
  data: T | null;
  error: any | null;
  isLoading: boolean;
};

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
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
        setResponse({ data: null, error, isLoading: false });
    }
  };

  return [response, fetchData] as const;
};

