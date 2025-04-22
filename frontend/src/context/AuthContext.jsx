import { createContext } from "react"
import { useAuth } from "../hooks/useAuth"

export const AuthContext = createContext({
  token: null,
  userId: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
})

export default function AuthContextProvider({ children }) {
  const { token, userId, login, logout, ready } = useAuth()
  const isAuthenticated = !!token

  return (
    <AuthContext.Provider value={{token, userId, login, logout, isAuthenticated, ready}}>
      {children}
    </AuthContext.Provider>
  )
}