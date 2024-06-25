interface TopbarLogoProps {
    path: string;
    alt: string;
}

export const TopbarLogo = ({alt, path}: TopbarLogoProps) => {
    return (
      <div className="flex items-center">
        <img 
          src={path} 
          alt={alt} 
          className="w-auto h-full"
        />
      </div>
    );
  };