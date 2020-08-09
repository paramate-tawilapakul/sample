import { useState } from 'react'

// USE ONLY RE-RENDER COMPONENT AFTER GET DATA
// IF NOT, HANDLE MANUAL LOADING ANN ERROR STATE IN COMPONENT
export default (apiFunc) => {
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const request = async (...args) => {
    setLoading(true)
    const response = await apiFunc(...args)
    setLoading(false)

    setError(!response.ok)
    setData(response.data)
    return response
  }

  return { data, error, loading, request }
}
