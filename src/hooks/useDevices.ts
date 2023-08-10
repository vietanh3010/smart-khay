import { useState, useEffect } from "react";

type ResultDevices = {
    deviceList: MediaDeviceInfo[]
}
export default function useDevices(): ResultDevices {
    const [deviceList, setDeviceList] = useState<MediaDeviceInfo[]>([])

    useEffect(() => {
        try {
            navigator.mediaDevices.enumerateDevices().then((devices) => {
                const cameraDevices = devices.filter(d => d.kind === 'videoinput');
                setDeviceList(cameraDevices);
            })
        }
        catch (e) {
            // alert(e)
        }
    }, [])

    return {
        deviceList
    }
}