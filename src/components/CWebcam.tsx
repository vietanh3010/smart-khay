import useCustomTranslation from "@/hooks/useCustomTranslation"
import { ProgressSpinner } from "primereact/progressspinner"
import { forwardRef, useState } from "react"
import Webcam, { WebcamProps } from "react-webcam"

type CWebcamProps = Partial<WebcamProps> & {
    //
}
const CWebcam = (
    props: CWebcamProps,
    ref: React.ForwardedRef<Webcam>
): JSX.Element => {
    const {T} = useCustomTranslation();
    const [isCamError, setCamError] = useState<boolean>(false);
    const [isCamReady, setCamReady] = useState<boolean>(false);

    return (
        <div className="w-full h-full relative flex justify-center overflow-hidden">
            {
                !isCamReady && 
                <div className="absolute inset-0 m-auto h-full flex flex-col space-y-2 justify-center items-center bg-gray-4 aspect-[3/4] z-20 rounded-[100%]">
                    <span className="text-gray-9 font-medium">{T('gettingCameraReady')}</span>
                    <ProgressSpinner 
                        style={{width: '50px', height: '50px'}} 
                        strokeWidth="4" 
                        fill="var(--surface-ground)" 
                        animationDuration="1.5s" />
                </div>
            }
            {
                isCamError && 
                <div className="absolute inset-0 m-auto h-full flex justify-center items-center bg-gray-4 aspect-[3/4] z-20 rounded-[100%]">
                    <span className="text-danger-7 font-medium">{T('errorOpeningCamera')}</span>
                </div>
            }
            <Webcam
                ref={ref}
                {...props}
                onUserMedia={() => {
                    setCamReady(true)
                }}
                onUserMediaError={() => setCamError(true)}
            />
        </div>
    )
}

export default forwardRef(CWebcam)