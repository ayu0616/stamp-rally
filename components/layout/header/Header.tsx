import H1 from "components/common/headlline/H1";
import Link from "next/link";

const Header = () => {
    return (
        <header className="bg-slate-50 p-3 sm:p-6">
            <H1>
                <Link href="/">GPSスタンプラリー</Link>
            </H1>
        </header>
    );
};

export default Header;
