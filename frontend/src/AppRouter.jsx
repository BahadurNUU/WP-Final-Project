import { Routes, Route } from 'react-router';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import ProfilePage from './pages/ProfilePage';
import Navbar from './components/Navbar';

export default function AppRouter({isAuthenticated}) {

    if (isAuthenticated) {
        return (   
            <>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/create" element={<CreatePage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Routes>
            </>
        )
    }

    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
        </Routes>
    )
}