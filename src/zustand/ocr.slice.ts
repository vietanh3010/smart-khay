import { OcrResponse } from "@/types/response.type";
import { create } from "zustand";

type OcrState = {
    ocrResponse: OcrResponse | undefined,
    screenshot: string | undefined,
}

type OcrAction = {
    setOcrResponse: (ocrResponse: OcrResponse | undefined) => void,
    setScreenshot: (screenshot: string | undefined) => void,
    reset: () => void,
}

const initialState: OcrState = {
    screenshot: undefined,
    ocrResponse: undefined,
}

const useOcrStore = create<OcrState & OcrAction>((set) => ({
    ...initialState,
    setOcrResponse: (ocrResponse: OcrResponse | undefined) => set(() => ({ ocrResponse })),
    setScreenshot: (screenshot: string | undefined) => set(() => ({ screenshot })),
    reset: () => set(() => ({ ...initialState })),
}))

export default useOcrStore;