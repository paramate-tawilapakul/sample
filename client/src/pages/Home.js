import React, { useState, useEffect } from 'react'
import socket from '../hooks/useSocket'

function App() {
  const [response, setResponse] = useState('')

  function emitMessage(socket) {
    socket.emit('FromAPI', {
      msg: 'Hello from react' + Math.random().toString(),
      userId: 'admin',
      socketId: socket.id
    })
  }

  useEffect(() => {
    socket.on('FromAPI', data => {
      setResponse(data)
    })
    return () => socket.disconnect()
  }, [])

  return (
    <p>
      It's <time dateTime={response}>{response}</time>
      <button onClick={() => emitMessage(socket)}>send</button>
    </p>
  )
}

export default App
