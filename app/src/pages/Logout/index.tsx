import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const Logout: React.FunctionComponent = () => {
	const [auth, authHandlers] = useAuth()
	const navigate = useNavigate()
	useEffect(() => {
		authHandlers.logout()
	}, [])
	useEffect(() => {
		if (!auth.loggedIn) navigate("/login")
	}, [auth])

	return <div></div>
}
export default Logout
