import React, { useState } from "react"
import AppContext from "./AppContext"
import { AuthState } from "../hooks/hookTypes"

const AppContextProvider: React.FC<{ children?: React.ReactNode }> = (
	props
) => {
	const [authState, setAuthState] = useState<AuthState>({
		loggedIn: false,
		accessToken: localStorage.getItem("appAccessToken") ?? undefined,
	})

	const contextProvider = {
		authState,
		setAuthState,
	}

	return (
		<AppContext.Provider value={contextProvider}>
			{props.children}
		</AppContext.Provider>
	)
}

export default AppContextProvider
