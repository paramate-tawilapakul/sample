import React, { useEffect } from 'react'

import dataApi from '../api/data'
import useApi from '../hooks/useApi'

function Data() {
  const getDataApi = useApi(dataApi.getData)
  const getOneDataApi = useApi(dataApi.getOneData)

  useEffect(() => {
    getDataApi.request()
    getOneDataApi.request(115)
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <p>one data: {JSON.stringify(getOneDataApi.data, 2, 4)}</p>
      {getDataApi.data.map((d) => (
        <p key={d.id}>{d.title}</p>
      ))}
    </div>
  )
}

export default Data
