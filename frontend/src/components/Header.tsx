import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="TripBox Logo" className="h-12 w-12 object-contain" />
            <span className="text-xl font-bold text-gray-900"></span>
          </Link>
          <nav className="flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
              Tours
            </Link>
            <button className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
              About
            </button>
            <button className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
              Contact
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;