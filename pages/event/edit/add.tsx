import Add, { Props } from "components/edit-event/Add";
import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter();
    const props: Props = JSON.parse(router.query.data as string)
    return <Add {...props}></Add>;
}
