import { OcrPayload } from "@/types/payload.type";
import useHttpClientService from "./useHttpClient.service";
import { OcrResponse } from "@/types/response.type";
import AppConfig from "@/configs/AppConfig";
import { useEffect } from "react";

type ResultOcrService = {
    ocr: (payload: OcrPayload) => Promise<OcrResponse>
}
export default function useOcrService(): ResultOcrService {
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

    const ocr = (payload: OcrPayload): Promise<OcrResponse> => {
        const { image } = payload;
        const formData = new FormData();
        formData.append("image", image);
        formData.append("threshold", "0.4");

        return httpClient.post<OcrResponse>(
            `${AppConfig.OCR.URL}`,
            formData,
            {
                "api_key": AppConfig.OCR.API_KEY
            }
        )
    }

    return {
        ocr
    }
}