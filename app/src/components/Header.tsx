import React from "react"
import { Box, Button, ButtonGroup } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Header = () => {
	const [authState] = useAuth()
	return (
		<Box borderBottom={"ActiveBorder"} sx={styles.boxStyles}>
			<ButtonGroup>
				{authState.loggedIn ? (
					<>
						<Link to={"/home"}>
							<Button sx={styles.button}>Home</Button>
						</Link>
						<Link to={"/logout"}>
							<Button sx={styles.button}>Çıkış Yap</Button>
						</Link>
					</>
				) : (
					<>
						<Link to={"/login"}>
							<Button sx={styles.button}>Giriş Yap</Button>
						</Link>
						<Link to={"/register"}>
							<Button sx={styles.button}>Kayıt ol</Button>
						</Link>
					</>
				)}
			</ButtonGroup>
		</Box>
	)
}
const styles = {
	boxStyles: {
		backgroundColor: "#000",
	},
	button: {
		backgroundColor: "#00000000",
		textColor: "white",
		width: 160,
		borderRadius: 0,
		textAlign: "center",
		alignItems: "center",
		justifyContent: "center",
		_hover: {
			backgroundColor: "white",
			textColor: "#000",
		},
		_focus: {
			backgroundColor: "white",
			textColor: "#000",
		},
	},
	logoutButton: {
		alignSelf: "flex-end",
	},
}
export default Header
