
import React from 'react';
import { MicIcon, SquareIcon, RefreshCwIcon } from './Icons';

type AppStatus = 'idle' | 'listening' | 'processing' | 'success' | 'error';

interface ActionButtonProps {
  status: AppStatus;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ status, onStart, onStop, onReset }) => {
  const baseClasses = "relative w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-500 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed";
  const hoverClasses = "hover:bg-gray-800";

  if (status === 'idle') {
    return (
      <button onClick={onStart} className={`${baseClasses} ${hoverClasses}`}>
        <MicIcon className="mr-3 h-6 w-6" />
        Start Mission Brief
      </button>
    );
  }

  if (status === 'listening') {
    return (
      <button onClick={onStop} className={`${baseClasses} bg-red-800 hover:bg-red-700 focus:ring-red-500`}>
        <SquareIcon className="mr-3 h-6 w-6 animate-pulse" />
        Stop Listening
      </button>
    );
  }

  if (status === 'processing') {
    return (
      <button disabled className={`${baseClasses}`}>
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Processing Mission...
      </button>
    );
  }

  if (status === 'success' || status === 'error') {
    return (
      <button onClick={onReset} className={`${baseClasses} bg-indigo-700 hover:bg-indigo-600 focus:ring-indigo-500`}>
        <RefreshCwIcon className="mr-3 h-6 w-6" />
        Start a New Mission
      </button>
    );
  }

  return null;
};
