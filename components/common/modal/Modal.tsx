import { Dispatch, ReactNode, SetStateAction } from "react";

export default (props: {
    children: ReactNode;
    isShow: boolean;
    setIsShow: Dispatch<SetStateAction<boolean>>;
}) => {
    return (
        <>
            {/* modal container */}
            <div
                className={
                    (props.isShow ? "opacity-100 " : "-z-50 opacity-0 ") +
                    "fixed top-0 right-0 left-0 flex h-full w-full items-center justify-center bg-gray-500/50"
                }
                onMouseDown={() => {
                    props.setIsShow(false);
                }}
            >
                {/* modal content */}
                <div
                    className={
                        (props.isShow ? "opacity-100 " : "opacity-0 ") +
                        "flex max-h-[80%] w-4/5 flex-col justify-between rounded-lg bg-white shadow transition-[opacity] ease-in-out duration-500 lg:max-h-[70%] lg:w-1/2"
                    }
                    onMouseDown={(e) => e.stopPropagation()}
                >
                    {/* modal header body footer */}
                    {props.children}
                </div>
            </div>
        </>
    );
};
