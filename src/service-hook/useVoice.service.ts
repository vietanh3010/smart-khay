import AppConfig from "@/configs/AppConfig";
import useHttpClientService from "./useHttpClient.service";
import { VoiceResponse } from "@/types/response.type";
import { useEffect } from "react";

type ResultVoiceService = {
    getAudio: (text: string) => Promise<VoiceResponse>
}

export default function useVoiceService(): ResultVoiceService {
    const httpClient = useHttpClientService();

    useEffect(() => {
        // auth
        httpClient.axiosInstance.interceptors.response.use(
            (response) => {
                return response.data;
            },
            (error) => {
                if (error?.response?.code === 401) {
                    //
                }

                return Promise.reject(error);
            },
        )
        httpClient.axiosInstance.interceptors.request.use(
            (config) => {

                return config
            },
            (error) => {
                return Promise.reject(error);
            },
        )
    }, [httpClient])


    const getAudio = (text: string) => {

        return httpClient.post<VoiceResponse>(
            AppConfig.VOICE.URL,
            text,
            {
                "content-type": "text/plain",
                "api-key": AppConfig.VOICE.API_KEY,
                "speed": "",
                "voice": "thuminhace"
            }
        )
    }

    return {
        getAudio
    }
}