import React from 'react';
import { Link } from 'react-router-dom';
import routeNames from '../../constants/routeNames';

function Sidebar() {
  return (
    <div className="bg-gray-800 w-64 min-h-screen">
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        <h1 className="text-white font-semibold text-lg">Dashboard</h1>
      </div>
      <ul className="mt-6">
        <li>
          <Link to={routeNames.DASHBOARD} className="block py-2 px-4 text-gray-300 hover:bg-gray-700">Home</Link>
        </li>
        <li>
          <Link to={routeNames.PROFILE} className="block py-2 px-4 text-gray-300 hover:bg-gray-700">About</Link>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;