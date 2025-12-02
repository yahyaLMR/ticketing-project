import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import Notification from '../../components/Notification';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ListIcon from '@mui/icons-material/List';
import DeleteIcon from '@mui/icons-material/Delete';
import MovieIcon from '@mui/icons-material/Movie';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import InventoryIcon from '@mui/icons-material/Inventory';

const Dashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'cinema',
    date: '',
    location: '',
    price: 0,
    totalSeats: 0,
    imageURL: '',
  });

  const fetchEvents = useCallback(async () => {
    const { data } = await API.get('/events');
    setEvents(data);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('userInfo')) {
      navigate('/admin/login');
    } else {
      fetchEvents();
    }
  }, [navigate, fetchEvents]);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await API.delete(`/events/${id}`);
        fetchEvents();
        setNotification({ type: 'success', message: 'Event deleted successfully!' });
      } catch (error) {
        setNotification({ type: 'error', message: 'Error deleting event. Please try again.' });
      }
    }
  };

  const createHandler = async (e) => {
    e.preventDefault();
    try {
      await API.post('/events', formData);
      setFormData({
        title: '',
        description: '',
        category: 'cinema',
        date: '',
        location: '',
        price: 0,
        totalSeats: 0,
        imageURL: '',
      });
      fetchEvents();
      setNotification({ type: 'success', message: 'Event created successfully!' });
    } catch (error) {
      setNotification({ type: 'error', message: 'Error creating event. Please try again.' });
    }
  };

  const stats = {
    totalEvents: events.length,
    totalSeats: events.reduce((sum, e) => sum + e.totalSeats, 0),
    soldSeats: events.reduce((sum, e) => sum + (e.totalSeats - e.availableSeats), 0),
    revenue: events.reduce((sum, e) => sum + (e.price * (e.totalSeats - e.availableSeats)), 0)
  };

  return (
    <>
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center space-x-3">
          <DashboardIcon sx={{ fontSize: 48, color: '#1F2937' }} />
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your events and track performance</p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-lg text-white transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-2">
              <EventIcon sx={{ fontSize: 40 }} />
              <span className="text-sm bg-white/20 px-2 py-1 rounded-full">Total</span>
            </div>
            <p className="text-4xl font-bold mb-1">{stats.totalEvents}</p>
            <p className="text-blue-100 text-sm">Events</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl shadow-lg text-white transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-2">
              <EventSeatIcon sx={{ fontSize: 40 }} />
              <span className="text-sm bg-white/20 px-2 py-1 rounded-full">Capacity</span>
            </div>
            <p className="text-4xl font-bold mb-1">{stats.totalSeats}</p>
            <p className="text-purple-100 text-sm">Total Seats</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl shadow-lg text-white transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-2">
              <CheckCircleIcon sx={{ fontSize: 40 }} />
              <span className="text-sm bg-white/20 px-2 py-1 rounded-full">Sold</span>
            </div>
            <p className="text-4xl font-bold mb-1">{stats.soldSeats}</p>
            <p className="text-green-100 text-sm">Seats Sold</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-2xl shadow-lg text-white transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-2">
              <AttachMoneyIcon sx={{ fontSize: 40 }} />
              <span className="text-sm bg-white/20 px-2 py-1 rounded-full">Revenue</span>
            </div>
            <p className="text-4xl font-bold mb-1">${stats.revenue.toFixed(2)}</p>
            <p className="text-orange-100 text-sm">Total Revenue</p>
          </div>
        </div>
      
      {/* Create Event Form */}
      <div className="bg-white p-8 rounded-2xl shadow-xl mb-10 border border-gray-100">
        <div className="flex items-center mb-6">
          <AddCircleIcon sx={{ fontSize: 32, color: '#3B82F6' }} className="mr-3" />
          <h3 className="text-2xl font-bold text-gray-800">Create New Event</h3>
        </div>
        <form onSubmit={createHandler} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input 
              placeholder="Event Title" 
              value={formData.title} 
              onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
              required 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              placeholder="Event Description" 
              value={formData.description} 
              onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
              required 
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select 
              value={formData.category} 
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option value="cinema">Cinema</option>
              <option value="football">Football</option>
              <option value="concert">Concert</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input 
              type="datetime-local" 
              value={formData.date} 
              onChange={(e) => setFormData({ ...formData, date: e.target.value })} 
              required 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input 
              placeholder="Location" 
              value={formData.location} 
              onChange={(e) => setFormData({ ...formData, location: e.target.value })} 
              required 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
            <input 
              type="number" 
              placeholder="0.00" 
              value={formData.price} 
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} 
              required 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Seats</label>
            <input 
              type="number" 
              placeholder="100" 
              value={formData.totalSeats} 
              onChange={(e) => setFormData({ ...formData, totalSeats: Number(e.target.value) })} 
              required 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input 
              placeholder="https://example.com/image.jpg" 
              value={formData.imageURL} 
              onChange={(e) => setFormData({ ...formData, imageURL: e.target.value })} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <button 
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition duration-200"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>

      {/* Manage Events */}
      <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
        <div className="flex items-center mb-6">
          <ListIcon sx={{ fontSize: 32, color: '#3B82F6' }} className="mr-3" />
          <h3 className="text-2xl font-bold text-gray-800">Manage Events</h3>
        </div>
        
        {events.length === 0 ? (
          <div className="text-center py-16">
            <InventoryIcon sx={{ fontSize: 96, color: '#9CA3AF' }} className="mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">No Events Yet</h3>
            <p className="text-gray-500">Create your first event to get started!</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="p-4 border-b-2 border-gray-200 font-bold text-gray-700">Event</th>
                  <th className="p-4 border-b-2 border-gray-200 font-bold text-gray-700">Category</th>
                  <th className="p-4 border-b-2 border-gray-200 font-bold text-gray-700">Date</th>
                  <th className="p-4 border-b-2 border-gray-200 font-bold text-gray-700">Price</th>
                  <th className="p-4 border-b-2 border-gray-200 font-bold text-gray-700">Seats</th>
                  <th className="p-4 border-b-2 border-gray-200 font-bold text-gray-700 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr key={event._id} className={`hover:bg-blue-50 transition ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="p-4 border-b border-gray-200">
                      <div className="flex items-center">
                        {event.imageURL ? (
                          <img src={event.imageURL} alt={event.title} className="w-12 h-12 rounded-lg object-cover mr-3" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center mr-3 text-white">
                            {event.category === 'cinema' ? (
                              <MovieIcon sx={{ fontSize: 28 }} />
                            ) : event.category === 'football' ? (
                              <SportsFootballIcon sx={{ fontSize: 28 }} />
                            ) : (
                              <MusicNoteIcon sx={{ fontSize: 28 }} />
                            )}
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-gray-900">{event.title}</p>
                          <p className="text-xs text-gray-500">{event.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 border-b border-gray-200">
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold capitalize">
                        {event.category}
                      </span>
                    </td>
                    <td className="p-4 border-b border-gray-200 text-gray-700">
                      <div>
                        <p className="font-medium">{new Date(event.date).toLocaleDateString()}</p>
                        <p className="text-xs text-gray-500">{new Date(event.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                    </td>
                    <td className="p-4 border-b border-gray-200">
                      <span className="font-bold text-green-600 text-lg">${event.price}</span>
                    </td>
                    <td className="p-4 border-b border-gray-200">
                      <div className="flex items-center">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-600">{event.availableSeats} / {event.totalSeats}</span>
                            <span className="text-xs text-gray-600">
                              {Math.round((event.totalSeats - event.availableSeats) / event.totalSeats * 100)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500"
                              style={{ width: `${(event.totalSeats - event.availableSeats) / event.totalSeats * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 border-b border-gray-200 text-center">
                      <button 
                        onClick={() => deleteHandler(event._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition transform hover:scale-105 shadow-md hover:shadow-lg flex items-center space-x-1"
                      >
                        <DeleteIcon sx={{ fontSize: 18 }} />
                        <span>Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
