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
      bg: 'bg-[#BB9457]/10',
      border: 'border-[#BB9457]',
      text: 'text-[#432818]',
      icon: <CheckCircleIcon sx={{ fontSize: 24, color: '#BB9457' }} />,
    },
    error: {
      bg: 'bg-[#A71014]/10',
      border: 'border-[#A71014]',
      text: 'text-[#A71014]',
      icon: <ErrorIcon sx={{ fontSize: 24, color: '#A71014' }} />,
    },
    warning: {
      bg: 'bg-[#99582A]/10',
      border: 'border-[#99582A]',
      text: 'text-[#99582A]',
      icon: <WarningIcon sx={{ fontSize: 24, color: '#99582A' }} />,
    },
    info: {
      bg: 'bg-[#FFE6A7]/20',
      border: 'border-[#432818]',
      text: 'text-[#432818]',
      icon: <InfoIcon sx={{ fontSize: 24, color: '#432818' }} />,
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
