import { ChangeEventHandler, LegacyRef } from "react";

type InputTextProps = {
    value?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    ref?: LegacyRef<HTMLInputElement>;
};

export default function InputText(props: InputTextProps) {
    return (
        <input {...props} type="text" className="input-text rounded border" />
    );
}
