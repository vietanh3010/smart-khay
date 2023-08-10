import AppConfig from "@/configs/AppConfig";
import i18n from "@/i18n/i18n";
import useAppStore from "@/zustand/app.slice";
import { useEffect } from "react";

export default function useI18n() {
    const { lang } = useAppStore((state) => state)
    useEffect(() => {
        i18n.changeLanguage(lang);
        localStorage.setItem(AppConfig.LANG_TOKEN, lang);
    }, [lang])

}