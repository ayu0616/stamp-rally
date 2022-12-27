import {
    DetailedHTMLProps,
    TextareaHTMLAttributes,
    useEffect,
    useRef,
} from "react";

const AutoResizeTextarea = (
    props: DetailedHTMLProps<
        TextareaHTMLAttributes<HTMLTextAreaElement>,
        HTMLTextAreaElement
    >
) => {
    const selfElem = useRef<HTMLTextAreaElement>(null);
    // let clientHeight = selfElem.current?.clientHeight;

    useEffect(() => {
        if (selfElem.current) {
            selfElem.current.style.height = `${0}px`;
            let scrollHeight = selfElem.current.scrollHeight;
            selfElem.current.style.height = `${scrollHeight + 2}px`;
        }
    }, [props.value]);

    return (
        <textarea
            {...props}
            ref={selfElem}
            style={{ width: "100%", resize: "none" }}
        />
    );
};
export default AutoResizeTextarea;
