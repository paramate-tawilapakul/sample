import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import * as Yup from 'yup'

import usersApi from '../api/users'
//import useAuth from '../context/auth/useAuth'
import authStorage from '../context/auth/storage'

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required().max(50).label('Firstname'),
  lastname: Yup.string().required().max(50).label('Lastname'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password')
})

function SignUpPage({ history }) {
  if (authStorage.getUser()) history.push('/')

  //const auth = useAuth()
  const [signupFailed, setSignUpFailed] = useState(false)

  const handleSubmit = async ({ firstname, lastname, email, password }) => {
    const result = await usersApi.signup({
      firstname,
      lastname,
      email,
      password
    })

    if (!result.ok) {
      console.log(result.data.error)
      return setSignUpFailed(true)
    }
    console.log(result.data.user)
    setSignUpFailed(false)
    //auth.logIn(result.data.token)
    history.push('/signin')
  }

  return (
    <>
      <div>SignIn</div>
      <button
        onClick={() => {
          handleSubmit({
            firstname: 'savittree',
            lastname: 'tawilapakul',
            email: 'savittree2@gmail.com',
            password: '12345'
          })
        }}
      >
        sign up
      </button>
    </>
  )
}

export default withRouter(SignUpPage)
