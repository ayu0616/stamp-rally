import Button from "components/common/Button";
import H2 from "components/common/headlline/H2";
import Modal from "components/common/modal/Modal";
import ModalBody from "components/common/modal/ModalBody";
import ModalHeader from "components/common/modal/ModalHeader";
import calcDistance from "functions/calcDistance";
import { useRouter } from "next/router";
import { ReqData } from "pages/api/event/edit/edit";
import { Event, Spot } from "pages/api/event/types";
import { Dispatch, SetStateAction } from "react";
import Distance from "./Distance";

export default (props: {
    isShow: boolean;
    setIsShow: Dispatch<SetStateAction<boolean>>;
    spot?: Spot;
    coords?: GeolocationCoordinates;
    event?: Event;
}) => {
    const router = useRouter();
    const distance =
        props.spot && props.coords
            ? calcDistance(
                  props.spot.latitude,
                  props.spot.longitude,
                  props.coords.latitude,
                  props.coords.longitude
              )
            : NaN;

    const pushStamp = () => {
        if (props.spot && props.event) {
            const spotName = props.spot.name;
            const eventSpot = props.event.spots.find(
                (e) => e.name == spotName
            ) as Spot;
            eventSpot.stamped = true;

            fetch("/api/event/edit/edit", {
                method: "post",
                body: JSON.stringify({
                    type: "edit",
                    body: props.event,
                } as ReqData),
            }).then((res) => {
                if (res.ok) {
                    const url = "/event";
                    router.push(url, {
                        query: {
                            name: props.event?.eventName,
                            eventData: JSON.stringify(props.event),
                        },
                    });
                }
            });
        }
    };

    const isDisabeld = (() => {
        if (!props.coords) {
            return true;
        } else if (props.spot && !props.spot.stamped) {
            return distance * 1000 > props.spot.acceptableRadius;
        } else {
            return true;
        }
    })();

    return (
        <Modal isShow={props.isShow} setIsShow={props.setIsShow}>
            <ModalHeader closeButtonOnClick={() => props.setIsShow(false)}>
                {props.spot?.name}
            </ModalHeader>
            <ModalBody>
                <div className="grid gap-3">
                    <div className="grid-col-vertical-center">
                        <H2>目的地までの距離：</H2>
                        <Distance
                            className="text-2xl"
                            distance={distance}
                        ></Distance>
                    </div>
                    <Button disabled={isDisabeld} onClick={pushStamp}>
                        スタンプを押す
                    </Button>
                </div>
                {/* <p>
                    {props.spot?.latitude}, {props.spot?.longitude}
                </p> */}
            </ModalBody>
            {/* <ModalFooter>
                <Button
                    onClick={() => props.setIsShow(false)}
                    tailwindColor="btn-gray"
                >
                    Close
                </Button>
            </ModalFooter> */}
        </Modal>
    );
};
