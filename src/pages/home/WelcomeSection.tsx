import useCustomTranslation from "@/hooks/useCustomTranslation"
import useFaceMatchStore from "@/zustand/facematch.slice";
import useStepStore from "@/zustand/step.slice";
import { memo } from "react"


const WelcomeSection = (): JSX.Element => {
    const {T} = useCustomTranslation();
    const { faceSearchResponse} = useFaceMatchStore();
    const {stepIndex} = useStepStore();

    return (
        <div>
            {
                stepIndex > 0 && 
                <div className=" text-gray-8 font-bold flex items-end space-x-2">
                    <span className="text-4xl">{`${T('welcome')}, `}</span>
                    {
                        faceSearchResponse && faceSearchResponse?.code === "200" && 
                        <div className="text-blue-500 text-4xl animate-fadeup">
                            {(faceSearchResponse.data as any).name}
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default memo(WelcomeSection)