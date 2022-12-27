import { ChangeEventHandler } from "react";

type InputTextProps = {
    value?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
};

export default function InputText(props: InputTextProps) {
    return (
        <input {...props} type="text" className="input-text rounded border" />
    );
}
