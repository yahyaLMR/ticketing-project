import React, { useEffect } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';

const Notification = ({ type = 'info', message, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

    const types = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-500',
      text: 'text-green-800',
      icon: <CheckCircleIcon sx={{ fontSize: 24, color: '#10B981' }} />,
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-500',
      text: 'text-red-800',
      icon: <ErrorIcon sx={{ fontSize: 24, color: '#EF4444' }} />,
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-500',
      text: 'text-yellow-800',
      icon: <WarningIcon sx={{ fontSize: 24, color: '#F59E0B' }} />,
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-500',
      text: 'text-blue-800',
      icon: <InfoIcon sx={{ fontSize: 24, color: '#3B82F6' }} />,
    },
  };

  const config = types[type] || types.info;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slideIn">
      <div className={`${config.bg} ${config.border} border-l-4 rounded-lg shadow-2xl p-4 min-w-[320px] max-w-md`}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-0.5">{config.icon}</div>
          <div className="flex-1">
            <p className={`${config.text} font-medium text-sm leading-relaxed`}>{message}</p>
          </div>
          <button
            onClick={onClose}
            className={`${config.text} hover:opacity-70 transition flex-shrink-0`}
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </button>
        </div>
      </div>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Notification;
