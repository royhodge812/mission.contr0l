
import React from 'react';
import { RocketIcon } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="text-center py-4">
      <div className="flex items-center justify-center space-x-3">
        <RocketIcon className="h-8 w-8 text-indigo-400" />
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 bg-clip-text text-transparent">
          Mission Control AI
        </h1>
      </div>
      <p className="mt-2 text-md text-gray-400 max-w-2xl mx-auto">
        Humans handle the nonlinear, creative, and strategic aspects, while machines handle the linear, routinizable, and preparatory work.
      </p>
    </header>
  );
};
