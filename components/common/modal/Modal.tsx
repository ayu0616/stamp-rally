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
                className={`fixed top-0 right-0 left-0 flex h-full w-full items-center justify-center bg-gray-500/50 ${
                    props.isShow ? "" : "hidden"
                }`}
                onMouseDown={() => {
                    props.setIsShow(false);
                }}
            >
                {/* modal content */}
                <div
                    className="flex max-h-[80%] w-2/3 flex-col justify-between rounded-lg bg-white shadow lg:max-h-[50%] lg:w-1/2"
                    onMouseDown={(e) => e.stopPropagation()}
                >
                    {/* modal header body footer */}
                    {props.children}
                </div>
            </div>
        </>
    );
};
