import { ReactNode } from "react";
import H2 from "../headlline/H2";
import ModalCloseButton from "./ModalCloseButton";

export default (props: {
    children: ReactNode;
    closeButtonOnClick?: () => void;
}) => {
    return (
        <div className="sticky top-0 flex justify-between border-b bg-white p-4">
            <H2>{props.children}</H2>
            <ModalCloseButton onClick={props.closeButtonOnClick} />
        </div>
    );
};
