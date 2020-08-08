import jwtDecode from 'jwt-decode'

const key = 'authToken'

const storeToken = authToken => {
  localStorage.setItem(key, authToken)
}

const getToken = () => {
  return localStorage.getItem(key)
}

const getUser = () => {
  const token = getToken()

  if (token) {
    const { user } = jwtDecode(token)
    return user
  }
  return null
}

const removeToken = () => {
  localStorage.removeItem(key)
}

export default { getToken, getUser, removeToken, storeToken }
