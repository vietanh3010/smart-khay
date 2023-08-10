import { memo } from "react";
import { useOutlet } from "react-router-dom";
import Header from "./Header";
import GlobalNoti from "@/components/GlobalNoti";

const MainLayout = (): JSX.Element => {
    const outlet = useOutlet();

    return (
        <>
            {/* <GradientBackground/> */}
            <div className="z-10 fixed inset-0 h-full w-full flex flex-col">
                <GlobalNoti/>
                <Header/>
                {outlet}
            </div>
        </>
    )
}

export default memo(MainLayout)