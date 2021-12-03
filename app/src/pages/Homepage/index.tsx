import React from 'react'
import apiRequest from "../../utils/api";

const Homepage: React.FunctionComponent = () => {
    apiRequest({endpoint: "home"}).then(r => r.json()).then(r=>console.log(r))
    return <div>hi</div>
}

export default Homepage
