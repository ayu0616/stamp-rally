import { ReactNode } from "react";

export default (props: { children: ReactNode }) => {
    return <div className="grow overflow-auto p-6">{props.children}</div>;
};
