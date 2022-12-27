import { openReverseGeocoder } from "@geolonia/open-reverse-geocoder";
import H3 from "components/common/headlline/H3";
import calcDistance from "functions/calcDistance";
import { Spot } from "pages/api/event/types";
import { useState } from "react";
import Distance from "./Distance";

export default (props: {
    spot: Spot;
    coords?: GeolocationCoordinates;
    onMouseDown?: () => void;
}) => {
    const [prefecture, setPrefecture] = useState("");
    const [city, setCity] = useState("");

    openReverseGeocoder([props.spot.longitude, props.spot.latitude]).then(
        (res) => {
            setPrefecture(res.prefecture);
            setCity(res.city);
        }
    );

    const distance =
        props.coords?.latitude && props.coords?.longitude
            ? calcDistance(
                  props.spot.latitude,
                  props.spot.longitude,
                  props.coords?.latitude,
                  props.coords?.longitude
              )
            : NaN;

    const isNear = distance * 1000 <= props.spot.acceptableRadius;

    return (
        <div
            className={
                "group bg-white p-3 hover:border-purple-200 hover:bg-purple-500 hover:text-white sm:rounded sm:shadow " +
                (isNear ? "font-bold text-purple-700 animate-pulse" : "")
            }
            onMouseDown={props.onMouseDown}
        >
            <H3>{props.spot.name}</H3>
            <p className="text-xs text-gray-600 group-hover:text-purple-200">
                {prefecture} {city}
            </p>
            <Distance className="text-end" distance={distance}></Distance>
        </div>
    );
};
