import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import API from '../services/api';
import Notification from '../components/Notification';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import InfoIcon from '@mui/icons-material/Info';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CancelIcon from '@mui/icons-material/Cancel';

const TicketConfirm = () => {
  const { id } = useParams();
  const location = useLocation();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (location.state?.ticket) {
      setTicket(location.state.ticket);
      setLoading(false);
      setTimeout(() => setShowSuccess(true), 300);
      return;
    }

    const fetchTicket = async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`/tickets/${id}`);
        setTicket(data);
        setTimeout(() => setShowSuccess(true), 300);
      } catch (error) {
        console.error(error);
        setError('Ticket not found or could not be loaded.');
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id, location.state]);

  const handleDownload = async () => {
    if (ticket.isOffline) {
      window.print();
      return;
    }

    try {
      const response = await API.get(`/tickets/${ticket._id}/download`, {
        responseType: 'blob',
      });
      
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ticket-${ticket._id}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
      setNotification({ type: 'success', message: 'Ticket PDF downloaded successfully!' });
    } catch (error) {
      console.error('Error downloading PDF:', error);
      setNotification({ type: 'error', message: 'Failed to download ticket. Please try again.' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-linear-to-br from-[#FFE6A7] to-[#BB9457]/20">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#BB9457] mb-4"></div>
          <p className="text-xl text-[#432818]/80">Loading your ticket...</p>
        </div>
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-linear-to-br from-[#FFE6A7] to-[#BB9457]/20">
        <div className="bg-white border-l-4 border-[#A71014] p-8 rounded-lg max-w-md text-center shadow-lg">
          <CancelIcon sx={{ fontSize: 64, color: '#A71014' }} className="mb-4" />
          <h2 className="text-2xl font-bold text-[#432818] mb-2">Ticket Not Found</h2>
          <p className="text-[#432818]/80 mb-6">{error}</p>
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 bg-[#A71014] hover:bg-[#432818] text-white px-6 py-3 rounded-lg transition duration-200 font-semibold"
          >
            <ArrowBackIcon sx={{ fontSize: 18 }} />
            <span>Browse Events</span>
          </Link>
        </div>
      </div>
    );
  }

  const totalPrice = (ticket.eventId.price * ticket.quantity).toFixed(2);

  return (
    <>
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="min-h-screen bg-linear-to-br from-[#FFE6A7] via-[#BB9457]/20 to-[#FFE6A7] py-12 px-4">
        <div className="container mx-auto max-w-2xl">
        {/* Success Animation */}
        <div className={`transform transition-all duration-700 ${showSuccess ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-[#BB9457]">
            {/* Header */}
            <div className="bg-linear-to-r from-[#A71014] to-[#99582A] p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-20 translate-y-20"></div>
              </div>
              <div className="relative">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce">
                  <CheckCircleIcon sx={{ fontSize: 64, color: '#A71014' }} />
                </div>
                <h1 className="text-4xl font-extrabold text-white mb-2">Booking Confirmed!</h1>
                <p className="text-[#FFE6A7] text-lg">Your ticket is ready</p>
              </div>
            </div>

            {/* Ticket Details */}
            <div className="p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#432818] mb-2">{ticket.eventId.title}</h2>
                <div className="flex items-center text-[#432818]/80 space-x-2">
                  <EventIcon sx={{ fontSize: 20 }} />
                  <span>
                    {new Date(ticket.eventId.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-[#FFE6A7]/30 p-4 rounded-xl border border-[#BB9457]/30">
                  <PersonIcon sx={{ fontSize: 20, color: '#A71014' }} className="mb-1" />
                  <p className="text-xs text-[#432818]/80 mb-1">Customer Name</p>
                  <p className="font-bold text-[#432818]">{ticket.customerName}</p>
                </div>
                <div className="bg-[#FFE6A7]/30 p-4 rounded-xl border border-[#BB9457]/30">
                  <EmailIcon sx={{ fontSize: 20, color: '#99582A' }} className="mb-1" />
                  <p className="text-xs text-[#432818]/80 mb-1">Email</p>
                  <p className="font-bold text-[#432818] text-sm break-all">{ticket.customerEmail}</p>
                </div>
                <div className="bg-[#FFE6A7]/30 p-4 rounded-xl border border-[#BB9457]/30">
                  <ConfirmationNumberIcon sx={{ fontSize: 20, color: '#432818' }} className="mb-1" />
                  <p className="text-xs text-[#432818]/80 mb-1">Quantity</p>
                  <p className="font-bold text-[#432818] text-2xl">{ticket.quantity} {ticket.quantity === 1 ? 'Ticket' : 'Tickets'}</p>
                </div>
                <div className="bg-[#FFE6A7]/30 p-4 rounded-xl border border-[#BB9457]/30">
                  <AttachMoneyIcon sx={{ fontSize: 20, color: '#BB9457' }} className="mb-1" />
                  <p className="text-xs text-[#432818]/80 mb-1">Total Price</p>
                  <p className="font-bold text-[#A71014] text-2xl">${totalPrice}</p>
                </div>
              </div>

              {/* Ticket ID */}
              <div className="bg-[#FFE6A7]/20 p-4 rounded-xl mb-8 border-2 border-dashed border-[#BB9457]/50">
                <p className="text-xs text-[#432818]/80 mb-1 text-center">Ticket ID</p>
                <p className="font-mono font-bold text-center text-lg text-[#432818]">{ticket._id}</p>
              </div>

              {/* QR Code */}
              <div className="mb-8">
                <div className="bg-linear-to-br from-[#FFE6A7]/50 to-[#BB9457]/20 p-6 rounded-2xl border-2 border-[#BB9457] shadow-inner">
                  <p className="text-center text-sm text-[#432818]/80 mb-4 font-semibold">Scan this QR code at the venue</p>
                  <div className="flex justify-center">
                    <div className="bg-white p-4 rounded-xl shadow-lg border-4 border-white">
                      <img src={ticket.qrCode} alt="Ticket QR Code" className="w-80 h-80" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button 
                  onClick={handleDownload}
                  className="w-full bg-linear-to-r from-[#A71014] to-[#99582A] hover:from-[#99582A] hover:to-[#A71014] text-white font-bold py-4 rounded-xl transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
                >
                  <span className="mr-2">📥</span>
                  Download Ticket as PDF
                </button>
              </div>

              {/* Info Note */}
              <div className="mt-8 p-4 bg-[#FFE6A7]/30 rounded-xl border border-[#BB9457]">
                <p className="text-sm text-[#432818] text-center">
                  <span className="font-semibold">ℹ️ Important:</span> Please download and bring your ticket (printed or digital) to the event entrance.
                </p>
              </div>

              {/* Back Button */}
              <div className="mt-6 text-center">
                <Link 
                  to="/" 
                  className="inline-block text-[#A71014] hover:text-[#99582A] font-semibold transition"
                >
                  ← Back to Events
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default TicketConfirm;
