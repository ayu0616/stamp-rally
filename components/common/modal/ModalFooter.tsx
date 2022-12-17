import { ReactNode } from "react";

export default (props: { children: ReactNode }) => {
    return (
        <div className="sticky bottom-0 flex justify-end border-t bg-white p-6">
            {props.children}
        </div>
    );
};
