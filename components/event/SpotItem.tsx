import { openReverseGeocoder } from "@geolonia/open-reverse-geocoder";
import H3 from "components/common/headlline/H3";
import calcDistance from "functions/calcDistance";
import round from "functions/round";
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
        <div
            className="group bg-white p-3 hover:border-purple-200 hover:bg-purple-500 hover:text-white sm:rounded sm:drop-shadow"
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