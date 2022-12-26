import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter()
    const eventName = router.query.name as string
    return <div>{ eventName}</div>;
}
