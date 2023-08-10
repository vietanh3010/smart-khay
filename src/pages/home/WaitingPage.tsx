import useCustomTranslation from "@/hooks/useCustomTranslation";
import Path from "@/utils/Path";
import useStepStore from "@/zustand/step.slice";
import { Button } from "primereact/button";
import { memo } from "react";

const WaitingPage = (): JSX.Element => {
    const {T} = useCustomTranslation();
    const { setStepIndex } = useStepStore();

    const onStart = () => {
        setStepIndex(1);
    }

    return (
        <div className="flex justify-center items-center h-full w-full relative">
            <img
                className="absolute inset-x-0 w-full h-full object-contain"
                src={Path.get(`../../images/mai_hien_cart.png`)}/>
            <div className="flex flex-col space-y-4 2xl:space-y-8">
                <div className="flex flex-col justify-start animate-fadeup">
                    <span className="text-gray-9 text-lg 2xl:text-2xl">
                        {T('welcomeTo')}
                    </span>
                    <span className="text-3xl 2xl:text-5xl text-blue-7 font-extrabold">
                        {T('maiHienShop')}
                    </span>
                </div>

                <div className="w-full flex justify-start">
                    <Button
                        onClick={onStart}
                        rounded
                        >
                        <div className="flex items-center space-x-3">
                            <span className="pb-1">{T('startPurchasing')}</span>
                            <i className="pi pi-arrow-right text-sm"></i>
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default memo(WaitingPage)