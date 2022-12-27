import { DetailedHTMLProps, OlHTMLAttributes } from "react";

export default (
    props: DetailedHTMLProps<
        OlHTMLAttributes<HTMLOListElement>,
        HTMLOListElement
    >
) => {
    return <ol {...props} className="list-inside list-decimal-leading-zero" />;
};
