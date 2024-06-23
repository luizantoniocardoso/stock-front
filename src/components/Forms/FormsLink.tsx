import { Link } from "react-router-dom";

interface FormsLinkProps {
    href: string;
    text: string;
    onClick?: () => void;
  }
  
  
  export const FormsLink = ({href, text, onClick}: FormsLinkProps) => {
    return (
      <Link to={href} onClick={onClick} className="text-contrastVar focus:outline-none dark:text-contrastVar">
        {text}
      </Link>
    )
  }