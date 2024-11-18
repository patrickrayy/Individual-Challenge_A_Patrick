import { useId } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import PropTypes from 'prop-types';

export default function Navbar({ searchTerm, onSearchChange }) {
  const inputId = useId();
  const { isLoggedIn, login, logout } = useUser();

  return (
    <nav className="bg-[#5C4033] shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center font-poppins">

        {/* Logo */}
        <div className="text-2xl font-bold text-white">
          <Link to="/" className="hover:text-gray-300 transition duration-300">Ray's Records</Link>
        </div>

        {/* Search Bar */}
        <div className="w-1/3">
          <input
            type="text"
            id={inputId}
            name="search"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)} // Notify parent of changes
            className="w-full p-2 rounded-lg focus:outline-none focus:ring focus:ring-brown-300 text-gray-800"
            placeholder="Search product..."
          />
        </div>

        {/* User Authentication Links */}
        <div>
          {!isLoggedIn ? (
            <div className="flex gap-4">
              <button
                onClick={login}
                className="text-white hover:text-gray-300 transition duration-300"
              >
                Sign in
              </button>
              <Link
                to="/signup"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                Sign up
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/cart"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                Cart
              </Link>
              <Link
                to="/orders"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                My Orders
              </Link>
              <button
                onClick={logout}
                className="text-white hover:text-gray-300 transition duration-300"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};
