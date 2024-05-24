interface RegisterCardImgProps {
    src: string;
    alt: string;
}

export const RegisterCardImg = ({ src, alt }: RegisterCardImgProps) => {

    return (
        <img
              src={src}
              className="w-full"
              alt={alt}
        />
    )
}