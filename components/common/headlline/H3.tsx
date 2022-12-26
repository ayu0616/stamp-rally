import { DetailedHTMLProps, HTMLAttributes } from "react";

const H3 = (
    props: DetailedHTMLProps<
        HTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
    >
) => {
    return (
        <h3 {...props} className="mb-3 text-xl">
            {props.children}
        </h3>
    );
};

export default H3;
