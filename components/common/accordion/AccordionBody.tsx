import { useRef } from "react";

type Props = {
    children?: React.ReactNode;
};

const AccordionBody = (props: Props) => {
    const elem = useRef<HTMLDivElement>(null);
    elem.current?.parentElement
        ?.querySelector(".accordion-input")
        ?.addEventListener("change", (e) => {
            if (elem.current) {
                if ((e.currentTarget as HTMLInputElement | null)?.checked) {
                    elem.current.style.maxHeight =
                        elem.current.scrollHeight + "px";
                } else {
                    elem.current.style.maxHeight = "0px";
                }
            }
        });

    return (
        <div
            className={`accordion-body duration-500 h-full max-h-0 overflow-hidden transition-all`}
            ref={elem}
        >
            {props.children}
        </div>
    );
};

export default AccordionBody;
