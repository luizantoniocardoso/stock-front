


interface LoginCardImgProps {
    src: string;
    alt: string;
}

export const LoginCardImg = ({ src, alt }: LoginCardImgProps) => {

    return (
        <img
              src={src}
              className="w-full"
              alt={alt}
        />
    )
}