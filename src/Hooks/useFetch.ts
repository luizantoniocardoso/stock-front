import { useState } from 'react';

type FetchResponse<T> = {
  data: T | null;
  error: any | null;
  isLoading: boolean;
};

export const useFetch = <T>() => {
  const [response, setResponse] = useState<FetchResponse<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const fetchData = async (url: string) => {
    setResponse((prevState) => ({ ...prevState, isLoading: true }));

    try {
      const res = await fetch(url);
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


