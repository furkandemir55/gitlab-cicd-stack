type Login = {
	endpoint: "auth/login"
	requestName: "auth/login"
	requestBody: { username: string; password: string }
	responseSuccess: { accessToken: string }
	responseError: { error?: string; code?: string }
}

type Register = {
	endpoint: "auth/register"
	requestName: "auth/register"
	requestBody: { username: string; password: string }
	responseSuccess: undefined
	responseError: { error?: string; code?: string }
}

type CheckToken = {
	endpoint: "auth/checkToken"
	requestName: "auth/checkToken"
	requestBody: undefined
	responseSuccess: { success: boolean }
	responseError: { error?: string; code?: string }
}

type PostEndpoint = Login | Register
type GetEndpoint = CheckToken
export type ApiEndpointNames =
	| PostEndpoint["requestName"]
	| GetEndpoint["requestName"]

export type ApiRequest<R extends ApiEndpointNames> =
	R extends Login["requestName"]
		? Login
		: R extends Register["requestName"]
		? Register
		: R extends CheckToken["requestName"]
		? CheckToken
		: never

export type ApiEndpoint<T extends ApiEndpointNames> = ApiRequest<T>
