import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
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
  }, [id]);

  const handleDownload = async () => {
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
      <div className="min-h-[80vh] flex items-center justify-center bg-linear-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
          <p className="text-xl text-gray-600">Loading your ticket...</p>
        </div>
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100">
        <div className="bg-white border-l-4 border-red-500 p-8 rounded-lg max-w-md text-center shadow-lg">
          <CancelIcon sx={{ fontSize: 64, color: '#EF4444' }} className="mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Ticket Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-200 font-semibold"
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
      <div className="min-h-screen bg-linear-to-br from-green-50 via-blue-50 to-purple-50 py-12 px-4">
        <div className="container mx-auto max-w-2xl">
        {/* Success Animation */}
        <div className={`transform transition-all duration-700 ${showSuccess ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-green-400">
            {/* Header */}
            <div className="bg-linear-to-r from-green-500 to-emerald-600 p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-20 translate-y-20"></div>
              </div>
              <div className="relative">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce">
                  <CheckCircleIcon sx={{ fontSize: 64, color: '#10B981' }} />
                </div>
                <h1 className="text-4xl font-extrabold text-white mb-2">Booking Confirmed!</h1>
                <p className="text-green-100 text-lg">Your ticket is ready</p>
              </div>
            </div>

            {/* Ticket Details */}
            <div className="p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{ticket.eventId.title}</h2>
                <div className="flex items-center text-gray-600 space-x-2">
                  <EventIcon sx={{ fontSize: 20 }} />
                  <span>
                    {new Date(ticket.eventId.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <PersonIcon sx={{ fontSize: 20, color: '#3B82F6' }} className="mb-1" />
                  <p className="text-xs text-gray-600 mb-1">Customer Name</p>
                  <p className="font-bold text-gray-900">{ticket.customerName}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                  <EmailIcon sx={{ fontSize: 20, color: '#8B5CF6' }} className="mb-1" />
                  <p className="text-xs text-gray-600 mb-1">Email</p>
                  <p className="font-bold text-gray-900 text-sm break-all">{ticket.customerEmail}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                  <ConfirmationNumberIcon sx={{ fontSize: 20, color: '#10B981' }} className="mb-1" />
                  <p className="text-xs text-gray-600 mb-1">Quantity</p>
                  <p className="font-bold text-gray-900 text-2xl">{ticket.quantity} {ticket.quantity === 1 ? 'Ticket' : 'Tickets'}</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                  <AttachMoneyIcon sx={{ fontSize: 20, color: '#F97316' }} className="mb-1" />
                  <p className="text-xs text-gray-600 mb-1">Total Price</p>
                  <p className="font-bold text-green-600 text-2xl">${totalPrice}</p>
                </div>
              </div>

              {/* Ticket ID */}
              <div className="bg-gray-50 p-4 rounded-xl mb-8 border-2 border-dashed border-gray-300">
                <p className="text-xs text-gray-600 mb-1 text-center">Ticket ID</p>
                <p className="font-mono font-bold text-center text-lg text-gray-900">{ticket._id}</p>
              </div>

              {/* QR Code */}
              <div className="mb-8">
                <div className="bg-linear-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border-2 border-blue-200 shadow-inner">
                  <p className="text-center text-sm text-gray-600 mb-4 font-semibold">Scan this QR code at the venue</p>
                  <div className="flex justify-center">
                    <div className="bg-white p-4 rounded-xl shadow-lg border-4 border-white">
                      <img src={ticket.qrCode} alt="Ticket QR Code" className="w-56 h-56" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button 
                  onClick={handleDownload}
                  className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
                >
                  <span className="mr-2">📥</span>
                  Download Ticket as PDF
                </button>
              </div>

              {/* Info Note */}
              <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-sm text-gray-700 text-center">
                  <span className="font-semibold">ℹ️ Important:</span> Please download and bring your ticket (printed or digital) to the event entrance.
                </p>
              </div>

              {/* Back Button */}
              <div className="mt-6 text-center">
                <Link 
                  to="/" 
                  className="inline-block text-blue-600 hover:text-blue-700 font-semibold transition"
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
