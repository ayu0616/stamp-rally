import { DetailedHTMLProps, HTMLAttributes } from "react";

const H2 = (
    props: DetailedHTMLProps<
        HTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
    >
) => {
    return (
        <h2 {...props} className={(props.className + " " ?? "") + "text-2xl"}>
            {props.children}
        </h2>
    );
};

export default H2;
