import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";

export default (
    props: DetailedHTMLProps<
        HtmlHTMLAttributes<HTMLOListElement>,
        HTMLOListElement
    >
) => {
    return <ul {...props} className="list-inside list-square" />;
};
