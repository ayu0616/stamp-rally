import { openReverseGeocoder } from "@geolonia/open-reverse-geocoder";
import H3 from "components/common/headlline/H3";
import calcDistance from "functions/calcDistance";
import { Spot } from "pages/api/event/types";
import Distance from "./Distance";

export default (props: {
    spot: Spot;
    coords?: GeolocationCoordinates;
    onMouseDown?: () => void;
}) => {
    // const [prefecture, setPrefecture] = useState("");
    // const [city, setCity] = useState("");

    const distance =
        props.coords?.latitude && props.coords?.longitude
            ? calcDistance(
                  props.spot.latitude,
                  props.spot.longitude,
                  props.coords?.latitude,
                  props.coords?.longitude
              )
            : NaN;

    const isNear =
        distance * 1000 <= props.spot.acceptableRadius && !props.spot.stamp.stamped;

    return (
        <div
            className={
                "group bg-white p-3 active:border-purple-200 active:bg-purple-500 active:text-white sm:rounded sm:shadow md:hover:border-purple-200 md:hover:bg-purple-500 md:hover:text-white" +
                (isNear ? " animate-pulse font-bold text-purple-700" : "")
            }
            onMouseDown={props.onMouseDown}
        >
            <H3>{props.spot.name}</H3>
            <p className="text-description group-active:text-purple-200 md:group-hover:text-purple-200">
                {props.spot.prefecture} {props.spot.city}
            </p>
            <Distance className="text-end" distance={distance}></Distance>
        </div>
    );
};
