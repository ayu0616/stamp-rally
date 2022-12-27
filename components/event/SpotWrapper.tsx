import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export default function SpotWrapper(props: Props) {
    return (
        <div
            {...props}
            className="grid grid-cols-1 divide-y p-0 sm:grid-cols-2 sm:gap-3 sm:divide-none sm:bg-slate-50 sm:p-3 lg:grid-cols-3 xl:grid-cols-4"
        ></div>
    );
}
