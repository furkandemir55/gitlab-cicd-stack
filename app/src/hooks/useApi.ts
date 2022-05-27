//TODO get request support

import { useCallback, useContext, useEffect, useState } from "react"
import { ApiEndpoint, ApiEndpointNames } from "../utils/apiEndpoints"
import axios, { AxiosError, AxiosResponse } from "axios"
import { useToast } from "@chakra-ui/react"
import AppContext from "../contexts/AppContext"

const apiHost =
	process.env.REACT_APP_PROJECT_ENV === "docker"
		? `${process.env.REACT_APP_HOST_URL}${process.env.PUBLIC_URL}/api`
		: "http://localhost:5000"

type ApiState<T extends ApiEndpointNames> = {
	toastOnError?: boolean
	loading: boolean
	requestName: ApiEndpoint<T>["requestName"]
	body?: ApiEndpoint<T>["requestBody"]
	response?: ApiEndpoint<T>["responseSuccess"]
	error?: ApiEndpoint<T>["responseError"]
}
const initialState = { loading: false }
const useApi = <T extends ApiEndpointNames>(
	requestName: T,
	body?: ApiEndpoint<T>["requestBody"],
	toastOnError?: boolean
) => {
	const [state, setState] = useState<ApiState<T>>({
		...initialState,
		requestName: requestName,
		body,
		toastOnError,
	})
	const { authState } = useContext(AppContext)
	const toast = useToast()

	const handlers = useCallback(
		() => ({
			setError: (error: ApiEndpoint<T>["responseError"]) =>
				setState((prev) => ({ ...prev, error })),
			resetState: () => setState({ ...initialState, requestName: requestName }),
		}),
		[]
	)()

	const requestSuccessHandler = useCallback((r: AxiosResponse) => {
		setState((prev) => ({ ...prev, response: r.data, loading: false }))
	}, [])

	const requestErrorHandler = useCallback(
		(err: AxiosError<ApiEndpoint<T>["responseError"]>) => {
			console.log(err)
			if (err.response && err.response.data)
				setState((prev) => ({
					...prev,
					error: {
						error: err.response?.data.error,
						code: err.response?.data.code,
					},
					loading: false,
				}))
			else
				setState((prev) => ({
					...prev,
					error: { error: err.message },
					loading: false,
				}))
		},
		[]
	)

	const post = useCallback(
		(requestBody?: ApiEndpoint<T>["requestBody"]) => {
			const body = state.body || requestBody
			const options = authState.accessToken
				? { headers: { "X-auth": authState.accessToken } }
				: undefined
			setState((prev) => ({
				...prev,
				loading: true,
				error: undefined,
				response: undefined,
			}))
			axios
				.post(`${apiHost}/${state.requestName}`, body, options)
				.then(requestSuccessHandler)
				.catch(requestErrorHandler)
		},
		[state.requestName]
	)

	const get = useCallback(() => {
		setState((prev) => ({
			...prev,
			loading: true,
			error: undefined,
			response: undefined,
		}))
		const options = authState.accessToken
			? { headers: { "X-auth": authState.accessToken } }
			: undefined
		axios
			.get(`${apiHost}/${state.requestName}`, options)
			.then(requestSuccessHandler)
			.catch(requestErrorHandler)
	}, [state.requestName, authState.accessToken])

	useEffect(() => {
		if (!state.error) return
		if (
			state.error.code === "TOKEN_NOT_FOUND" ||
			state.error.code === "TOKEN_EXPIRE"
		) {
			return
		}
		if (state.toastOnError !== false)
			toast({
				status: "error",
				duration: 2000,
				title: state.error.error,
			})
	}, [state.error])

	// useEffect(() => {
	//     if (!state.response) return
	//     toast({status: "success", duration: 2000, title: "Başarılı"})
	// }, [state.response])

	return [state, { ...handlers, post, get }] as const
}

export default useApi
