import { memo } from "react"
import HorizontalNavigation from "./navigation/HorizontalNavigation"
import LangSection from "@/components/LangSection"
import { Link } from "react-router-dom"
import useStepStore from "@/zustand/step.slice"
import useFaceMatchStore from "@/zustand/facematch.slice"
import useOcrStore from "@/zustand/ocr.slice"


const Header = (): JSX.Element => {
    const { reset: resetStepStore } = useStepStore();
    const { reset: resetFaceMatchStore } = useFaceMatchStore();
    const { reset: resetOcrStore } = useOcrStore();

    const handleClickLogo = () => {
        resetStepStore();
        resetFaceMatchStore();
        resetOcrStore();
    }
    
    return (
        <header className="flex justify-between items-center px-5 py-3">
            <div>
                <Link
                    onClick={handleClickLogo}
                    to={"/home"}
                    className=" bg-gradient-to-r from-blue-7 to-danger-7 text-xl font-bold text-white rounded-md px-2 py-0.5 select-none no-underline">
                    Smart Khay
                </Link>
                <HorizontalNavigation/>
            </div>
            <LangSection/>
        </header>
    )
}

export default memo(Header)