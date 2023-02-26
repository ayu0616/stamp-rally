import { useEffect, useState } from "react";

type Props = {
    children?: React.ReactNode;
};

const Accordion = (props: Props) => {
    return (
        <div className="accordion rounded border group">
            {props.children}
        </div>
    );
};

export default Accordion;
