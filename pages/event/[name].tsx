import Button from "components/common/Button";
import H1 from "components/common/headlline/H1";
import H2 from "components/common/headlline/H2";
import SpotItem from "components/events/SpotItem";
import SpotModal, { SpotModalData } from "components/events/SpotModal";
import Section from "components/layout/section/Section";
import calcDistance from "functions/calcDistance";
import { useRouter } from "next/router";
import { Event } from "pages/api/event/types";
import { useEffect, useState } from "react";

export default function Home() {
    type SortByText = "-" | "↑" | "↓";

    const router = useRouter();
    const [event, setEvent] = useState<Event>(
        JSON.parse(router.query.eventData as string)
    );

    const [pos, setPos] = useState<GeolocationPosition>();
    const [sortBy, setSortBy] = useState<SortByText>("-");
    const [isModalShow, setIsModalShow] = useState(false);
    const [spotModalData, setSpotModalData] = useState<SpotModalData>({
        spotName: "",
    });

    const getPos = () => {
        navigator.geolocation.getCurrentPosition((p) => {
            setPos(p);
        });
    };

    useEffect(getPos, []);

    const toggleSortBy = () => {
        setSortBy((prev) => {
            switch (prev) {
                case "-": {
                    sortSpots("↑");
                    return "↑";
                }
                case "↑": {
                    sortSpots("↓");
                    return "↓";
                }
                case "↓": {
                    sortSpots("↑");
                    return "↑";
                }
            }
        });
    };

    const sortSpots = (sortBy: SortByText) => {
        if (pos && sortBy !== "-") {
            const plusMinus = sortBy === "↑" ? -1 : 1;
            event.spots.sort((x, y) => {
                return (
                    -plusMinus *
                        calcDistance(
                            x.latitude,
                            x.longitude,
                            pos.coords.latitude,
                            pos.coords.longitude
                        ) +
                    plusMinus *
                        calcDistance(
                            y.latitude,
                            y.longitude,
                            pos.coords.latitude,
                            pos.coords.longitude
                        )
                );
            });
        }
    };

    useEffect(() => {
        sortSpots(sortBy);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pos]);
    return (
        <div>
            <Section>
                <H1>{event.eventName}</H1>
            </Section>
            <Section className="grid grid-flow-col place-content-start place-items-center gap-3">
                <div className="grid grid-flow-col place-content-start place-items-center">
                    <H2 className="mb-0">現在地：</H2>
                    <p>
                        {pos
                            ? `${pos.coords.latitude}, ${pos.coords.longitude}`
                            : ""}
                    </p>
                </div>
                <div>
                    <Button onClick={getPos}>現在の座標を更新</Button>
                </div>
            </Section>
            <Section>
                <div className="mb-3 grid grid-flow-col place-content-start place-items-center gap-3">
                    <H2 className="mb-0">スポット一覧</H2>
                    <Button
                        onClick={() => {
                            toggleSortBy();
                        }}
                    >
                        並べ替え {sortBy}
                    </Button>
                </div>

                <div className="grid grid-cols-1 divide-y bg-slate-50 p-0 sm:grid-cols-2 sm:gap-3 sm:divide-none sm:p-3 lg:grid-cols-3 xl:grid-cols-4">
                    {event.spots.map((d, i) => {
                        return (
                            <SpotItem
                                key={i}
                                name={d.name}
                                lat={d.latitude}
                                lng={d.longitude}
                                currentLat={pos?.coords.latitude}
                                currentLng={pos?.coords.longitude}
                                onMouseDown={() => {
                                    setSpotModalData({
                                        spotName: d.name,
                                    });
                                    setIsModalShow(true);
                                }}
                            />
                        );
                    })}
                </div>
            </Section>
            <SpotModal
                isShow={isModalShow}
                setIsShow={setIsModalShow}
                data={spotModalData}
            />
        </div>
    );
}
