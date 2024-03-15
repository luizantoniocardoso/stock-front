
import {
  createBrowserRouter,
} from "react-router-dom";
import Home  from "../Pages/Home";
const url = window.location.pathname;


let router; 
if(url === "/" || url === "") {
    router = createBrowserRouter([
      {
        path: "/",
        element: <Home />,
      },
    ]);
}
else {
  const componentToImpoter = await import(`../Pages${capitalizeFirstLetter(url)}`);
  const Component = componentToImpoter.default;
  function capitalizeFirstLetter(str: string): string {
    if (str === "/") return str;
    const words = str.split("/");
    let newStr = "";
    for (let word of words) {
      newStr += `/${word.charAt(0).toUpperCase() + word.slice(1)}`;
    }
    return newStr;
  }
  router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: url,
      element:  <Component />,
    },
  ]);
}
export default router;