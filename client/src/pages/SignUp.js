import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import * as Yup from 'yup'

import usersApi from '../api/users'
import useApi from '../hooks/useApi'
//import useAuth from '../context/auth/useAuth'
import authStorage from '../context/auth/storage'

// eslint-disable-next-line
const validationSchema = Yup.object().shape({
  firstname: Yup.string().required().max(50).label('Firstname'),
  lastname: Yup.string().required().max(50).label('Lastname'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
})

function SignUpPage({ history }) {
  if (authStorage.getUser()) history.push('/')
  const signUpApi = useApi(usersApi.signUp)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  //const auth = useAuth()

  const handleSubmit = async ({ firstname, lastname, email, password }) => {
    setLoading(true)
    setError(null)

    const { data } = await signUpApi.request({
      firstname,
      lastname,
      email,
      password,
    })
    if (data.error) {
      setLoading(false)
      return setError(data.error)
    }

    setLoading(false)
    setError(null)
  }

  return (
    <>
      <div>
        SignIn {loading && <span>loading...</span>}{' '}
        {error && <span>{error}</span>}
      </div>
      <button
        onClick={() => {
          handleSubmit({
            firstname: 'paramate',
            lastname: 'tawilapakul',
            email: 'paramate2.php@gmail.com',
            password: '12345',
          })
        }}
      >
        sign up
      </button>
    </>
  )
}

export default withRouter(SignUpPage)
