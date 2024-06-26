interface TopbarLogoProps {
    path: string;
    alt: string;
}

export const TopbarLogo = ({alt, path}: TopbarLogoProps) => {
    return (
      <div className="flex items-center min-w-[33%]">
        <img 
          src={path} 
          alt={alt} 
          className="w-auto h-full"
        />
      </div>
    );
  };