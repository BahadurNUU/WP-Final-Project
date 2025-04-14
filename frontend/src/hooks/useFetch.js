import {useCallback, useState} from 'react';


export const useFetch = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    if (body && !(body instanceof FormData)) {
      body = JSON.stringify(body)
      headers['Content-Type'] = 'application/json'
    }
    try {
      setLoading(true)

      let data
      const res = await fetch(url, { method, body, headers })

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong...')
      }

      const contentType = res.headers.get('content-type')

      if (contentType.includes('application/json')) {
        data = await res.json()
        console.log('received json', data);
      }

      return data

    } catch (error) {
      setError(error.message)
      console.log('Error when request', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const clearError = () => setError(null)

  return {request, loading, error, clearError}
}