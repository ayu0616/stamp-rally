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
import Link from "next/link";
import { useState } from "react";

export default function Home() {
    const [isShowAdd, setIsShowAdd] = useState(false);
    const showAddModal = () => {
        setIsShowAdd(true);
    };

    return (
        <div>
            <Section>
                <H2>イベント一覧</H2>
                <UnorderedList>
                    <ListItem>
                        <Link href="setouchi2023">瀬戸内海一周2023春</Link>
                    </ListItem>
                </UnorderedList>
            </Section>
            <Section>
                <H2>イベントを追加する</H2>
                <Button onClick={showAddModal}>追加する</Button>
            </Section>

            {/* 以下はModal */}
            <Modal isShow={isShowAdd} setIsShow={setIsShowAdd}>
                <ModalHeader closeButtonOnClick={() => setIsShowAdd(false)}>
                    イベントを追加する
                </ModalHeader>
                <ModalBody>
                    <Add></Add>
                </ModalBody>
                <ModalFooter>
                    <div className="grid grid-flow-col gap-3">
                        <Button
                            tailwindColor="gray"
                            onClick={() => setIsShowAdd(false)}
                        >
                            閉じる
                        </Button>
                    </div>
                </ModalFooter>
            </Modal>
        </div>
    );
}
