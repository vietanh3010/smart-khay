import CWebcam from "@/components/CWebcam";
import useCustomTranslation from "@/hooks/useCustomTranslation";
import useDevices from "@/hooks/useDevices";
import useOcrService from "@/service-hook/useOcr.service";
import Path from "@/utils/Path";
import Utils from "@/utils/Utils";
import useOcrStore from "@/zustand/ocr.slice";
import useStepStore from "@/zustand/step.slice";
import { useMutation } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { MenuItem } from "primereact/menuitem";
import { Message, MessageProps } from "primereact/message";
import { SplitButton } from "primereact/splitbutton";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import Webcam from "react-webcam";


const OcrItemPage = (): JSX.Element => {
    const {T} = useCustomTranslation()
    const refWebcam = useRef<Webcam>();
    const ocrService = useOcrService();
    const { setNextStep } = useStepStore();
    const { 
        ocrResponse, 
        setOcrResponse, 
        screenshot, 
        setScreenshot,
        reset
    } = useOcrStore();
    const { deviceList } = useDevices();
    const [selectedCamId, setSelectedCamId] = useState<string>();

    const mutationOcr = useMutation({
        mutationFn: (image: File) => ocrService.ocr({ image }),
        onSuccess: (res) => {
            setTimeout(() => {
                setOcrResponse(res);
                if(res.errorCode === 0) {
                    setNextStep();
                }
            }, 1500)
        },
        mutationKey: ['ocr']
    })

    const messageBox = useMemo(() => {
        if(mutationOcr.isLoading) {
            return {
                severity: "info",
                text: T('processing'),
                icon: "pi pi-spin pi-spinner"
            } as MessageProps
        }
        if(!ocrResponse || !screenshot) {
            return {
                severity: "info",
                text: T('pleaseTakeItemScreenshot'),
            } as MessageProps
        }
        if(ocrResponse.errorCode === 0) {
            return {
                severity: "success",
                text: T("success"),
            } as MessageProps
        }
        return {
            severity: "error",
            text: ocrResponse.errorMessage,
        } as MessageProps
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [T, ocrResponse?.errorCode, ocrResponse, mutationOcr.isLoading, screenshot])

    const onScreenShot = useCallback(async () => {
        if(!refWebcam.current) return;
        const base64 = refWebcam.current.getScreenshot();
        if(!base64) return;
        setScreenshot(base64)
        const file = Utils.base64toFile(base64);
        mutationOcr.mutateAsync(file);
    },[mutationOcr, setScreenshot])

    const handleRecapture = () => {
        reset();
    }

    const devicesMenu: MenuItem[] = deviceList.map<MenuItem>(device => ({
        label: device.label,
        icon: 'pi pi-camera',
        command: () => {
            setSelectedCamId(device.deviceId)
        }
    }))
    
    return (
        <div className="h-full w-full relative flex flex-col space-y-4">
            <div className="w-full flex justify-center items-center">
                <Message {...messageBox}/>
            </div>
            <div className="grow w-full relative flex items-center justify-center">
                <img
                    className="absolute m-auto inset-0 h-full object-contain animate-faderight delay-[1000ms] duration-[1000ms]"
                    src={Path.get("../../images/tray.png")}/>
                {
                    screenshot ? 
                        <img
                            className=" h-full absolute inset-4 m-auto object-contain animate-fadeup aspect-[4/3]"
                            src={screenshot}/>
                        :
                        <CWebcam
                            ref={refWebcam as any}
                            className=" h-[calc(100%-80px)] absolute inset-4 m-auto rounded-3xl"
                            mirrored
                            audio={false}
                            forceScreenshotSourceSize={true}
                            screenshotFormat="image/jpeg"
                            videoConstraints={{
                                facingMode: 'FACING_MODE_ENVIRONMENT',
                                deviceId: selectedCamId,
                                frameRate: { ideal: 30, max: 30, min: 25},
                                width: { ideal: 1080, min: 480, max: 1080 },
                                height: { ideal: 1440, min: 640, max: 1440 },
                                aspectRatio: { exact: 4 / 3, ideal: 4 / 3 },
                            }}/>
                }

            </div>

            <div className="w-full flex justify-center items-center">
                {
                    ocrResponse !== undefined && ocrResponse?.errorCode !== 0 ?
                    <Button
                        severity="secondary"
                        label={T('recapture')}
                        icon="pi pi-refresh"
                        className="[&_*]:!font-normal"
                        onClick={handleRecapture}
                        />
                    :
                    // <Button
                    //     disabled={Boolean(screenshot)}
                    //     icon="pi pi-camera"
                    //     loading={mutationOcr.isLoading}
                    //     label={T('capture')}
                    //     className="[&_*]:!font-normal"
                    //     onClick={onScreenShot}/>
                    <SplitButton
                        disabled={Boolean(screenshot)}
                        icon="pi pi-camera"
                        loading={mutationOcr.isLoading}
                        label={T('capture')}
                        className="[&_*]:!font-normal"
                        onClick={onScreenShot}
                        model={devicesMenu}
                        />
                }
                
            </div>
        </div>
    )
}

export default memo(OcrItemPage);