import { BrowserRouter, Route, Routes } from "react-router-dom"
import React from "react"
import Error404 from "./pages/Error404"
import Header from "./components/Header"
import Logout from "./pages/Logout"

const Home = React.lazy(() => import("./pages/Home"))
const Login = React.lazy(() => import("./pages/Login"))
const Register = React.lazy(() => import("./pages/Register"))

//TODO better routing with auth
const Router: React.FunctionComponent = () => (
	<BrowserRouter basename={process.env.PUBLIC_URL}>
		<Header />
		<Routes>
			<Route path={"/"} element={<Login />} />
			<Route path={"/login"} element={<Login />} />
			<Route path={"/register"} element={<Register />} />
			<Route path={"/logout"} element={<Logout />} />
			<Route path={"/Home"} element={<Home />} />
			<Route path={"*"} element={<Error404 />} />
		</Routes>
	</BrowserRouter>
)

export default Router
