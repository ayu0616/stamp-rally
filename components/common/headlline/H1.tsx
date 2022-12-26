import { DetailedHTMLProps, HTMLAttributes } from "react";

const H1 = (
    props: DetailedHTMLProps<
        HTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
    >
) => {
    return (
        <h1 {...props} className="mb-3 text-3xl">
            {props.children}
        </h1>
    );
};

export default H1;
