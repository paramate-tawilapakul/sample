import React from 'react'

import useAuth from '../context/auth/useAuth'

function Header() {
  const auth = useAuth()
  return (
    <>
      <div>Header</div>{' '}
      <button
        onClick={() => {
          auth.signOut()
        }}
      >
        sign out
      </button>
    </>
  )
}

export default Header
