import Button from "components/common/Button";
import Modal from "components/common/modal/Modal";
import ModalBody from "components/common/modal/ModalBody";
import ModalFooter from "components/common/modal/ModalFooter";
import ModalHeader from "components/common/modal/ModalHeader";
import { Dispatch, SetStateAction } from "react";

export type SpotModalData = {
    spotName: string;
};

export default (props: {
    isShow: boolean;
    setIsShow: Dispatch<SetStateAction<boolean>>;
    data: SpotModalData;
}) => {
    return (
        <Modal isShow={props.isShow} setIsShow={props.setIsShow}>
            <ModalHeader closeButtonOnClick={() => props.setIsShow(false)}>
                {props.data.spotName}
            </ModalHeader>
            <ModalBody>
                <p>this is modal</p>
            </ModalBody>
            <ModalFooter>
                <Button
                    onClick={() => props.setIsShow(false)}
                    tailwindColor="gray"
                >
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    );
};
