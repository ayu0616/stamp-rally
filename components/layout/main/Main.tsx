/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
import { ReactNode } from "react";

export default (props: { children?: ReactNode }) => {
    return <main {...props} className="mx-auto max-w-full lg:max-w-[80%]" />;
};
