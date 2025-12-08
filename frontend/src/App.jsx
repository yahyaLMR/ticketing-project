import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import TicketConfirm from './pages/TicketConfirm';
import Login from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#FFE6A7]">
        <Header />
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/ticket/:id" element={<TicketConfirm />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <footer className="bg-[#432818] text-[#FFE6A7] py-8 mt-auto">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-4 flex items-center justify-center space-x-2">
              <ConfirmationNumberIcon sx={{ fontSize: 32, color: '#BB9457' }} />
              <h3 className="text-xl font-bold bg-linear-to-r from-[#BB9457] to-[#FFE6A7] bg-clip-text text-transparent">
                EventHub
              </h3>
            </div>
            <p className="text-[#BB9457] mb-2">Your premier destination for event tickets</p>
            <p className="text-sm text-[#BB9457]/80">© 2025 EventHub. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
