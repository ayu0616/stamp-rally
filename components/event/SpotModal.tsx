import Button from "components/common/Button";
import H2 from "components/common/headlline/H2";
import Modal from "components/common/modal/Modal";
import ModalBody from "components/common/modal/ModalBody";
import ModalFooter from "components/common/modal/ModalFooter";
import ModalHeader from "components/common/modal/ModalHeader";
import calcDistance from "functions/calcDistance";
import round from "functions/round";
import { Spot } from "pages/api/event/types";
import { Dispatch, SetStateAction } from "react";
import Distance from "./Distance";

export default (props: {
    isShow: boolean;
    setIsShow: Dispatch<SetStateAction<boolean>>;
    spot?: Spot;
    coords?: GeolocationCoordinates;
}) => {
    const distance =
        props.spot && props.coords
            ? calcDistance(
                  props.spot.latitude,
                  props.spot.longitude,
                  props.coords.latitude,
                  props.coords.longitude
              )
            : NaN;

    const distanceFormat = (d: number) => {
        if (!d) {
            return "";
        } else if (d < 1) {
            return round(d * 1000, 0.01);
        } else {
            return round(d, 0.01);
        }
    };

    return (
        <Modal isShow={props.isShow} setIsShow={props.setIsShow}>
            <ModalHeader closeButtonOnClick={() => props.setIsShow(false)}>
                {props.spot?.name}
            </ModalHeader>
            <ModalBody>
                <div className="grid-col-vertical-center">
                    <H2>目的地までの距離：</H2>
                    <Distance
                        className="text-2xl"
                        distance={distance}
                    ></Distance>
                </div>
                <p>
                    {props.spot?.latitude}, {props.spot?.longitude}
                </p>
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
