import React from 'react';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { RiHome2Line, RiAddCircleLine} from 'react-icons/ri';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center mb-4">
      <Link to="/" className="text-white text-2xl font-bold">
        Ecommerce Store
      </Link>
      
      <div className="flex items-center space-x-4">
        <Link to="/products/add" className="text-white">
          <RiAddCircleLine size={20} />
        </Link>

        <Link to="/" className="text-white">
          <RiHome2Line size={20} />
        </Link>
        
        <Link to="/cart" className="text-white">
          <FaShoppingCart size={20} />
        </Link>
        
        <Link to="/user" className="text-white">
          <FaUser size={20} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
