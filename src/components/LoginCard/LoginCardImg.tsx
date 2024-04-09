


interface LoginCardImgProps {
    src: string;
    alt: string;
}

export const LoginCardImg = ({ src, alt }: LoginCardImgProps) => {

// https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg
    return (
        <img
              src={src}
              className="w-full"
              alt={alt}
        />
    )
}