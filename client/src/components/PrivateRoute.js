import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import authStorage from '../context/auth/storage'

export default ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authStorage.getToken() ? (
        <Component {...props} />
      ) : (
        <Redirect to='/signin' />
      )
    }
  />
)
