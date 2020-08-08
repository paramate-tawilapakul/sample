import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import * as Yup from 'yup'

import authApi from '../api/auth'
import useAuth from '../context/auth/useAuth'
import authStorage from '../context/auth/storage'

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password')
})

function SignInPage({ history }) {
  if (authStorage.getUser()) history.push('/')

  const auth = useAuth()
  const [loginFailed, setLoginFailed] = useState(false)

  const handleSubmit = async ({ email, password }) => {
    const result = await authApi.signIn(email, password)

    if (!result.ok) {
      return setLoginFailed(true)
    }

    setLoginFailed(false)
    auth.signIn(result.data.token)
    history.push('/')
  }

  return (
    <>
      <div>SignIn</div>
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
