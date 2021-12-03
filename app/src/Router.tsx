import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import Error404 from "./pages/Error404"

const Homepage = React.lazy(() => import( "./pages/Homepage"))

const Router: React.FunctionComponent = () =>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
            <Route path={"/"} element={<Homepage/>}/>
            <Route path={"*"} element={<Error404/>}/>
        </Routes>
    </BrowserRouter>

export default Router
