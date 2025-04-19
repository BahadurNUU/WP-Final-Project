import { BrowserRouter } from 'react-router';
import AppRouter from './AppRouter';
import Loader from './components/Loader';
import { useAuth } from './hooks/useAuth';
import { AuthContext } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { token, userId, ready, login, logout } = useAuth();
  const isAuth = !!token;
  const authContextValue = {
    token,
    userId,
    login,
    logout,
    isAuthenticated: isAuth
  }
  console.log('isAuth', isAuth)

  if (!ready) return <Loader/>

  return (
  <AuthContext.Provider value={authContextValue}>
    <div className="App">
      <BrowserRouter>
        <AppRouter isAuthenticated={isAuth} />
      </BrowserRouter>
    </div>
  </AuthContext.Provider>
  )
}

export default App
