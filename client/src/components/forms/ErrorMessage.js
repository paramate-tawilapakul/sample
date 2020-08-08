import React from 'react'

function ErrorMessage({ error, visible }) {
  if (!visible || !error) return null

  return <div style={{ color: 'red' }}>{error}</div>
}

export default ErrorMessage
