import { BrowserRouter } from 'react-router';
import AppRouter from './AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const isAuthenticated = false;

  return (
    <div className="App">
      <BrowserRouter>
        <AppRouter isAuthenticated={isAuthenticated} />
      </BrowserRouter>
    </div>
  )
}

export default App
