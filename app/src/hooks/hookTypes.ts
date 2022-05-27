import React from "react"

type SetState<T> = React.Dispatch<React.SetStateAction<T | undefined>>

export type AuthState = { accessToken?: string; loggedIn: boolean }
export type AuthHandlers = () => {
	login: (accessToken: string) => void
	logout: () => void
}
export type SetAuthState = SetState<AuthState>
