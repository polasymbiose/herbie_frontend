import { useEffect, useState } from 'react'
import { fetchWrapper, host } from '../helper/fetch'

const useData = (path: string): any => {
  const [data, setdata] = useState()

  useEffect(() => {
    const url = `${host()}`
    fetchWrapper(`${url}/${path}`).then(async res => {
      const response = await res.json()
      setdata(response)
    })
  }, [path])

  return data
}

export default useData
