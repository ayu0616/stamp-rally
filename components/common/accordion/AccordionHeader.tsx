import { useEffect, useState } from "react";

type Props = {
    children?: React.ReactNode;
    className?: string;
    disabled?: boolean;
};

const AccordionHeader = (props: Props) => {
    const [show, setShow] = useState(false);
    const [id, setId] = useState("");

    const generateId = (digit: number) => {
        return (Math.random() * 16 ** digit).toString(16).slice(0, digit);
    };

    useEffect(() => {
        setId(generateId(10));
    }, []);

    return (
        <>
            <input
                id={id}
                className="accordion-input peer hidden"
                type="checkbox"
                checked={show}
                onChange={(e) => setShow(e.currentTarget.checked)}
                disabled={props.disabled}
            />
            <label
                className={
                    "accordion-header block bg-slate-50 opacity-100 transition-all duration-500 peer-checked:bg-slate-200 peer-disabled:opacity-50 " +
                    props.className
                }
                htmlFor={id}
            >
                {props.children}
            </label>
        </>
    );
};

export default AccordionHeader;
