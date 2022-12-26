import { ReactNode } from "react";

type SectionProps = Partial<{
    children: ReactNode;
    className: string;
}>;

export default function Section(props: SectionProps) {
    return (
        <div
            {...props}
            className={props.className + " " + "mb-3 p-3 last:mb-0"}
        ></div>
    );
}
