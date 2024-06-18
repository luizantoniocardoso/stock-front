interface RegisterCardImgProps {
    src: string;
    alt: string;
}

export const RegisterCardImg = ({ src, alt }: RegisterCardImgProps) => {

    return (
        <img
              src={src}
              className="object-cover h-[100%] w-[100%]"
              alt={alt}
        />
    )
}