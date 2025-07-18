import React, { useEffect, useState, useContext } from 'react';
import { Routes, Route, NavLink , Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from './pages/ProductsPage';
import AddProductPage from './pages/AddProductPage';
import AboutPage from './pages/AboutPage';
import './App.css';
import MyProductsPage from './pages/MyProductsPage';
import ManagePermissionsPage from './pages/ManagePermissionsPage';
import {hasPermission} from './components/permission';
import PageManagement from './pageManagement/PageManagement';


function App() {
  const location = useLocation();
  const { token } = useContext(AuthContext);

  const publicPaths = ['/login', '/register'];
  const isPublic = publicPaths.includes(location.pathname);

  const [lastVisit, setLastVisit] = useState(null);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleString();
    const saved = localStorage.getItem('lastVisit');
    setLastVisit(saved);
    localStorage.setItem('lastVisit', formatted);
  }, []);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (!token && !isPublic) {
    return <Navigate to="/login" replace />;
  }

  if (isPublic) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <div className="app">
      <header className="header">My CMS</header>

      <div className="main">
        <nav className="sidebar">
          <ul className="nav-list">
            {hasPermission('view_product') && (
              <li><NavLink to="/products" className="nav-item">All Products</NavLink></li>
            )}
            <li><NavLink to="/myproducts" className="nav-item">My Products</NavLink></li>
            {hasPermission('view_user') && (
              <li><NavLink to="/manageroles" className="nav-item">Manage Role</NavLink></li>
            )}
            {hasPermission('add_product') && (
              <li><NavLink to="/add" className="nav-item">Add</NavLink></li>
            )}
            <li><NavLink to="/about" className="nav-item">About</NavLink></li>
            <li><NavLink to="/page-management" className="nav-item">Page CMS</NavLink></li>
          </ul>
          <div className="theme-switcher">
            <button onClick={toggleTheme} className="nav-item">
              Switch to {theme === 'light' ? 'Dark' : 'Light'}
            </button>
          </div>
        </nav>

        <main className="content">
          <Routes>
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/myproducts" element={<MyProductsPage/>} />
            <Route path="/manageroles" element={<ManagePermissionsPage/>} />
            <Route path="/add" element={<AddProductPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<p>404 Not Found</p>} />
            <Route path="/page-management" element={<PageManagement />} />
          </Routes>
        </main>
      </div>

      <footer style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        background: '#ddd',
        padding: '1rem',
        textAlign: 'center',
        borderTop: '1px solid #ccc',
        zIndex: 100
      }}>
        Last visit: {lastVisit || 'Welcome to your first visit!'}
      </footer>
    </div>
  );
}

export default App;
