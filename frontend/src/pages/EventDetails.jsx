import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import Notification from '../components/Notification';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import MovieIcon from '@mui/icons-material/Movie';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`/events/${id}`);
        setEvent(data);
        setError(null);
      } catch (error) {
        console.error(error);
        setError('Event not found or could not be loaded.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (quantity > event.availableSeats) {
      setNotification({ type: 'warning', message: `Only ${event.availableSeats} seats available!` });
      return;
    }

    try {
      setSubmitting(true);
      const { data } = await API.post('/tickets', {
        eventId: id,
        customerName,
        customerEmail,
        quantity,
      });
      navigate(`/ticket/${data._id}`);
    } catch (error) {
      setNotification({ type: 'error', message: error.response?.data?.message || 'Error buying ticket' });
    } finally {
      setSubmitting(false);
    }
  };

  const totalPrice = event ? (event.price * quantity).toFixed(2) : 0;

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
          <p className="text-xl text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg max-w-md text-center">
          <SentimentDissatisfiedIcon sx={{ fontSize: 64, color: '#DC2626' }} className="mb-3" />
          <h2 className="text-xl font-bold text-red-800 mb-2">Event Not Found</h2>
          <p className="text-red-700 mb-4">{error}</p>
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200"
          >
            <ArrowBackIcon sx={{ fontSize: 18 }} />
            <span>Back to Events</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600 transition flex items-center space-x-1">
            <ArrowBackIcon sx={{ fontSize: 16 }} />
            <span>Events</span>
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{event.title}</span>
        </nav>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="md:flex">
            {/* Image Section */}
            <div className="md:w-1/2 relative">
              {event.imageURL ? (
                <img src={event.imageURL} alt={event.title} className="w-full h-full object-cover min-h-[500px]" />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-blue-400 to-purple-500 min-h-[500px] flex items-center justify-center text-white">
                  {event.category === 'cinema' ? (
                    <MovieIcon sx={{ fontSize: 144 }} />
                  ) : event.category === 'football' ? (
                    <SportsFootballIcon sx={{ fontSize: 144 }} />
                  ) : (
                    <MusicNoteIcon sx={{ fontSize: 144 }} />
                  )}
                </div>
              )}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold capitalize shadow-lg">
                {event.category}
              </div>
              {event.availableSeats < 10 && event.availableSeats > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                  Only {event.availableSeats} seats left!
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="md:w-1/2 p-8 lg:p-10 flex flex-col">
              <div className="grow">
                <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 text-gray-900 leading-tight">{event.title}</h1>
                <p className="text-gray-600 mb-8 leading-relaxed text-lg">{event.description}</p>
                
                {/* Event Info Cards */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <EventIcon sx={{ fontSize: 32, color: '#3B82F6' }} className="mb-2" />
                    <p className="text-xs text-gray-600 mb-1">Date & Time</p>
                    <p className="font-bold text-gray-900">{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    <p className="text-sm text-gray-600">{new Date(event.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                    <LocationOnIcon sx={{ fontSize: 32, color: '#10B981' }} className="mb-2" />
                    <p className="text-xs text-gray-600 mb-1">Location</p>
                    <p className="font-bold text-gray-900">{event.location}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                    <AttachMoneyIcon sx={{ fontSize: 32, color: '#8B5CF6' }} className="mb-2" />
                    <p className="text-xs text-gray-600 mb-1">Price per ticket</p>
                    <p className="text-2xl font-bold text-green-600">${event.price}</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                    <EventSeatIcon sx={{ fontSize: 32, color: '#F97316' }} className="mb-2" />
                    <p className="text-xs text-gray-600 mb-1">Available Seats</p>
                    <p className="text-2xl font-bold text-gray-900">{event.availableSeats}</p>
                    <p className="text-xs text-gray-500">of {event.totalSeats}</p>
                  </div>
                </div>
              </div>

              {/* Booking Form */}
              <div className="bg-linear-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border-2 border-blue-100 shadow-inner">
                <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                  <ConfirmationNumberIcon sx={{ fontSize: 28, color: '#3B82F6' }} className="mr-2" />
                  <span>Book Your Tickets</span>
                </h3>
                {event.availableSeats === 0 ? (
                  <div className="text-center py-8">
                    <SentimentDissatisfiedIcon sx={{ fontSize: 64, color: '#6B7280' }} className="mb-3" />
                    <p className="text-xl font-bold text-gray-700 mb-2">Sold Out!</p>
                    <p className="text-gray-600">This event has no available seats.</p>
                  </div>
                ) : (
                  <form onSubmit={submitHandler} className="space-y-5">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-1">
                        <PersonIcon sx={{ fontSize: 16 }} />
                        <span>Full Name *</span>
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-1">
                        <EmailIcon sx={{ fontSize: 16 }} />
                        <span>Email Address *</span>
                      </label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-1">
                        <ConfirmationNumberIcon sx={{ fontSize: 16 }} />
                        <span>Number of Tickets *</span>
                      </label>
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-10 h-10 bg-white border-2 border-gray-200 rounded-lg font-bold text-gray-700 hover:bg-gray-100 transition flex items-center justify-center"
                        >
                          <RemoveIcon sx={{ fontSize: 20 }} />
                        </button>
                        <input
                          type="number"
                          min="1"
                          max={event.availableSeats}
                          value={quantity}
                          onChange={(e) => setQuantity(Math.min(event.availableSeats, Math.max(1, Number(e.target.value))))}
                          required
                          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-center font-bold text-lg bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => setQuantity(Math.min(event.availableSeats, quantity + 1))}
                          className="w-10 h-10 bg-white border-2 border-gray-200 rounded-lg font-bold text-gray-700 hover:bg-gray-100 transition flex items-center justify-center"
                        >
                          <AddIcon sx={{ fontSize: 20 }} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Total Price */}
                    <div className="bg-white p-4 rounded-xl border-2 border-blue-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Subtotal ({quantity} {quantity === 1 ? 'ticket' : 'tickets'})</span>
                        <span className="font-bold text-gray-900">${totalPrice}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="text-lg font-bold text-gray-900">Total</span>
                        <span className="text-2xl font-bold text-green-600">${totalPrice}</span>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 rounded-xl transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                    >
                      {submitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCartIcon sx={{ fontSize: 20 }} />
                          <span>Confirm Purchase - ${totalPrice}</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default EventDetails;
