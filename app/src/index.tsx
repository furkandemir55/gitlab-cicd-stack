import React, { Suspense } from "react"
import App from "./App"

import { createRoot } from "react-dom/client"
import { ChakraProvider } from "@chakra-ui/react"
import AppContextProvider from "./contexts/AppContextProvider"

const container = document.getElementById("root")!
const root = createRoot(container)
root.render(
	<ChakraProvider>
		<AppContextProvider>
			<Suspense fallback={<div>Loading..</div>}>
				<App />
			</Suspense>
		</AppContextProvider>
	</ChakraProvider>
)
