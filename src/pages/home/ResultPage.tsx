import { FaceSearchItem, OcrItem } from "@/types/response.type";
import useFaceMatchStore from "@/zustand/facematch.slice";
import useOcrStore from "@/zustand/ocr.slice";
import { memo, useCallback, useMemo, useState } from "react";
import ResultOcrTable from "./ResultOcrTable";
import useCustomTranslation from "@/hooks/useCustomTranslation";
import clsx from "clsx";
import { Button } from "primereact/button";
import axios from "axios";
import useStepStore from "@/zustand/step.slice";
import AppConfig from "@/configs/AppConfig";
import Utils from "@/utils/Utils";
import { Dialog } from "primereact/dialog";
import { Message } from "primereact/message";
import VoiceBot from "./VoiceBot";

const CUSTOMER_KEYS: Array<keyof FaceSearchItem> = ['id', 'name'];
const COLUMNS: Array<keyof OcrItem> = ['no', 'item', 'quantity', 'unit_price', 'total'];

const DEFAULT_BALANCE = 500000;

const ResultPage = (): JSX.Element => {
    const {
        screenshot,
        faceSearchResponse
    } = useFaceMatchStore();

    const {
        ocrResponse
    } = useOcrStore();
    const {T} = useCustomTranslation();
    const { reset: resetStepStore, setPreviousStep, setFaceSearchResponse } = useStepStore();
    const { reset: resetFaceMatchStore } = useFaceMatchStore();
    const { reset: resetOcrStore, setScreenshot } = useOcrStore();
    const [visible, setVisible] = useState<boolean>(false);
    const faceSearchItem = useMemo(() => {
        return faceSearchResponse?.data as FaceSearchItem
    }, [faceSearchResponse?.data])

    const ocrItem = useMemo(() => {
        return ocrResponse?.data[0];
    }, [ocrResponse?.data])

    const totalPrice = useMemo(() => {
        if(!ocrItem?.items) return 0;
        const total = ocrItem.items.reduce<number>((p,c) => p + Number(c.total), 0);
        return total;
    }, [ocrItem?.items])

    const onPurchase = useCallback(async () => {
        if(!faceSearchItem || !ocrItem) return;
        await axios.post(AppConfig.WEBHOOK.URL, {
            email: faceSearchItem.id,
            message: `
                <div style="display: flex; flex-direction: column">
                    <span style="margin-bottom: 20px">
                        Cảm ơn quý khách 
                        <span style="font-weight: 700; color: #3b82f6">${faceSearchItem.name}</span>
                        đã mua hàng với tiệm
                        <span style="font-weight: 700; color: #3b82f6">Mái Hiên</span>
                    </span>
                    <table style="font-family: arial, sans-serif; border-collapse: collapse; width: 100%;">
                        <tr>
                            ${
                                COLUMNS.map(column => 
                                    `<th style="border: 1px solid #dddddd; text-align: left; padding: 8px">${T(`column-${column}`)}</th>`
                                ).join()
                            }
                        </tr>
                        ${
                            ocrItem.items.map((item) => 
                                `
                                <tr>
                                    ${
                                        COLUMNS.map(column => 
                                            `<td style="border: 1px solid #dddddd; text-align: left; padding: 8px">
                                                ${['unit_price', 'total'].includes(column) ? Utils.formatPrice(Number(item[column])) : item[column]}
                                            </td>`
                                        ).join()
                                    }
                                </tr>
                            `
                            ).join()
                        }
                    </table>
                    <span style="margin-top: 20px; font-size: 24px; width: 100%; display: flex; justify-content: end">
                        ${T('totals')}: ${Utils.formatPrice(totalPrice)}
                    </span>
                    <span style="margin-top: 20px; font-size: 24px; width: 100%; display: flex; justify-content: end">
                        ${T('balance')}: ${Utils.formatPrice(DEFAULT_BALANCE-totalPrice)}
                    </span>
                </div>
            `.replace(/^\s+|\s+$/g, ' ')
        })
        setVisible(true);

        setTimeout(() => {

        })
    },[T, faceSearchItem, ocrItem, totalPrice])

    const onCancel = () => {
        resetStepStore();
        resetFaceMatchStore();
        resetOcrStore();
    }

    const onRetryOcr = () => {
        setPreviousStep();
        setFaceSearchResponse(undefined);
        setScreenshot(undefined);
    }

    const customerSection = (
        <div className="w-full h-full flex space-x-5">
            <img
                className="w-auto h-full object-contain aspect-[3/4] rounded-md"
                src={screenshot}/>
            <div className="flex flex-col space-y-4 py-5">
                <span className="text-primary text-lg font-bold">
                    {T('customerInfo')}
                </span>
                <div className="flex flex-col space-y-3">
                    {
                        CUSTOMER_KEYS.map(key => 
                            <div
                                className="flex flex-col"
                                key={key}>
                                <span className="text-gray-8 font-medium text-sm">{T(`result-${key}`)}</span>
                                <span className="text-primary font-medium text-lg leading-4">{faceSearchItem[key]}</span>
                            </div>
                        ) 
                    }
                    <div
                        className="flex flex-col">
                        <span className="text-gray-8 font-medium text-sm">{T(`balance`)}</span>
                        <span className="text-primary font-medium text-lg leading-4">{Utils.formatPrice(DEFAULT_BALANCE)}</span>
                    </div>
                </div>
            </div>
        </div>
    )

    const resultTableSection = (
        <div className="w-full h-full flex flex-col space-y-2">
            <div className="grow w-full relative">
                <ResultOcrTable data={ocrItem?.items}/>
            </div>
            <div className="w-full flex space-x-2 justify-end">
                <Button
                    onClick={onCancel}
                    severity="secondary"
                    icon="pi pi-arrow-left mr-2">
                    {T('cancelAndHome')}
                </Button>
                <Button
                    onClick={onRetryOcr}
                    severity="info"
                    icon="pi pi-refresh mr-2">
                    {T('retryOcr')}
                </Button>
                <Button
                    onClick={onPurchase}
                    severity="success"
                    icon="pi pi-shopping-cart mr-2">
                    {T('confirmAndPurchase')}
                </Button>
                <Dialog 
                    draggable={false}
                    dismissableMask={false}
                    header="" 
                    visible={visible} 
                    style={{ width: '50vw' }}
                    closable={false}
                    onHide={() => setVisible(false)}
                    footer={
                        <div>
                            <Button
                                onClick={onCancel}
                                severity="success"
                                icon="pi pi-arrow-left mr-2">
                                {T('backToHome')}
                            </Button>
                        </div>
                    }>
                    <Message 
                        severity="success"
                        className="w-full flex items-center justify-start"
                        text="Đã thanh toán thành công. Cảm ơn quý khách" />
                </Dialog>
            </div>
        </div>
    )

    const ocrSection = (
        <>
            {
                ocrItem?.image_link && 
                <img
                    className="w-auto h-full object-contain aspect-[4/3] rounded-md"
                    src={ocrItem.image_link}/>
            }
        </>
    )

    return (
        <div className="grid grid-cols-2 grid-rows-2 gap-5 h-full w-full pt-5 relative">
            <div className="absolute invisible">
                {
                    totalPrice !== 0 && 
                    <VoiceBot text={`Tổng số tiền cần thanh toán là ${totalPrice} đồng.`}/>
                }
            </div>
            {
                Array(3).fill(0).map((_, i) =>
                    <div
                        key={i}
                        className={clsx("h-full w-full relative", 
                        i === 1 && "row-span-2"
                    )}>
                        <div className="absolute inset-0 w-full h-full flex justify-center">
                            <div className="relative w-full h-full">
                                {i === 0 && customerSection}
                                {i === 1 && resultTableSection}
                                {i === 2 && ocrSection}
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default memo(ResultPage)