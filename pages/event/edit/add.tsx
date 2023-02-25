import Add, { Props } from "components/edit-event/Add";
import { GetServerSideProps } from "next";

export default function Home(props: Props) {
    return <Add {...props}></Add>;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
    context
) => {
    const props = JSON.parse(context.query.data as string);
    return { props };
};
