import { useCallback, useEffect, useState } from "react"


export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [username, setUsername] = useState(null)
  const [ready, setReady] = useState(false)
  
  const login = useCallback((id, jwt, name) => {
    
    localStorage.setItem('authData', JSON.stringify({ userId: id, token: jwt, username: name }))
    
    setToken(jwt)
    setUserId(id)
    setUsername(name)
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    setUsername(null)
    localStorage.removeItem('authData')
    console.log('logout')
  }, [])


  useEffect(() => {
		const authData = JSON.parse(localStorage.getItem('authData'));

		if (authData && authData.token) {
			const { userId, token } = authData;
			login(userId, token, authData.username);
		}
		setReady(true);
	}, [login]);

  return {token, userId, ready, login, logout, username}
}