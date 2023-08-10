import AppConfig from "@/configs/AppConfig";
import { FaceSearchPayload } from "@/types/payload.type";
import { FaceSearchResponse } from "@/types/response.type";
import { useEffect } from "react";
import useHttpClientService from "./useHttpClient.service";

type ResultFaceSearchService = {
    faceSearch: (payload: FaceSearchPayload) => Promise<FaceSearchResponse>
}
export default function useFaceSearchService(): ResultFaceSearchService {
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

    const faceSearch = (payload: FaceSearchPayload): Promise<FaceSearchResponse> => {
        const { file } = payload;
        const formData = new FormData();
        formData.append("collection", AppConfig.FACE_SEARCH.COLLECTION);
        formData.append("file", file);
        formData.append("disable_validation", "1");

        return httpClient.post<FaceSearchResponse>(
            `${AppConfig.FACE_SEARCH.URL}`,
            formData,
            {
                "api_key": AppConfig.FACE_SEARCH.API_KEY,
            }
        )
    }

    return {
        faceSearch
    }
}