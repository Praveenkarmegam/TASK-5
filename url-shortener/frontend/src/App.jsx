import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ActivateAccount from './pages/ActivateAccount';
import Navbar from './components/Navbar';
import { useState, useEffect } from 'react';
import Shortener from './pages/Shortener';
import UrlList from './pages/UrlList';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('token'));
  }, [location]);

  return (
    <>
      <Navbar setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
        <Route path="/login" element={!isAuthenticated ? <Login onLogin={() => setIsAuthenticated(true)} /> : <Navigate to="/" />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/activate/:token" element={<ActivateAccount />} />
        <Route path="/shortener" element={isAuthenticated ? <Shortener /> : <Navigate to="/login" />} />
        <Route path="/urls" element={isAuthenticated ? <UrlList /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;