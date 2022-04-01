//TODO get request support

import {useCallback, useState} from "react";
import {ApiEndpoint, ApiRequestBody, ApiResponse} from "../utils/apiEndpoints";
import axios, {AxiosError} from "axios";

const apiHost = process.env.REACT_APP_PROJECT_ENV === "docker" ? `${process.env.REACT_APP_HOST_URL}/api` : 'http://localhost:5000'

type ApiError = { message: string, status?: number }
type ApiState<T extends ApiEndpoint> = { loading: boolean, endpoint: T, body?: ApiRequestBody<T>, response?: ApiResponse<T>, error?: ApiError }
const initialState = {loading: false}
const useApi = <T extends ApiEndpoint>(endpoint: T, body?: ApiRequestBody<T>) => {
    const [state, setState] = useState<ApiState<T>>({...initialState, endpoint, body})

    const handlers = useCallback(() => ({
        setError: (error: ApiError) => setState(prev => ({...prev, error})),
        resetState: () => setState({...initialState, endpoint})
    }), [])()

    const fetch = useCallback((requestBody?: ApiRequestBody<T>) => {
        const body = state.body || requestBody
        setState(prev => ({...prev, loading: true, error: undefined}))
        axios.post(`${apiHost}/${state.endpoint}`, body).then(r => {
            setState(prev => ({...prev, response: r.data, loading: false}))
        }).catch((err: AxiosError) => {
            console.log(err.response)
            console.log(err.code)
            if (err.response) setState(prev => ({
                ...prev,
                error: {message: err.response?.data, status: err.response?.status},
                loading: false
            }))
            else setState(prev => ({
                ...prev,
                error: {message: err.message},
                loading: false
            }))
        })

    }, [state.endpoint])

    return [state, {...handlers, fetch}] as const
}

export default useApi
