import round from "functions/round";

type DistanceProps = {
    distance: number;
    className?: string;
};

export default function Distance(props: DistanceProps) {
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
        <p className={props.className}>
            {distanceFormat(props.distance)}
            <span className="text-xs text-gray-600 group-hover:text-purple-200">
                {props.distance < 1 ? " m" : " km"}
            </span>
        </p>
    );
}
