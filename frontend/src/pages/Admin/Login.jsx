import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../services/api';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WarningIcon from '@mui/icons-material/Warning';
import SecurityIcon from '@mui/icons-material/Security';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      const { data } = await API.post('/users/login', { username, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/admin/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#432818] via-[#A71014] to-[#99582A] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Back to home link */}
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-white hover:text-[#FFE6A7] mb-6 transition font-medium"
        >
          <ArrowBackIcon sx={{ fontSize: 18 }} />
          <span>Back to Events</span>
        </Link>

        <div className="bg-white/95 backdrop-blur-lg p-8 md:p-10 rounded-3xl shadow-2xl border border-white/20">
          {/* Logo/Icon */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-linear-to-r from-[#A71014] to-[#99582A] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transform rotate-3">
              <LockIcon sx={{ fontSize: 48, color: 'white' }} className="transform -rotate-3" />
            </div>
            <h1 className="text-3xl font-extrabold text-[#432818] mb-2">Admin Login</h1>
            <p className="text-[#432818]/80">Enter your credentials to continue</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-[#A71014]/10 border-l-4 border-[#A71014] rounded-lg animate-shake">
              <div className="flex items-center">
                <WarningIcon sx={{ fontSize: 20, color: '#A71014' }} className="mr-2" />
                <p className="text-[#A71014] text-sm font-medium">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[#432818] mb-2">
                Username
              </label>
              <div className="relative">
                <PersonIcon sx={{ fontSize: 20, color: '#BB9457' }} className="absolute left-4 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 border-2 border-[#BB9457]/30 rounded-xl focus:ring-2 focus:ring-[#BB9457] focus:border-[#BB9457] outline-none transition bg-[#FFE6A7]/20 focus:bg-white"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#432818] mb-2">
                Password
              </label>
              <div className="relative">
                <LockIcon sx={{ fontSize: 20, color: '#BB9457' }} className="absolute left-4 top-1/2 transform -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-12 py-3 border-2 border-[#BB9457]/30 rounded-xl focus:ring-2 focus:ring-[#BB9457] focus:border-[#BB9457] outline-none transition bg-[#FFE6A7]/20 focus:bg-white"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#BB9457] hover:text-[#432818] transition"
                >
                  {showPassword ? (
                    <VisibilityIcon sx={{ fontSize: 20 }} />
                  ) : (
                    <VisibilityOffIcon sx={{ fontSize: 20 }} />
                  )}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-[#A71014] to-[#99582A] hover:from-[#99582A] hover:to-[#A71014] text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <LoginIcon sx={{ fontSize: 20 }} />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#432818]/80">
              Demo: Use <code className="bg-[#FFE6A7]/30 px-2 py-1 rounded text-xs font-mono">admin / admin123</code>
            </p>
          </div>
        </div>

        <p className="text-center mt-6 text-white text-sm flex items-center justify-center space-x-2">
          <SecurityIcon sx={{ fontSize: 18 }} />
          <span>Secure admin access only</span>
        </p>
      </div>

      {/* Shake animation for errors */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Login;
