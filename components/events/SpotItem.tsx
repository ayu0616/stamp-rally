import { openReverseGeocoder } from "@geolonia/open-reverse-geocoder";
import calcDistance from "functions/calcDistance";
import round from "functions/round";
import { useState } from "react";

export default (props: {
    name: string;
    lat: number;
    lng: number;
    currentLat?: number;
    currentLng?: number;
    onMouseDown?: () => void;
}) => {
    const [prefecture, setPrefecture] = useState("");
    const [city, setCity] = useState("");

    openReverseGeocoder([props.lng, props.lat]).then((res) => {
        setPrefecture(res.prefecture);
        setCity(res.city);
    });

    const distance =
        props.currentLat && props.currentLng
            ? calcDistance(
                  props.lat,
                  props.lng,
                  props.currentLat,
                  props.currentLng
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
            <p className="text-lg">{props.name}</p>
            <p className="text-xs">
                {prefecture} {city}
            </p>
            <p className="text-end">
                {distanceFormat(distance)}
                <span className="text-xs text-gray-600 group-hover:text-purple-200">
                    {distance < 1 ? "m" : "km"}
                </span>
            </p>
        </div>
    );
};
