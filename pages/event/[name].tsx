import {
    openReverseGeocoder,
    ReverseGeocodingResult,
} from "@geolonia/open-reverse-geocoder";
import Button from "components/common/Button";
import CrossIcon from "components/common/CrossIcon";
import H1 from "components/common/headlline/H1";
import H2 from "components/common/headlline/H2";
import SpotItem from "components/event/SpotItem";
import SpotModal from "components/event/SpotModal";
import SpotWrapper from "components/event/SpotWrapper";
import Section from "components/layout/section/Section";
import calcDistance from "functions/calcDistance";
import round from "functions/round";
import { useRouter } from "next/router";
import { Event, Spot } from "pages/api/event/types";
import { useEffect, useState } from "react";

export default function Home() {
    const LOCAL_STORAGE_KEY = "eventData";
    type SortByText = "-" | "↑" | "↓";

    const router = useRouter();
    const [event, setEvent] = useState<Event>();

    const stampedSpots = event?.spots.filter((s) => s.stamp.stamped);
    const notStampedSpots = event?.spots.filter((s) => !s.stamp.stamped);

    useEffect(() => {
        const eventData = router.query.eventData;
        const localDataStr = localStorage.getItem(LOCAL_STORAGE_KEY) ?? "[]";
        const localData: Event[] = JSON.parse(localDataStr);
        const localEventData = localData.find(
            (e) => e.eventName == router.query.name
        );
        if (typeof eventData == "string") {
            setEvent(JSON.parse(eventData));
        } else if (localEventData) {
            setEvent(localEventData);
        } else {
            // router.push("/404");
        }
    }, [router]);

    const [pos, setPos] = useState<GeolocationPosition>();
    const [geoRes, setGeoRes] = useState<ReverseGeocodingResult>();
    const [sortBy, setSortBy] = useState<SortByText>("-");
    const [isModalShow, setIsModalShow] = useState(false);
    const [spotModalData, setSpotModalData] = useState<Spot>();
    const [accordionIsOpen, setAccordionIsOpen] = useState(false);

    useEffect(() => {
        const prevDataStr = localStorage.getItem(LOCAL_STORAGE_KEY) ?? "[]";
        const prevData: Event[] = JSON.parse(prevDataStr);
        if (event && !prevData.find((e) => e.eventName == event.eventName)) {
            prevData.push(event);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(prevData));
        }
    }, [event]);

    const getPos = () => {
        navigator.geolocation.getCurrentPosition((p) => {
            setPos(p);
            openReverseGeocoder([p.coords.longitude, p.coords.latitude]).then(
                (res) => {
                    setGeoRes(res);
                }
            );
        });
    };

    useEffect(getPos, []);

    const toggleSortBy = () => {
        setSortBy((prev) => {
            switch (prev) {
                case "-":
                case "↓": {
                    sortSpots("↑");
                    return "↑";
                }
                case "↑": {
                    sortSpots("↓");
                    return "↓";
                }
            }
        });
    };

    const sortSpots = (sortBy: SortByText) => {
        if (pos && sortBy !== "-") {
            const plusMinus = sortBy === "↑" ? -1 : 1;
            event?.spots.sort((x, y) => {
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
            <Section className="mt-3">
                <H1>{event?.eventName}</H1>
            </Section>
            <Section className="grid-col-vertical-center gap-3">
                <H2>現在地</H2>
                <div>
                    <Button onClick={getPos}>現在の座標を更新</Button>
                </div>
            </Section>
            <Section>
                <div className="rounded border">
                    <input
                        className="peer hidden"
                        id="pos-accordion"
                        type="checkbox"
                        onChange={(e) => {
                            setAccordionIsOpen(e.currentTarget.checked);
                        }}
                        checked={accordionIsOpen}
                    ></input>
                    <label
                        className="flex select-none items-center justify-between bg-slate-50 p-3 transition-[border] duration-700 ease-in-out peer-checked:border-b"
                        htmlFor="pos-accordion"
                    >
                        <p>位置情報を表示する</p>
                        <CrossIcon
                            className={
                                (accordionIsOpen
                                    ? "rotate-0"
                                    : "rotate-[calc(45deg+180deg)]" + " ") +
                                "transition-all duration-700 ease-in-out"
                            }
                        />
                    </label>
                    <div className="h-0 overflow-hidden px-3 transition-accordion duration-700 ease-in-out peer-checked:h-[96px] peer-checked:py-6">
                        <div className="grid-col-vertical-center gap-3">
                            <p>{geoRes?.prefecture}</p>
                            <p>{geoRes?.city}</p>
                        </div>
                        <div className="grid-col-vertical-center gap-3">
                            {(() => {
                                const digit = 10 ** -5;
                                return pos ? (
                                    <>
                                        <p>
                                            {round(pos.coords.latitude, digit)},
                                        </p>
                                        <p>
                                            {round(pos.coords.longitude, digit)}
                                        </p>
                                    </>
                                ) : (
                                    <p></p>
                                );
                            })()}
                        </div>
                    </div>
                </div>
            </Section>
            <Section>
                <div className="grid-col-vertical-center mb-3 gap-3">
                    <H2>スポット</H2>
                    <Button
                        onClick={() => {
                            toggleSortBy();
                        }}
                    >
                        並べ替え {sortBy}
                    </Button>
                </div>
                <SpotWrapper>
                    {notStampedSpots?.map((d, i) => {
                        return (
                            <SpotItem
                                key={i}
                                spot={d}
                                coords={pos?.coords}
                                onMouseDown={() => {
                                    setSpotModalData(d);
                                    setIsModalShow(true);
                                }}
                            />
                        );
                    })}
                </SpotWrapper>
                <div className="my-3">
                    <H2>訪問済みのスポット</H2>
                </div>
                <SpotWrapper>
                    {stampedSpots?.map((d, i) => {
                        return (
                            <SpotItem
                                key={i}
                                spot={d}
                                coords={pos?.coords}
                                onMouseDown={() => {
                                    setSpotModalData(d);
                                    setIsModalShow(true);
                                }}
                            />
                        );
                    })}
                </SpotWrapper>
            </Section>
            <SpotModal
                isShow={isModalShow}
                setIsShow={setIsModalShow}
                spot={spotModalData}
                coords={pos?.coords}
                event={event}
            />
        </div>
    );
}
