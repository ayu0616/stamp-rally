import Button from "components/common/Button";
import H2 from "components/common/headlline/H2";
import ListItem from "components/common/list/ListItem";
import UnorderedList from "components/common/list/UnorderedList";
import Modal from "components/common/modal/Modal";
import ModalBody from "components/common/modal/ModalBody";
import ModalFooter from "components/common/modal/ModalFooter";
import ModalHeader from "components/common/modal/ModalHeader";
import Add from "components/edit-event/Add";
import Section from "components/layout/section/Section";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Event } from "./api/event/types";

type Props = {
    events: Event[];
};

export default function Home(props: Props) {
    const router = useRouter();

    const [isShowAdd, setIsShowAdd] = useState(false);
    const showAddModal = () => {
        setIsShowAdd(true);
    };

    const [inputEventName, setInputEventName] = useState("");
    const [inputSpots, setInputSpots] = useState([""]);

    return (
        <div>
            <Section>
                <H2>イベント一覧</H2>
                <UnorderedList>
                    {props.events.map((e, i) => {
                        return (
                            <ListItem key={i}>
                                <Link
                                    href={{
                                        pathname: `event/${e.eventName}`,
                                        query: { eventData: JSON.stringify(e) },
                                    }}
                                >
                                    {e.eventName}
                                </Link>
                            </ListItem>
                        );
                    })}
                </UnorderedList>
            </Section>
            <Section className="grid-col-vertical-center gap-3">
                <H2>イベントを追加する</H2>
                <Button onClick={showAddModal}>追加する</Button>
            </Section>

            {/* 以下はModal */}
            <Modal isShow={isShowAdd} setIsShow={setIsShowAdd}>
                <ModalHeader closeButtonOnClick={() => setIsShowAdd(false)}>
                    イベントを追加する
                </ModalHeader>
                <ModalBody>
                    <Add
                        eventName={inputEventName}
                        spots={inputSpots}
                        eventNameOnChange={setInputEventName}
                        spotsOnChange={setInputSpots}
                    ></Add>
                </ModalBody>
                <ModalFooter>
                    <div className="grid grid-flow-col gap-3">
                        <Button
                            tailwindColor="btn-gray"
                            onClick={() => setIsShowAdd(false)}
                        >
                            閉じる
                        </Button>
                        <Button
                            onClick={() => {
                                router.push({
                                    pathname: "/event/edit/add/",
                                    query: {
                                        data: JSON.stringify({
                                            eventName: inputEventName,
                                            spots: inputSpots,
                                        }),
                                    },
                                });
                            }}
                        >
                            フルページで開く
                        </Button>
                    </div>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const url = process.env.SPREADSHEET_URL;
    if (url) {
        const events = (await fetch(url).then((r) => r.json())).events;
        return { props: { events } };
    } else {
        throw Error("SPREADSHEET_URL に不具合があります");
    }
};
