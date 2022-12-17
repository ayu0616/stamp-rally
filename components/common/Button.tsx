import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type TailwindColor = "violet" | "gray";

const getColorClass = (c: TailwindColor | undefined) => {
    switch (c) {
        case "violet": {
            return "bg-violet-500 hover:bg-violet-600 focus:ring-violet-900/50 active:bg-violet-700";
        }
        case "gray": {
            return "bg-gray-500 hover:bg-gray-600 focus:ring-gray-900/50 active:bg-gray-700";
        }
        default: {
            return "bg-violet-500 hover:bg-violet-600 focus:ring-violet-900/50 active:bg-violet-700";
        }
    }
};

const Button = (
    props: DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > & { tailwindColor?: TailwindColor }
) => {
    const tailwindColorClass = getColorClass(props.tailwindColor);
    return (
        <button
            {...props}
            className={`rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 ${tailwindColorClass}}`}
        >
            {props.children}
        </button>
    );
};

export default Button;
