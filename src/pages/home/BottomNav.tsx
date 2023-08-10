import useCustomTranslation from "@/hooks/useCustomTranslation";
import useStepStore from "@/zustand/step.slice";
import clsx from "clsx";
import { Button } from "primereact/button";
import { memo } from "react"

const BottomNav = (): JSX.Element => {
    const {T} = useCustomTranslation();
    const { stepIndex, setStepIndex } = useStepStore();

    return (
        <>
            {
                stepIndex > 0 &&
                <div className="w-full flex items-center justify-between">
                    <Button 
                        className={clsx(stepIndex === 0 && "invisible", "animate-faderight")}
                        onClick={() => setStepIndex(stepIndex - 1)}
                        hidden={stepIndex === 0}>
                        {T('back')}
                    </Button>
                    {/* <Button
                         className={clsx(stepIndex >= 3 && "invisible", "animate-faderight")}
                        onClick={() => setStepIndex(stepIndex + 1)}>
                        {T('next')}
                    </Button> */}
                </div>
            }
        </>
    )
}

export default memo(BottomNav)