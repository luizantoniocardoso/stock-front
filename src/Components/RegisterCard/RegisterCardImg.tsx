interface RegisterCardImgProps {
    src: string;
    alt: string;
}

export const RegisterCardImg = ({ src, alt }: RegisterCardImgProps) => {

    return (
        <img
              src={src}
              className="h-[100%] rounded-s-2xl"
              alt={alt}
        />
    )
}