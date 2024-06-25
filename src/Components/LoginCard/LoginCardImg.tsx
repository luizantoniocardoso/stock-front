interface LoginCardImgProps {
    src: string;
    alt: string;
}

export const LoginCardImg = ({ src, alt }: LoginCardImgProps) => {

    return (
        <img
              src={src}
              className="h-[100%] rounded-s-2xl"
              alt={alt}
        />
    )
}