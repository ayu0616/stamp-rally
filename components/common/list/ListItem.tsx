import { DetailedHTMLProps, LiHTMLAttributes } from "react";

export default (
    props: DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>
) => {
    return <li {...props} className="ml-3" />;
};
