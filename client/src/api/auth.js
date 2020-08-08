import client from './client'

const signIn = (email, password) =>
  client.post('/auth/signin', { email, password })

export default {
  signIn
}
