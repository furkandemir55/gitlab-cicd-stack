import React, { FormEvent, useCallback, useEffect, useState } from "react"
import useApi from "../../hooks/useApi"
import {
	Box,
	Button,
	Center,
	FormControl,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import useAuth from "../../hooks/useAuth"

const Login: React.FunctionComponent = () => {
	const [show, setShow] = React.useState(false)
	const handleClick = () => setShow(!show)

	const [loginState, loginHandlers] = useApi("auth/login")
	const [auth, authHandlers] = useAuth()

	const [body, setBody] = useState({ username: "", password: "" })
	const navigate = useNavigate()
	useEffect(() => {
		if (loginState.response) {
			authHandlers.login(loginState.response.accessToken)
			navigate("/home")
		}
	}, [loginState.response])

	const onSubmit = useCallback(
		(event: FormEvent<HTMLFormElement>) => {
			event.preventDefault()
			loginHandlers.post(body)
		},
		[body]
	)

	return (
		<Center>
			<Box
				// bgImage={'https://www.themarmarahotels.com/Resources/GalleryImage/ImageFile/sisliotel01_l.jpg'}
				// bgRepeat="no-repeat"
				// bgSize={"cover"}
				width={window.innerWidth}
				height={window.innerHeight}
			>
				<Center mt={30}>
					<Box
						sx={styles.boxStyles}
						bgGradient="linear(to-tr,#48494E,#00000000)"
						overflow="hidden"
					>
						<form onSubmit={onSubmit}>
							<FormControl>
								<InputGroup>
									<InputLeftElement
										pointerEvents="none"
										children={<EmailIcon color="white" />}
									/>
									<Input
										id={"username"}
										placeholder={"Username"}
										type={"text"}
										width={350}
										textColor={"white"}
										variant="outline"
										_placeholder={{ opacity: 1, color: "white" }}
										onChange={(event) =>
											setBody((prev) => ({
												...prev,
												username: event.target.value,
											}))
										}
									/>
								</InputGroup>
								<InputGroup mt={3} mb={3}>
									<InputLeftElement
										pointerEvents="none"
										children={<LockIcon color="white" />}
									/>
									<Input
										id={"password"}
										minLength={3}
										placeholder={"Password"}
										type={show ? "text" : "password"}
										width={350}
										variant="outline"
										_placeholder={{ opacity: 1, color: "white" }}
										textColor={"white"}
										onChange={(event) =>
											setBody((prev) => ({
												...prev,
												password: event.target.value,
											}))
										}
									/>
									<InputRightElement width="4.5rem">
										<div style={styles.eyeButton} onClick={handleClick}>
											{show ? (
												<ViewIcon color="white" />
											) : (
												<ViewOffIcon color="white" />
											)}
										</div>
									</InputRightElement>
								</InputGroup>
								<Button
									isLoading={loginState.loading}
									type={"submit"}
									sx={styles.button}
								>
									Login
								</Button>
							</FormControl>
						</form>
					</Box>
				</Center>
			</Box>
		</Center>
	)
}
const styles = {
	boxStyles: {
		display: "flex",
		borderWidth: "1px",
		boxSize: "400px",
		borderColor: "#3b3b3b",
		borderStyle: "double",
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 20,
	},
	button: {
		backgroundColor: "#000",
		textColor: "white",
		textAlign: "center",
		alignSelf: "center",
		justifyContent: "center",
		alignItems: "center",
		width: 200,
		borderColor: "#000",
		borderWidth: 1,
		borderRadius: 10,
		marginLeft: "20%",
		marginTop: 2,
		_hover: { backgroundColor: "white", textColor: "#000" },
	},
	logo: {
		marginBottom: 10,
		width: 250,
		alignSelf: "center",
		marginLeft: 10,
	},
	eyeButton: {
		backgroundColor: "#00000000",
	},
}
export default Login
