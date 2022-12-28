import CrossIcon from "../CrossIcon";
import CrossButton from "../CrossIcon";

export default (props: { onClick?: () => void }) => {
    return (
        <button
            onClick={props.onClick}
            className="flex h-8 w-8 items-center justify-center rounded text-gray-700 hover:bg-gray-200 hover:text-black"
        >
            <CrossIcon />
        </button>
    );
};
