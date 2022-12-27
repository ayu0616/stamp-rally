import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type TailwindColor = "btn-violet" | "btn-gray";

const Button = (
    props: DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > & { tailwindColor?: TailwindColor }
) => {
    return (
        <button
            {...props}
            className={
                "rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 " +
                (props.tailwindColor ?? "btn-violet")
            }
        >
            {props.children}
        </button>
    );
};

export default Button;
