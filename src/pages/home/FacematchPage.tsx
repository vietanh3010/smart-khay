import CWebcam from "@/components/CWebcam";
import useCustomTranslation from "@/hooks/useCustomTranslation";
import useDevices from "@/hooks/useDevices";
import useFaceSearchService from "@/service-hook/useFaceSearch.service";
import Utils from "@/utils/Utils";
import useFaceMatchStore from "@/zustand/facematch.slice";
import useStepStore from "@/zustand/step.slice";
import { useMutation } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { MenuItem } from "primereact/menuitem";
import { Message, MessageProps } from "primereact/message";
import { SplitButton } from "primereact/splitbutton";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import Webcam from "react-webcam";


const FacematchPage = (): JSX.Element => {
    const {T} = useCustomTranslation()
    const refWebcam = useRef<Webcam>();
    const faceSearchService = useFaceSearchService();
    const { setNextStep } = useStepStore();
    const { 
        faceSearchResponse, 
        setFaceSearchResponse, 
        screenshot, 
        setScreenshot,
        reset
    } = useFaceMatchStore();
    const { deviceList } = useDevices();
    const [selectedCamId, setSelectedCamId] = useState<string>();


    const mutationFaceSearch = useMutation({
        mutationFn: (file: File) => faceSearchService.faceSearch({ file }),
        onSuccess: (res) => {
            setFaceSearchResponse(res);
            if(res.code === "200") {
                setNextStep();
            }
        },
        mutationKey: ['faceSearch']
    })

    const messageBox = useMemo(() => {
        if(mutationFaceSearch.isLoading) {
            return {
                severity: "info",
                text: T('processing'),
                icon: "pi pi-spin pi-spinner"
            } as MessageProps
        }
        if(!faceSearchResponse || !screenshot) {
            return {
                severity: "info",
                text: T('pleaseTakeFaceScreenshot'),
            } as MessageProps
        }
        if(faceSearchResponse.code === "200") {
            return {
                severity: "success",
                text: (faceSearchResponse.data as any).name,
            } as MessageProps
        }
        return {
            severity: "error",
            text: faceSearchResponse.data,
        } as MessageProps
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [T, faceSearchResponse?.code, faceSearchResponse, mutationFaceSearch.isLoading, screenshot])

    const onScreenShot = useCallback(async () => {
        if(!refWebcam.current) return;
        const base64 = refWebcam.current.getScreenshot();
        if(!base64) return;
        setScreenshot(base64)
        const file = Utils.base64toFile(base64);
        mutationFaceSearch.mutateAsync(file);
    },[mutationFaceSearch, setScreenshot])

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
            <div className="grow w-full relative">
                {
                    screenshot ? 
                        <img
                            className="h-full absolute m-auto inset-0 object-contain animate-fadeup aspect-[3/4] rounded-[100%] border-2 border-blue-700 border-solid"
                            src={screenshot}/>
                        :
                        <CWebcam
                            ref={refWebcam as any}
                            className=" h-full absolute inset-0 rounded-[100%] m-auto border-2 border-blue-700 border-solid"
                            mirrored
                            audio={false}
                            forceScreenshotSourceSize={true}
                            screenshotFormat="image/jpeg"
                            videoConstraints={{
                                facingMode: 'FACING_MODE_USER',
                                deviceId: selectedCamId,
                                frameRate: { ideal: 30, max: 30, min: 25},
                                width: { ideal: 1080, min: 480, max: 1080 },
                                height: { ideal: 1440, min: 640, max: 1440 },
                                aspectRatio: { exact: 3 / 4, ideal: 3 / 4 },
                            }}/>
                }

            </div>

            <div className="w-full flex justify-center items-center">
                {
                    faceSearchResponse?.code && faceSearchResponse.code !== "200" ?
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
                    //     loading={mutationFaceSearch.isLoading}
                    //     label={T('capture')}
                    //     className="[&_*]:!font-normal"
                    //     onClick={onScreenShot}/>
                    <SplitButton
                        disabled={Boolean(screenshot)}
                        icon="pi pi-camera"
                        loading={mutationFaceSearch.isLoading}
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

export default memo(FacematchPage);