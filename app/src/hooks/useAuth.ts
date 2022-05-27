import { useCallback, useContext, useEffect } from "react"
import { AuthHandlers } from "./hookTypes"
import AppContext from "../contexts/AppContext"
import useApi from "./useApi"
import { useNavigate } from "react-router-dom"

const localTokenField = "appAccessToken"

const useAuth = () => {
	const { authState, setAuthState } = useContext(AppContext)
	const [checkTokenState, checkTokenHandlers] = useApi(
		"auth/checkToken",
		undefined,
		true
	)
	const navigate = useNavigate()
	// const [authState, setAuthState] = useState<AuthState>({loggedIn: false})

	const handlers: AuthHandlers = useCallback(
		() => ({
			login: (accessToken: string) => {
				localStorage.setItem(localTokenField, accessToken)
				setAuthState((prev) => ({
					...prev,
					accessToken: accessToken,
					loggedIn: true,
				}))
			},
			logout: () => {
				console.log("yo")
				localStorage.removeItem(localTokenField)
				setAuthState((prev) => ({
					...prev,
					accessToken: undefined,
					loggedIn: false,
				}))
				navigate("/login")
			},
		}),
		[setAuthState]
	)

	//todo this repeats unnecessarily
	useEffect(() => {
		const localToken = localStorage.getItem(localTokenField)
		if (localToken) {
			setAuthState((prev) => ({ ...prev, accessToken: localToken }))
			if (!authState.loggedIn) checkTokenHandlers.get()
		} else navigate("/login")
	}, [])

	useEffect(() => {
		if (checkTokenState.response) {
			if (checkTokenState.response.success)
				setAuthState((prev) => ({ ...prev, loggedIn: true }))
			else handlers().logout()
		}
		if (checkTokenState.error) handlers().logout()
	}, [checkTokenState.response, checkTokenState.error, handlers])

	return [authState, handlers()] as const
}

export default useAuth
