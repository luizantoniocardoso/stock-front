import { Link } from "react-router-dom";

interface FormsLinkProps {
    href: string;
    text: string;
  }
  
  
  export const FormsLink = ({href, text}: FormsLinkProps) => {
    return (
      <Link to={href} className="text-contrastVar focus:outline-none dark:text-contrastVar">
        {text}
      </Link>
    )
  }