interface LoginLinkProps {
  href: string;
  text: string;
}


export const LoginLink = ({href, text}: LoginLinkProps) => {
  return (
    <a href={href} className="text-primary focus:outline-none dark:text-primary-400">
      {text}
    </a>
  )
}