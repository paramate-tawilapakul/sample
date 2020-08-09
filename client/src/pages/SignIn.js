import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import * as Yup from 'yup'

import authApi from '../api/auth'
import useApi from '../hooks/useApi'
import useAuth from '../context/auth/useAuth'
import authStorage from '../context/auth/storage'

// eslint-disable-next-line
const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
})

function SignInPage({ history }) {
  if (authStorage.getUser()) history.push('/')

  const auth = useAuth()
  const signInApi = useApi(authApi.signIn)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async ({ email, password }) => {
    setLoading(true)
    setError(null)

    const { data } = await signInApi.request(email, password)

    if (data.error) {
      setLoading(false)
      return setError(data.error)
    }

    setLoading(false)
    setError(null)
    auth.signIn(data.token)
    history.push('/')
  }

  return (
    <>
      <div>
        SignIn {loading && <span>loading...</span>}{' '}
        {error && <span>{error}</span>}
      </div>
      <button
        onClick={() => {
          handleSubmit({ email: 'paramate.php@gmail.com', password: '12345' })
        }}
      >
        sign in
      </button>
    </>
  )
}

export default withRouter(SignInPage)
