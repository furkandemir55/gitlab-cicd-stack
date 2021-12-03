type Endpoint = "home"
type ApiParams = { endpoint: Endpoint }
type Api = (params: ApiParams) => Promise<Response>

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000'

const apiRequest: Api = (params) => {
    const {endpoint} = params
    return fetch(`${apiUrl}/${endpoint}`, {method: 'POST'})
}

export default apiRequest
