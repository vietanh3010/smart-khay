import AppConfig from "@/configs/AppConfig";
import useHttpClientService from "./useHttpClient.service";
import { VoiceResponse } from "@/types/response.type";

type ResultVoiceService = {
    getAudio: (text: string) => Promise<VoiceResponse>
}

export default function useVoiceService(): ResultVoiceService {

    const httpClient = useHttpClientService();


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