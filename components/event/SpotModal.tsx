import Button from "components/common/Button";
import Modal from "components/common/modal/Modal";
import ModalBody from "components/common/modal/ModalBody";
import ModalHeader from "components/common/modal/ModalHeader";
import calcDistance from "functions/calcDistance";
import formatDate from "functions/formatDate";
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
            eventSpot.stamp.stamped = true;
            eventSpot.stamp.timestamp = new Date().toISOString();

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
        } else if (props.spot && !props.spot.stamp.stamped) {
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
                    {props.spot?.stamp.stamped && props.spot.stamp.timestamp ? (
                        <div>
                            <p>訪問済み</p>
                            <p className="text-description">{formatDate(props.spot.stamp.timestamp, "yyyy年MM月dd日 hh時mm分")}</p>
                        </div>
                    ) : (
                        <></>
                    )}
                    <div className="grid-col-vertical-center gap-3">
                        <p className="text-xl sm:text-2xl">距離</p>
                        <Distance
                            className="text-xl sm:text-2xl"
                            distance={distance}
                        ></Distance>
                    </div>
                    <Button disabled={isDisabeld} onClick={pushStamp}>
                        スタンプを押す
                    </Button>
                </div>
            </ModalBody>
        </Modal>
    );
};
