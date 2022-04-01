import React, {useEffect} from 'react'
import useApi from "../../hooks/useApi";

const Homepage: React.FunctionComponent = () => {
    const [apiState, {fetch}] = useApi("example1")
    useEffect(() => {
        fetch()
    }, [])
    useEffect(() => {
        console.log(apiState.error)
        console.log(apiState.response)
    }, [apiState.response, apiState.error])
    return <div>hi</div>
}

export default Homepage
