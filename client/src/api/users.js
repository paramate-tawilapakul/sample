import client from './client'

const signup = userInfo => client.post('/users/signup', userInfo)

export default { signup }
