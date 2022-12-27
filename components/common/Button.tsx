import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type TailwindColor = "btn-violet" | "btn-gray";

const Button = (
    props: DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > & { tailwindColor?: TailwindColor }
) => {
    // const getColorClass = (c: TailwindColor | undefined) => {
    //     switch (c) {
    //         case "violet": {
    //             return "btn-violet";
    //         }
    //         case "gray": {
    //             return "btn-gray";
    //         }
    //         default: {
    //             return "btn-violet";
    //         }
    //     }
    // };
    // const tailwindColorClass = getColorClass(props.tailwindColor);
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
