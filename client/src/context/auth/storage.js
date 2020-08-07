import jwtDecode from 'jwt-decode'

const key = 'authToken'

const storeToken = async (authToken) => {
  localStorage.setItem(key, authToken)
}

const getToken = async () => {
  localStorage.getItem(key)
}

const getUser = async () => {
  const token = await getToken()
  return token ? jwtDecode(token) : null
}

const removeToken = async () => {
  localStorage.removeItem(key)
}

export default { getToken, getUser, removeToken, storeToken }
