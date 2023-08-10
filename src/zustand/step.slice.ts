import { FaceSearchResponse } from "@/types/response.type";
import { create } from "zustand";

type StepState = {
    stepIndex: number,
    faceSearchResponse: FaceSearchResponse | undefined,
    screenshot: string | undefined,
}

type StepAction = {
    setStepIndex: (stepIndex: number) => void,
    setScreenshot: (screenshot: string | undefined) => void,
    setFaceSearchResponse: (faceSearchResponse: FaceSearchResponse | undefined) => void,
    setNextStep: () => void,
    setPreviousStep: () => void,
    reset: () => void,
}

const initialState: StepState = {
    stepIndex: 0,
    screenshot: undefined,
    faceSearchResponse: undefined,
}

const useStepStore = create<StepState & StepAction>((set) => ({
    ...initialState,
    setStepIndex: (stepIndex: number) => set(() => ({ stepIndex })),
    setScreenshot: (screenshot: string | undefined) => set(() => ({ screenshot })),
    setFaceSearchResponse: (faceSearchResponse: FaceSearchResponse | undefined) => set(() => ({ faceSearchResponse })),
    setNextStep: () => set((state) => ({ stepIndex: state.stepIndex + 1 })),
    setPreviousStep: () => set((state) => ({ stepIndex: state.stepIndex - 1 })),
    reset: () => set(() => ({ ...initialState })),
}))

export default useStepStore;