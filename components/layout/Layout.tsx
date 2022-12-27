import { ReactNode } from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Main from "./main/Main";

const Layout = (props: { children: ReactNode }) => {
    return (
        <>
            <Header />
            <Main>{props.children}</Main>
            <Footer />
        </>
    );
};

export default Layout;
