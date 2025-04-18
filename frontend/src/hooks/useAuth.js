import { useCallback, useEffect, useState } from "react"


export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [ready, setReady] = useState(false)
  
  const login = useCallback((id, jwt) => {
    
    localStorage.setItem('authData', JSON.stringify({ userId: id, token: jwt }))
    
    setToken(jwt)
    setUserId(id)
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem('authData')
    console.log('logout')
  }, [])


  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('authData'))

    if (authData && authData.token) {
      const { userId, token } = authData
      login(userId, token)
    }
    setReady(true)
  }, [login])

  return {token, userId, ready, login, logout}
}