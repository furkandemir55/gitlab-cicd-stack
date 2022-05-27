import React, { createContext } from "react"
import { AuthState } from "../hooks/hookTypes"

type SetState<T> = React.Dispatch<React.SetStateAction<T>>

type AppContext = {
	authState: AuthState
	setAuthState: SetState<AuthState>
}

const context = createContext<AppContext>({
	authState: { loggedIn: false },
	setAuthState: () => ({}),
})

export default context
