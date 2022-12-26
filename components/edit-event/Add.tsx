import Button from "components/common/Button";
import InputText from "components/common/form/InputText";
import H1 from "components/common/headlline/H1";
import H2 from "components/common/headlline/H2";
import Section from "components/layout/section/Section";
import { ReqData } from "pages/api/event/edit/add";
import { useEffect, useRef, useState } from "react";

export default function Add() {
    const [eventName, setEventName] = useState("");
    const [spots, setSpots] = useState<string[]>([""]);
    const [added, setAdded] = useState(0);
    const spotInputElem = useRef<HTMLInputElement>(null);
    const [composing, setComposing] = useState(false);

    useEffect(() => spotInputElem.current?.focus(), [added]);

    const addSpotInput = () => {
        setSpots((prev) => [...prev, ""]);
        setAdded((prev) => 1 - prev);
    };

    return (
        <form>
            <Section>
                <H1>イベントを追加</H1>
            </Section>
            <Section>
                <H2>イベント名</H2>
                <InputText
                    value={eventName}
                    onChange={(e) => setEventName(e.currentTarget.value)}
                />
            </Section>
            <Section>
                <H2>訪問する観光地</H2>
                {spots.map((v, i) => {
                    return (
                        <div className="mb-3 flex items-center" key={i}>
                            <div className="mr-3">{i + 1}.</div>
                            <div className="flex w-full divide-x rounded border">
                                <input
                                    type="text"
                                    className="input-text"
                                    value={v}
                                    ref={
                                        i == spots.length - 1
                                            ? spotInputElem
                                            : null
                                    }
                                    onChange={(e) =>
                                        setSpots((prev) => {
                                            const changedValue =
                                                e.target.value ?? "";
                                            prev[i] = changedValue;
                                            return [...prev];
                                        })
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key == "Enter" && composing) {
                                            addSpotInput();
                                        }
                                    }}
                                    onCompositionStart={(e) => {
                                        setComposing(false);
                                    }}
                                    onCompositionEnd={(e) => {
                                        setComposing(true);
                                    }}
                                />
                                <button
                                    type="button"
                                    className="bg-slate-50 px-3 py-2 hover:bg-slate-100 active:bg-slate-200 disabled:text-slate-500 disabled:hover:bg-slate-50 disabled:active:bg-slate-50"
                                    onClick={() =>
                                        setSpots((prev) => [
                                            ...prev.filter(
                                                (_, index) => index != i
                                            ),
                                        ])
                                    }
                                    disabled={spots.length <= 1}
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                    );
                })}
                <button
                    type="button"
                    className="w-full border bg-slate-50 px-3 py-2 text-center hover:bg-slate-100 active:bg-slate-200"
                    onClick={addSpotInput}
                >
                    観光地を増やす
                </button>
            </Section>
            <Section className="flex justify-end">
                <Button
                    type="button"
                    tailwindColor="violet"
                    onClick={() => {
                        fetch("/api/edit-event/add", {
                            method: "post",
                            body: JSON.stringify({
                                type: "add",
                                body: {
                                    eventName: eventName,
                                    spots: spots,
                                },
                            } as ReqData),
                            headers: { "Content-Type": "application/json" },
                        }).then((res) => {
                            if (res.ok) {
                                location.reload();
                            }
                        });
                    }}
                >
                    確定する
                </Button>
            </Section>
        </form>
    );
}
