import useStepStore from "@/zustand/step.slice";
import { memo } from "react";
import SwipeableViews from 'react-swipeable-views';
import FacematchPage from "./FacematchPage";
import OcrItemPage from "./OcrPage";
import ResultPage from "./ResultPage";
import WaitingPage from "./WaitingPage";
import useCustomTranslation from "@/hooks/useCustomTranslation";

const STEPS_DEFINE = [
    {
        label: "waiting page",
        component: <WaitingPage/>
    },
    {
        label: "facematch",
        component: <FacematchPage/>
    },
    {
        label: "ocr",
        component: <OcrItemPage/>
    },
    {
        label: "result",
        component: <ResultPage/>
    }
]

const ActionSteps = (): JSX.Element => {
    const { stepIndex } = useStepStore();
    const {T} = useCustomTranslation();
   
    return (
        <div className="w-full h-full flex flex-col space-y-4 relative bg-gray-100 rounded-md p-5">
            {
                stepIndex > 0 && 
                <div className="absolute left-5 top-5 flex items-center space-x-2 animate-faderight">
                    <span>{`${T('step')} ${stepIndex + 1 - 1}/${STEPS_DEFINE.length - 1}:`}</span>
                    <div className="text-primary font-medium">{T(STEPS_DEFINE[stepIndex].label)}</div>
                </div>
            }
            <SwipeableViews
                className={'grow [&>div]:h-full [&>div>div]:!overflow-hidden [&>div>div]:h-full w-full [&>div]:w-full [&>div>div]:w-full overflow-hidden'}
                axis={'x'}
                index={stepIndex}>
                {
                    STEPS_DEFINE.map((stepItem, i) => 
                        <div key={i} className="h-full w-full">
                            { stepIndex === i && stepItem.component}
                        </div>
                    )
                }
            </SwipeableViews>
        </div>
    )
}

export default memo(ActionSteps)