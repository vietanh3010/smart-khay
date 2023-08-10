import AppConfig from "@/configs/AppConfig";
import { Lang } from "@/types/types";
import { ToastMessage } from "primereact/toast";
import { create } from "zustand";

type AppState = {
    lang: Lang,
    noti: ToastMessage | undefined
}

type AppAction = {
    setLang: (lang: Lang) => void,
    setNoti: (noti: ToastMessage) => void,
}

const initialState: AppState = {
    lang: (localStorage.getItem(AppConfig.LANG_TOKEN) as Lang | undefined) ?? 'vi',
    noti: undefined,
}

const useAppStore = create<AppState & AppAction>((set) => ({
    ...initialState,
    setLang: (lang: Lang) => set(() => ({ lang })),
    setNoti: (noti: ToastMessage) => set(() => ({ noti })),
    reset: () => set(initialState),
}))

export default useAppStore;