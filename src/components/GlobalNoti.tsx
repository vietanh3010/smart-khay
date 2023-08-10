import useCustomTranslation from "@/hooks/useCustomTranslation";
import useAppStore from "@/zustand/app.slice";
import { Toast } from "primereact/toast";
import { memo, useEffect, useRef } from "react";


const GlobalNoti = (): JSX.Element => {
    const refToast = useRef<Toast>(null);
    const { noti } = useAppStore();
    const {T} = useCustomTranslation();
    useEffect(() => {
        if(!refToast.current || !noti) return;
        refToast.current.show({
            ...noti,
            summary: T(noti.severity || "")
        });
    }, [T, noti])

    return (
        <>
            <Toast 
                ref={refToast} 
                position="top-center" />
        </>
    )
}

export default memo(GlobalNoti)