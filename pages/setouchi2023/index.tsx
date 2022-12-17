import Button from "components/common/Button";
import H2 from "components/common/headlline/H2";
import H3 from "components/common/headlline/H3";
import SpotItem from "components/events/SpotItem";
import SpotModal, { SpotModalData } from "components/events/SpotModal";
import calcDistance from "functions/calcDistance";
import { useEffect, useState } from "react";
import spotDatas from "spots/spotDatas";

type SortByText = "-" | "↑" | "↓";

const Home = () => {
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
            spotDatas.setouchi2023.sort((x, y) => {
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
            <div className="p-3">
                <H2>瀬戸内海一周2023春</H2>
            </div>
            <div className="p-3">
                <div>
                    <p className="mb-3">
                        現在地：
                        {pos
                            ? `${pos.coords.latitude}, ${pos.coords.longitude}`
                            : ""}
                    </p>
                </div>
                <div>
                    <Button onClick={getPos}>現在の座標を更新</Button>
                </div>
            </div>
            <div>
                <div className="flex items-center space-x-3 p-3">
                    <H3>スポット一覧</H3>
                    <Button
                        onClick={() => {
                            toggleSortBy();
                        }}
                    >
                        並べ替え {sortBy}
                    </Button>
                </div>
                <div className="grid grid-cols-1 divide-y bg-slate-50 p-0 sm:grid-cols-2 sm:gap-3 sm:divide-none sm:p-3 lg:grid-cols-3 xl:grid-cols-4">
                    {spotDatas.setouchi2023.map((d, i) => {
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
            </div>
            <SpotModal
                isShow={isModalShow}
                setIsShow={setIsModalShow}
                data={spotModalData}
            />
        </div>
    );
};

export default Home;
