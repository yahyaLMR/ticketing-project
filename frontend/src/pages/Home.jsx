import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

const Home = () => {
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

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.category === filter);

  const categories = ['all', 'cinema', 'football', 'concert'];

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
          <p className="text-xl text-gray-600">Loading amazing events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg max-w-md">
          <div className="flex items-center mb-2">
            <ErrorOutlineIcon sx={{ fontSize: 32, color: '#DC2626' }} className="mr-3" />
            <h2 className="text-xl font-bold text-red-800">Oops!</h2>
          </div>
          <p className="text-red-700">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition duration-200 flex items-center space-x-2"
          >
            <RefreshIcon sx={{ fontSize: 20 }} />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Discover Amazing Events
          </h1>
          <p className="text-xl text-gray-600 mb-8">Find and book tickets for the best events in your city</p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => {
              const Icon = category === 'cinema' ? MovieIcon : category === 'football' ? SportsFootballIcon : category === 'concert' ? MusicNoteIcon : FilterListIcon;
              return (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 ${
                    filter === category
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                  }`}
                >
                  <Icon sx={{ fontSize: 20 }} />
                  <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-20">
            <SearchOffIcon sx={{ fontSize: 96, color: '#9CA3AF' }} className="mb-4" />
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Events Found</h3>
            <p className="text-gray-500">Check back later for exciting new events!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <div 
                key={event._id} 
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden h-56">
                  {event.imageURL ? (
                    <img 
                      src={event.imageURL} 
                      alt={event.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white">
                      {event.category === 'cinema' ? (
                        <MovieIcon sx={{ fontSize: 96 }} />
                      ) : event.category === 'football' ? (
                        <SportsFootballIcon sx={{ fontSize: 96 }} />
                      ) : (
                        <MusicNoteIcon sx={{ fontSize: 96 }} />
                      )}
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-700 capitalize shadow-md">
                    {event.category}
                  </div>
                  {event.availableSeats < 10 && event.availableSeats > 0 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md animate-pulse">
                      Only {event.availableSeats} left!
                    </div>
                  )}
                  {event.availableSeats === 0 && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">SOLD OUT</span>
                    </div>
                  )}
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h2 className="text-2xl font-bold mb-3 text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h2>
                  <div className="space-y-2 mb-4">
                    <p className="text-gray-600 flex items-center">
                      <EventIcon sx={{ fontSize: 20, color: '#4B5563' }} className="mr-3" />
                      <span className="font-medium">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <LocationOnIcon sx={{ fontSize: 20, color: '#4B5563' }} className="mr-3" />
                      <span className="font-medium">{event.location}</span>
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <ConfirmationNumberIcon sx={{ fontSize: 20, color: '#4B5563' }} className="mr-3" />
                      <span className="font-medium">{event.availableSeats} seats available</span>
                    </p>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-sm text-gray-500">Starting from</p>
                      <p className="text-3xl font-bold text-green-600">${event.price}</p>
                    </div>
                    <Link 
                      to={`/event/${event._id}`}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 ${
                        event.availableSeats === 0
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
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
  );
};

export default Home;
