import { FaceSearchResponse } from "@/types/response.type";
import { create } from "zustand";

type FaceMatchState = {
    faceSearchResponse: FaceSearchResponse | undefined,
    screenshot: string | undefined,
}

type FaceMatchAction = {
    setScreenshot: (screenshot: string | undefined) => void,
    setFaceSearchResponse: (faceSearchResponse: FaceSearchResponse | undefined) => void,
    reset: () => void,
}

const initialState: FaceMatchState = {
    screenshot: undefined,
    faceSearchResponse: undefined,
}

const useFaceMatchStore = create<FaceMatchState & FaceMatchAction>((set) => ({
    ...initialState,
    setScreenshot: (screenshot: string | undefined) => set(() => ({ screenshot })),
    setFaceSearchResponse: (faceSearchResponse: FaceSearchResponse | undefined) => set(() => ({ faceSearchResponse })),
    reset: () => set(() => ({ ...initialState })),
}))

export default useFaceMatchStore;