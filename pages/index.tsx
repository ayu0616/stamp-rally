import ListItem from "components/common/list/ListItem";
import UnorderedList from "components/common/list/UnorderedList";
import Link from "next/link";

export default function Home() {
    return (
        <div>
            <h2>イベント一覧</h2>
            <UnorderedList>
                <ListItem>
                    <Link href="setouchi2023">瀬戸内海一周2023春</Link>
                </ListItem>
            </UnorderedList>
        </div>
    );
}
