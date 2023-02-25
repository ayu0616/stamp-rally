import { useRef } from "react";

type Props = {
    children?: React.ReactNode;
};

const AccordionBody = (props: Props) => {
    const elem = useRef<HTMLDivElement>(null);
    // const checkbox = elem.current?.parentElement?.querySelector("input");
    // checkbox?.addEventListener("change", () => {
    //     if (checkbox?.checked) {
    //         elem.current?.classList.remove("max-h-0");
    //         elem.current?.classList.add("max-h-[100px]");
    //     } else {
    //         elem.current?.classList.remove("max-h-[100px]");
    //         elem.current?.classList.add("max-h-0");
    //     }
    // });

    return (
        <div
            className="accordion-body max-h-0 overflow-hidden transition-all duration-500 peer-checked:max-h-[100px] h-full"
            ref={elem}
        >
            {props.children}
        </div>
    );
};

export default AccordionBody;
