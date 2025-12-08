import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-linear-to-r from-gray-900 via-blue-900 to-purple-900 text-white shadow-2xl sticky top-0 z-50 backdrop-blur-lg bg-opacity-95">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-2xl font-extrabold text-white hover:scale-105 transition-transform duration-300"
          >
            <ConfirmationNumberIcon sx={{ fontSize: 32, color: '#60A5FA' }} />
            <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              EventHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/#events-section" 
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  const element = document.getElementById('events-section');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
              className={`flex items-center space-x-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isActive('/') 
                  ? 'bg-white/20 text-white shadow-lg' 
                  : 'hover:bg-white/10 text-gray-200 hover:text-white'
              }`}
            >
              <TheaterComedyIcon sx={{ fontSize: 20 }} />
              <span>Events</span>
            </Link>
            
            {userInfo ? (
              <>
                <Link 
                  to="/admin/dashboard" 
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isActive('/admin/dashboard') 
                      ? 'bg-white/20 text-white shadow-lg' 
                      : 'hover:bg-white/10 text-gray-200 hover:text-white'
                  }`}
                >
                  <DashboardIcon sx={{ fontSize: 20 }} />
                  <span>Dashboard</span>
                </Link>
                
                <div className="flex items-center space-x-3 bg-white/10 px-3 py-2 rounded-lg">
                  <div className="w-8 h-8 bg-linear-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold">
                    {userInfo.username?.[0]?.toUpperCase() || 'A'}
                  </div>
                  <span className="text-sm font-medium">{userInfo.username}</span>
                </div>
                
                <button 
                  onClick={logoutHandler}
                  className="bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-5 py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-1"
                >
                  <LogoutIcon sx={{ fontSize: 18 }} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link 
                to="/admin/login"
                className="bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-5 py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-1"
              >
                <LoginIcon sx={{ fontSize: 18 }} />
                <span>Admin Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <CloseIcon sx={{ fontSize: 28 }} />
            ) : (
              <MenuIcon sx={{ fontSize: 28 }} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 animate-fadeIn">
            <Link 
              to="/#events-section" 
              onClick={(e) => {
                setMobileMenuOpen(false);
                if (location.pathname === '/') {
                  e.preventDefault();
                  const element = document.getElementById('events-section');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all ${
                isActive('/') 
                  ? 'bg-white/20 text-white' 
                  : 'hover:bg-white/10 text-gray-200'
              }`}
            >
              <TheaterComedyIcon sx={{ fontSize: 20 }} />
              <span>Events</span>
            </Link>
            
            {userInfo ? (
              <>
                <Link 
                  to="/admin/dashboard" 
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all ${
                    isActive('/admin/dashboard') 
                      ? 'bg-white/20 text-white' 
                      : 'hover:bg-white/10 text-gray-200'
                  }`}
                >
                  <DashboardIcon sx={{ fontSize: 20 }} />
                  <span>Dashboard</span>
                </Link>
                
                <div className="px-4 py-2 bg-white/10 rounded-lg">
                  <p className="text-sm text-gray-300">Logged in as</p>
                  <p className="font-semibold">{userInfo.username}</p>
                </div>
                
                <button 
                  onClick={logoutHandler}
                  className="w-full flex items-center space-x-2 px-4 py-3 bg-red-500 hover:bg-red-600 rounded-lg font-semibold transition-colors"
                >
                  <LogoutIcon sx={{ fontSize: 20 }} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link 
                to="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-linear-to-r from-blue-500 to-purple-600 rounded-lg font-semibold"
              >
                <LoginIcon sx={{ fontSize: 20 }} />
                <span>Admin Login</span>
              </Link>
            )}
          </div>
        )}
      </nav>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </header>
  );
};

export default Header;
