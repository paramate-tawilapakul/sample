import client from './client'

const signUp = (userInfo) => client.post('/users/signup', userInfo)

export default { signUp }
