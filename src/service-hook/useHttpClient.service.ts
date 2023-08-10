import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const createBaseInstance = (): AxiosInstance => {
    const axiosInstance = axios.create();
    return axiosInstance
}

type ResultHttpClientService = {
    get: <T>(url: string, options?: Record<string, string>, requestOptions?: AxiosRequestConfig<any>) => Promise<T>,
    post: <T>(url: string, data: any, options?: Record<string, string>) => Promise<T>,
    put: <T>(url: string, data: any, options?: Record<string, string>) => Promise<T>,
    patch: <T>(url: string, data: any, options?: Record<string, string>) => Promise<T>,
    delete: <T>(url: string, options?: Record<string, string>) => Promise<T>,
    axiosInstance: AxiosInstance,
}

export default function useHttpClientService(): ResultHttpClientService {
    const axiosInstance = createBaseInstance();
    //methods

    const getAuth = <T>(url: string, headers: Record<string, string> = {}, requestOptions?: AxiosRequestConfig<any>) => {
        return axiosInstance.request({
            url,
            method: 'GET',
            headers: {
                ...headers
            },
            ...(requestOptions ?? {}),
        }) as Promise<T>;
    }

    const postAuth = <T>(url: string, data: any, headers: Record<string, string> = {}) => {
        return axiosInstance.request({
            url,
            method: 'POST',
            data,
            headers: {
                ...headers
            }
        }) as Promise<T>;
    }

    const putAuth = <T>(url: string, data: any, headers: Record<string, string> = {}) => {
        return axiosInstance.request({
            url,
            method: 'PUT',
            data,
            headers: {
                ...headers
            }
        }) as Promise<T>;
    }

    const patchAuth = <T>(url: string, data: any, headers: Record<string, string> = {}) => {
        return axiosInstance.request({
            url,
            method: 'PATCH',
            data,
            headers: {
                ...headers
            }
        }) as Promise<T>;
    }

    const deleteAuth = <T>(url: string, options: Record<string, string> = {}) => {
        return axiosInstance.request({
            url,
            method: 'DELETE',
            headers: {
                ...options
            }
        }) as Promise<T>;
    }

    return {
        get: getAuth,
        post: postAuth,
        put: putAuth,
        patch: patchAuth,
        delete: deleteAuth,
        axiosInstance,
    }
}