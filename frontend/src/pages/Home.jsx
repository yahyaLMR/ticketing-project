import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import API from '../services/api';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import MovieIcon from '@mui/icons-material/Movie';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import FilterListIcon from '@mui/icons-material/FilterList';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const Home = () => {
  const location = useLocation();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const { data } = await API.get('/events');
        setEvents(data);
        setError(null);
      } catch (error) {
        console.error(error);
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (location.hash === '#events-section') {
      const element = document.getElementById('events-section');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const scrollToEvents = () => {
    const eventsSection = document.getElementById('events-section');
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.category === filter);

  const categories = ['all', 'cinema', 'football', 'concert'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FFE6A7]/20 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#f17934] via-[#d61f1c] to-[#ff170f] text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#BB9457]/20 via-transparent to-[#6F1D1B]/20"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#BB9457] rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#6F1D1B] rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="relative container mx-auto px-4 py-28 md:py-40 flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span className="w-2 h-2 bg-[#BB9457] rounded-full mr-2 animate-pulse"></span>
            <span className="text-sm font-medium text-[#FFE6A7]">Live Events Available Now</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight leading-tight">
            Experience the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BB9457] via-[#FFE6A7] to-[#BB9457] animate-gradient">Extraordinary</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#FFE6A7]/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Your gateway to the most exciting concerts, sports matches, and cinema events. Book your tickets seamlessly today.
          </p>
          <button 
            onClick={scrollToEvents}
            className="group relative bg-gradient-to-r from-[#c93631] to-[#ff6a00] hover:from-[#b16e3e] hover:to-[#ee4040] text-white text-lg font-bold py-5 px-10 rounded-full transition-all duration-300 shadow-2xl hover:shadow-[#6F1D1B]/50 hover:scale-105 flex items-center space-x-2 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
            <span className="relative">Explore Events</span>
            <ArrowDownwardIcon className="relative group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-[#BB9457]/10 to-transparent"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#432818] mb-4">Why Choose Us</h2>
            <div className="w-24 h-1 bg-linear-to-r from-[#6F1D1B] to-[#99582A] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-white border border-gray-100 hover:border-[#BB9457] shadow-sm hover:shadow-2xl transition-all duration-500 text-center transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-linear-to-br from-[#6F1D1B] to-[#99582A] text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <SpeedIcon sx={{ fontSize: 36 }} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-[#432818] group-hover:text-[#6F1D1B] transition-colors">Instant Booking</h3>
              <p className="text-[#432818]/80 leading-relaxed">Secure your spot in seconds with our lightning-fast reservation system.</p>
            </div>
            <div className="group p-8 rounded-3xl bg-white border border-gray-100 hover:border-[#BB9457] shadow-sm hover:shadow-2xl transition-all duration-500 text-center transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-linear-to-br from-[#99582A] to-[#6F1D1B] text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <SecurityIcon sx={{ fontSize: 36 }} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-[#432818] group-hover:text-[#99582A] transition-colors">Secure Payments</h3>
              <p className="text-[#432818]/80 leading-relaxed">Your transactions are protected with top-tier security encryption.</p>
            </div>
            <div className="group p-8 rounded-3xl bg-white border border-gray-100 hover:border-[#BB9457] shadow-sm hover:shadow-2xl transition-all duration-500 text-center transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-linear-to-br from-[#6F1D1B] to-[#99582A] text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <SupportAgentIcon sx={{ fontSize: 36 }} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-[#432818] group-hover:text-[#6F1D1B] transition-colors">24/7 Support</h3>
              <p className="text-[#432818]/80 leading-relaxed">Our dedicated team is always here to help you with any questions.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div id="events-section" className="py-20 bg-linear-to-b from-white to-[#FFE6A7]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#432818] mb-4">Upcoming Events</h2>
            <p className="text-xl text-[#432818]/80 mb-10">Don't miss out on these amazing experiences</p>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {categories.map((category) => {
                const Icon = category === 'cinema' ? MovieIcon : category === 'football' ? SportsFootballIcon : category === 'concert' ? MusicNoteIcon : FilterListIcon;
                return (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 border-2 ${
                      filter === category
                        ? 'bg-linear-to-r from-[#6F1D1B] to-[#99582A] text-white shadow-xl border-transparent scale-105'
                        : 'bg-white text-[#432818] hover:bg-[#FFE6A7]/50 shadow-lg border-gray-200 hover:border-[#BB9457]'
                    }`}
                  >
                    <Icon sx={{ fontSize: 22 }} />
                    <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#6F1D1B] mb-4"></div>
                <p className="text-xl text-[#432818]/80">Loading amazing events...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-20">
              <div className="bg-[#6F1D1B]/10 border-l-4 border-[#6F1D1B] p-6 rounded-lg max-w-md">
                <div className="flex items-center mb-2">
                  <ErrorOutlineIcon sx={{ fontSize: 32, color: '#6F1D1B' }} className="mr-3" />
                  <h2 className="text-xl font-bold text-[#6F1D1B]">Oops!</h2>
                </div>
                <p className="text-[#6F1D1B]">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-4 bg-[#6F1D1B] hover:bg-[#432818] text-white px-6 py-2 rounded-lg transition duration-200 flex items-center space-x-2"
                >
                  <RefreshIcon sx={{ fontSize: 20 }} />
                  <span>Try Again</span>
                </button>
              </div>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-20">
              <SearchOffIcon sx={{ fontSize: 96, color: '#BB9457' }} className="mb-4" />
              <h3 className="text-2xl font-bold text-[#432818] mb-2">No Events Found</h3>
              <p className="text-[#432818]/60">Check back later for exciting new events!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event, index) => (
                <div 
                  key={event._id} 
                  className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 flex flex-col border border-gray-100 hover:border-[#BB9457]"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden h-64">
                    {event.imageURL ? (
                      <img 
                        src={event.imageURL} 
                        alt={event.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-[#BB9457] to-[#99582A] flex items-center justify-center text-white">
                        {event.category === 'cinema' ? (
                          <MovieIcon sx={{ fontSize: 96 }} />
                        ) : event.category === 'football' ? (
                          <SportsFootballIcon sx={{ fontSize: 96 }} />
                        ) : (
                          <MusicNoteIcon sx={{ fontSize: 96 }} />
                        )}
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold text-[#432818] capitalize shadow-lg border border-white/50">
                      {event.category}
                    </div>
                    {event.availableSeats < 10 && event.availableSeats > 0 && (
                      <div className="absolute top-3 left-3 bg-[#6F1D1B] text-white px-3 py-1 rounded-full text-sm font-bold shadow-md animate-pulse">
                        Only {event.availableSeats} left!
                      </div>
                    )}
                    {event.availableSeats === 0 && (
                      <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">SOLD OUT</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 grow flex flex-col">
                    <h2 className="text-2xl font-bold mb-3 text-[#432818] line-clamp-2 group-hover:text-[#6F1D1B] transition-colors">
                      {event.title}
                    </h2>
                    <div className="space-y-2 mb-4">
                      <p className="text-[#432818]/80 flex items-center">
                        <EventIcon sx={{ fontSize: 20, color: '#432818' }} className="mr-3" />
                        <span className="font-medium">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      </p>
                      <p className="text-[#432818]/80 flex items-center">
                        <LocationOnIcon sx={{ fontSize: 20, color: '#432818' }} className="mr-3" />
                        <span className="font-medium">{event.location}</span>
                      </p>
                      <p className="text-[#432818]/80 flex items-center">
                        <ConfirmationNumberIcon sx={{ fontSize: 20, color: '#432818' }} className="mr-3" />
                        <span className="font-medium">{event.availableSeats} seats available</span>
                      </p>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-sm text-[#432818]/60">Starting from</p>
                        <p className="text-3xl font-bold text-[#6F1D1B]">${event.price}</p>
                      </div>
                      <Link 
                        to={`/event/${event._id}`}
                        className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                          event.availableSeats === 0
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-linear-to-r from-[#6F1D1B] to-[#99582A] hover:from-[#99582A] hover:to-[#6F1D1B] text-white'
                        }`}
                        onClick={(e) => event.availableSeats === 0 && e.preventDefault()}
                      >
                        {event.availableSeats === 0 ? 'Sold Out' : 'Book Now'}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
