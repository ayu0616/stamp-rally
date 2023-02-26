import Add, { Props } from "components/edit-event/Add";
import { GetServerSideProps } from "next";
import Head from "next/head";

export default function Home(props: Props) {
    return (
        <>
            <Head>
                <title>イベント追加 - GPSスタンプラリー</title>
            </Head>
            <Add {...props}></Add>
        </>
    );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
    context
) => {
    const props = JSON.parse(context.query.data as string);
    return { props };
};
