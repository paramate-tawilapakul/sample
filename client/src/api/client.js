import { create } from 'apisauce'
import authStorage from '../context/auth/storage'

const apiClient = create({
  baseURL: 'http://localhost:5000/api',
})

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = authStorage.getToken()
  if (!authToken) return
  request.headers['Authorization'] = 'Bearer ' + authToken
})

const get = apiClient.get

apiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig)

  if (response.ok) {
    return response
  }
}

export default apiClient
