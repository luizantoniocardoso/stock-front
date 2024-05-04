import { useEffect, useState } from "react";

interface useFetchReturn {
    data: any;
    loading: boolean;
    error: any;
}

// export const useFetch = (): any => {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const get = (url: string) => {    
//         useEffect(() => {
//             (async () => {
//                 try {
//                     const response = await fetch(url);
//                     if (!response.ok) throw new Error('Falha ao carregar os dados');
//                     const jsonData = await response.json();
//                     setData(jsonData);
//                     setLoading(false);
//                 } catch (error: any) {
//                     setError(error);
//                     setLoading(false);
//                 }
//             })();
            
//             return () => {};
//         }, [url]);     
//     }
 
//     return methods; 
// }




// export const useFetch = (url: string) => {
//   const [data, setData] = useState(null);
//   const [config, setConfig] = useState(null);
//   const [method, setMethod] = useState(null);
//   const [callFetch, setCallFetch] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);

//   const [itemId, setItemId] = useState(null);

//   const httpConfig = (data, method) => {
//     if (method === "POST") {
//       setConfig({
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       setMethod("POST");
//     } else if (method === "DELETE") {
//       setConfig({
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       setMethod("DELETE");
//       setItemId(data);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);

//       try {
//         const res = await fetch(url);

//         const json = await res.json();

//         setData(json);

//         setMethod(null);

//         setError(null);
//       } catch (error) {
//         console.log(error.message);

//         setError("Houve um erro ao carregar os dados!");
//       }

//       setLoading(false);
//     };

//     fetchData();
//   }, [url, callFetch]);

 

//     httpRequest();
//   }, [config]);

//   console.log(config);

//   return { data, httpConfig, loading, error };
// };

