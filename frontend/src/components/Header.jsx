import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import logo from '../assets/vecteezy_tickets_1189271.png';

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
    <header className="bg-linear-to-r from-[#CCD5AE] via-[#E9EDC9] to-[#FAEDCD] text-black shadow-2xl sticky top-0 z-50 backdrop-blur-lg bg-opacity-95">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-2xl font-extrabold text-black hover:scale-105 transition-transform duration-300"
          >
            {/* <ConfirmationNumberIcon sx={{ fontSize: 32, color: '#000000' }} /> */}
            <img src={logo} alt="EventHub Logo" className="w-20 h-15" />
            <span className="text-black">
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
                  ? 'bg-[#FEFAE0] text-black shadow-lg' 
                  : 'hover:bg-[#FEFAE0]/50 text-black hover:text-black'
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
                      ? 'bg-[#FEFAE0] text-black shadow-lg' 
                      : 'hover:bg-[#FEFAE0]/50 text-black hover:text-black'
                  }`}
                >
                  <DashboardIcon sx={{ fontSize: 20 }} />
                  <span>Dashboard</span>
                </Link>
                
                <div className="flex items-center space-x-3 bg-[#FEFAE0]/50 px-3 py-2 rounded-lg">
                  <div className="w-8 h-8 bg-linear-to-r from-[#D4A373] to-[#FAEDCD] rounded-full flex items-center justify-center font-bold text-white">
                    {userInfo.username?.[0]?.toUpperCase() || 'A'}
                  </div>
                  <span className="text-sm font-medium text-black">{userInfo.username}</span>
                </div>
                
                <button 
                  onClick={logoutHandler}
                  className="bg-linear-to-r from-[#D4A373] to-[#FAEDCD] hover:from-[#FAEDCD] hover:to-[#D4A373] text-black px-5 py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-1"
                >
                  <LogoutIcon sx={{ fontSize: 18 }} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link 
                to="/admin/login"
                className="bg-linear-to-r from-[#D4A373] to-[#FAEDCD] hover:from-[#FAEDCD] hover:to-[#D4A373] text-black px-5 py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-1"
              >
                <LoginIcon sx={{ fontSize: 18 }} />
                <span>Admin Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[#FEFAE0]/50 transition-colors text-black"
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
                  ? 'bg-[#FEFAE0] text-black' 
                  : 'hover:bg-[#FEFAE0]/50 text-black'
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
                      ? 'bg-[#FEFAE0] text-black' 
                      : 'hover:bg-[#FEFAE0]/50 text-black'
                  }`}
                >
                  <DashboardIcon sx={{ fontSize: 20 }} />
                  <span>Dashboard</span>
                </Link>
                
                <div className="px-4 py-2 bg-[#FEFAE0]/50 rounded-lg">
                  <p className="text-sm text-black">Logged in as</p>
                  <p className="font-semibold text-black">{userInfo.username}</p>
                </div>
                
                <button 
                  onClick={logoutHandler}
                  className="w-full flex items-center space-x-2 px-4 py-3 bg-[#D4A373] hover:bg-[#FAEDCD] text-black rounded-lg font-semibold transition-colors"
                >
                  <LogoutIcon sx={{ fontSize: 20 }} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link 
                to="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-linear-to-r from-[#D4A373] to-[#FAEDCD] text-black rounded-lg font-semibold"
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
