import AutoResizeTextarea from "components/common/AutoResizeTextarea";
import { ChangeEvent, useEffect, useState } from "react";

const CreateSpotData = () => {
    const [spots, setSpots] = useState("");
    const [data, setData] = useState("");

    useEffect(() => {
        const s = localStorage.getItem("prevInputedSpot");
        if (s) {
            setSpots(s);
        }
    }, []);

    const textareaOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const s = e.currentTarget.value;
        setSpots(s);
        localStorage.setItem("prevInputedSpot", s);
    };

    const fetchData = () => {
        fetch(
            location.href.replace(
                "/dev/createSpotData",
                "/api/getSpotPositions"
            ),
            {
                method: "POST",
                body: JSON.stringify(spots.split("\n").filter((s) => s)),
            }
        )
            .then((res) => res.text())
            .then((t) =>
                setData(
                    t
                        .replace(/^\[/, "")
                        .replace(/\]$/, "")
                        .replace(/\},\{/g, "},\n{")
                )
            );
    };

    return (
        <div>
            <div>
                <label htmlFor="spots">
                    訪れたいスポットを改行区切りで入力
                </label>
            </div>
            <AutoResizeTextarea
                id="spots"
                value={spots}
                onChange={textareaOnChange}
                rows={10}
            ></AutoResizeTextarea>
            <div>
                <button onClick={fetchData}>座標データを取得</button>
            </div>
            <div>
                {data.split("\n").map((d, i) => {
                    return <div key={i}>{d}</div>;
                })}
            </div>
            <div>
                {data ? (
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(data);
                        }}
                    >
                        コピーする
                    </button>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default CreateSpotData;
